import {defineConfig, devices} from '@playwright/test'
import {BASE_URL} from './src/constants/routes'
import {STORAGE_STATE_FILE} from './src/constants/file-paths'

const sharedAuth = {storageState: STORAGE_STATE_FILE}
const dependsOnSetup = {dependencies: ['setup']}

export default defineConfig({
	testDir: './src',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 2 : undefined,
	reporter: [
		['list'],
		[
			'html',
			{
				open: 'never',
				outputFolder: 'playwright-report',
			},
		],
	],
	use: {
		baseURL: BASE_URL,
		trace: 'on',
	},

	projects: [
		{name: 'setup', testMatch: /.*\.setup\.ts/},
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
						use: {
							...devices['Desktop Firefox'],
							...sharedAuth,
						},
					},
					{
						name: 'webkit',
						use: {
							...devices['Desktop Safari'],
							...sharedAuth,
						},
					},
				]
			: []),
	],
})
