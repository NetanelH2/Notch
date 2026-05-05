import {type APIRequestContext, expect} from '@playwright/test'
import {apiRequest} from '../base/api-methods'
import {EXPECT_TIMEOUT_MS, POLL_INTERVALS_MS} from '../constants/timeouts'

export function validateStateByBodyId(
	request: APIRequestContext,
	route: string,
	body: {id: string},
	timeout?: number,
) {
	return expect.poll(
		async () => {
			const response = await apiRequest<{state: string}>(
				request,
				'get',
				`${route}/${body.id}`,
			)
			return response.body.state
		},
		{
			timeout: timeout ?? EXPECT_TIMEOUT_MS,
			intervals: POLL_INTERVALS_MS,
		},
	)
}
