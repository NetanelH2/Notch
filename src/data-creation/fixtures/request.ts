import type {APIRequestContext} from '@playwright/test'

import {getAuthToken} from '../helpers/auth-token'

type PlaywrightOptions = {
	playwright: typeof import('playwright-core')
	baseURL: string | undefined
}

export async function request(
	{playwright, baseURL}: PlaywrightOptions,
	use: (value: APIRequestContext) => Promise<void>,
) {
	const token = getAuthToken()
	const requestContext = (await playwright.request.newContext({
		baseURL,
		extraHTTPHeaders: token ? {Authorization: `Bearer ${token}`} : {},
		ignoreHTTPSErrors: true,
	})) as APIRequestContext

	try {
		await use(requestContext)
	} finally {
		await requestContext.dispose()
	}
}
