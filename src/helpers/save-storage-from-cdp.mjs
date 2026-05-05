import {access, mkdir} from 'node:fs/promises'
import {execFileSync} from 'node:child_process'
import {chromium} from 'playwright'

const STORAGE_PATH = 'playwright/.auth/user.json'
const USER_DATA_DIR = '/tmp/notch-auth'
const APP_URL = 'https://guardio.app.getnotch.dev/conversations/inbox/'

try {
	await mkdir('playwright/.auth', {recursive: true})
	// Close only Chrome processes using this auth profile to avoid SingletonLock.
	try {
		execFileSync('pkill', ['-f', `${USER_DATA_DIR}`], {stdio: 'ignore'})
	} catch {
		// Ignore "no process matched" case.
	}

	const context = await chromium.launchPersistentContext(USER_DATA_DIR, {
		channel: 'chrome',
		headless: false,
	})
	const page = context.pages()[0] ?? (await context.newPage())
	await page.goto(APP_URL, {waitUntil: 'domcontentloaded'})
	await page.waitForLoadState('networkidle').catch(() => {})

	if (page.url().includes('/login')) {
		throw new Error(
			'Not logged in for /tmp/notch-auth profile. Run npm run auth:chrome, complete login, then run auth:save again.',
		)
	}

	await context.storageState({path: STORAGE_PATH})
	await context.close()
	console.log(`Saved storage state to ${STORAGE_PATH}`)
} catch (error) {
	const errorMessage = error instanceof Error ? error.message : 'unknown'
	try {
		await access(STORAGE_PATH)
		console.warn(
			`Could not refresh storage state (${errorMessage}). Using existing ${STORAGE_PATH}.`,
		)
		process.exit(0)
	} catch {
		// No existing state file, continue to hard failure below.
	}

	if (errorMessage.includes('ProcessSingleton')) {
		console.error(
			'Failed to save storage state: close all Chrome windows opened with /tmp/notch-auth, then run auth:save again.',
		)
		throw error
	}
	console.error('Failed to save storage state from /tmp/notch-auth profile.')
	throw error
}
