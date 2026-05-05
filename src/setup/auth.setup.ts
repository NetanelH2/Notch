import {access, mkdir} from 'node:fs/promises'
import {test as setup} from '@playwright/test'
import {STORAGE_STATE_FILE} from '../constants/file-paths'

setup('Login and save storage state', async ({page}) => {
	await mkdir('playwright/.auth', {recursive: true})
	await page.close()
	try {
		await access(STORAGE_STATE_FILE)
	} catch {
		throw new Error(
			`Missing storage state at "${STORAGE_STATE_FILE}". Create it once manually, then rerun tests.`,
		)
	}
})
