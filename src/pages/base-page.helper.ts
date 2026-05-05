import type {Page, Response} from '@playwright/test'
export const getResponseJson = async <T>(response: Response): Promise<T> =>
	(await response.json()) as T

export const waitForApiResponse = (page: Page, route: string, method: string) =>
	page.waitForResponse(
		(response) =>
			response.url().includes(route) &&
			response.request().method() === method,
	)
