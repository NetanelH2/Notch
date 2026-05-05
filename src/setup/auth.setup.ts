import {mkdir, writeFile} from 'node:fs/promises'

import {expect, test as setup} from '../fixtures/base-test-fixture'
import {STORAGE_STATE_FILE} from '../constants/file-paths'
import {apiRequest} from '../data-creation/base/api-methods'
import {FILE_PATH, SETUP_DATA_DIR} from '../data-creation/constants/file-paths'
import {API_ROUTES} from '../data-creation/data/api-routes'
import {getAuthEmail, getAuthPassword} from '../helpers/env'
import {dashboardPage} from '../pages/dashboard.page'
import {loginPage} from '../pages/login.page'
import {ROUTES} from '../constants/routes'

setup('Login And Save To Storage State', async ({page}) => {
	await page.goto(ROUTES.home)
	const login = loginPage(page)
	await login.login(getAuthEmail(), getAuthPassword())
	const dashboard = dashboardPage(page)
	await expect(dashboard.accountSummaryHeading).toBeVisible()
	await page.context().storageState({path: STORAGE_STATE_FILE})
})

setup('Create Auth Token For API Requests', async ({request}) => {
	await mkdir(SETUP_DATA_DIR, {recursive: true})
	const username = getAuthEmail()
	const password = getAuthPassword()
	const response = await apiRequest<string>(
		request,
		'get',
		API_ROUTES.authController,
		{
			params: {username, password},
		},
	)
	expect(response.body).toBeDefined()
	await writeFile(
		FILE_PATH.AUTH_TOKEN_FILE,
		JSON.stringify({token: response.body}, null, 2),
	)
})
