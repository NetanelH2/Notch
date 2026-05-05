import {defineConfig, devices} from '@playwright/test'
import {STORAGE_STATE_FILE} from './src/constants/file-paths'
import os from 'os'
import dotenv from 'dotenv'
dotenv.config({quiet: true})

const sharedAuth = {storageState: STORAGE_STATE_FILE}
const dependsOnSetup = {dependencies: ['setup']}

export default defineConfig({
	testDir: './src',
	snapshotPathTemplate: './src/snapshots/{arg}{ext}',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 2 : undefined,
	grep: process.env.TEST_TAGS ? new RegExp(process.env.TEST_TAGS) : undefined,
	expect: {
		timeout: 15000,
		toHaveScreenshot: {
			maxDiffPixelRatio: 0.03,
		},
	},
	reporter: [
		['list'],
		[
			'allure-playwright',
			{
				resultsDir: 'allure-results',
				environmentInfo: {
					os_platform: os.platform(),
					os_release: os.release(),
					os_version: os.version(),
					node_version: process.version,
				},
			},
		],
		[
			'html',
			{
				open: 'never',
				outputFolder: 'playwright-report',
			},
		],
		['junit', {outputFile: 'test-results/results.xml'}],
	],
	use: {
		testIdAttribute: 'data-automation-id',
		baseURL: 'https://test-website.com',
		trace: 'on',
	},

	projects: [
		{name: 'setup', testMatch: /.*\.setup\.ts/, teardown: 'teardown'},
		{name: 'teardown', testMatch: /.*\.teardown\.ts/},
		{
			name: 'chromium',
			...dependsOnSetup,
			use: {
				...devices['Desktop Chrome'],
				...sharedAuth,
			},
		},
		...(process.env.CI
			? [
					{
						name: 'firefox',
						...dependsOnSetup,
						use: {
							...devices['Desktop Firefox'],
							...sharedAuth,
						},
					},
					{
						name: 'webkit',
						...dependsOnSetup,
						use: {
							...devices['Desktop Safari'],
							...sharedAuth,
						},
					},
				]
			: []),
	],
})
