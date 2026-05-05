import {type APIRequestContext, expect} from '@playwright/test'
import type {APIResponse} from '../types/api-methods'
import {EXPECT_TIMEOUT_MS, POLL_INTERVALS_MS} from '../constants/timeouts'

const DEFAULT_STATUS_CODE = 200
const ERROR_STATUS_CODE = 404

type RequestOptions = {
	params?: Record<string, string | number | boolean>
	data?: Record<string, unknown> | string
}

export async function apiRequest<T>(
	request: APIRequestContext,
	method: 'get' | 'post' | 'put' | 'delete',
	url: string,
	options?: RequestOptions,
	statusCode: number = DEFAULT_STATUS_CODE,
): Promise<APIResponse<T>> {
	const requestOptions = options
		? {
				...(options.params && {params: options.params}),
				...(options.data && {data: options.data}),
			}
		: undefined

	const response = await request[method](url, requestOptions)

	if (response.status() !== statusCode) {
		const errorText = await response.text()
		throw new Error(
			`API request failed: ${method.toUpperCase()} ${url} returned ${response.status()}.\n${errorText}`,
		)
	}

	let body
	try {
		body = await response.json()
	} catch {
		body = await response.text()
	}
	return {
		status: response.status(),
		body: body as T,
		headers: response.headers(),
	}
}

const validateDeletedByBodyId = (
	request: APIRequestContext,
	resourceUrl: string,
	timeout?: number,
) =>
	expect
		.poll(
			async () => {
				const response = await request.get(resourceUrl)
				return response.status()
			},
			{
				timeout: timeout ?? EXPECT_TIMEOUT_MS,
				intervals: POLL_INTERVALS_MS,
			},
		)
		.toBe(ERROR_STATUS_CODE)

export const tryDeleteResource = async (
	request: APIRequestContext,
	url: string,
): Promise<void> => {
	try {
		await apiRequest<void>(request, 'delete', url)
	} catch (error) {
		throw new Error(`Failed to delete resource: ${url}.\n${error}`)
	}
	await validateDeletedByBodyId(request, url)
}
