import {apiRequest, tryDeleteResource} from '../base/api-methods'
import type {PropertyResponse} from '../types/responses/properties'
import {API_ROUTES} from '../data/api-routes'
import {createAProperty} from '../data/create-templates/property-template'
import {FIXED_PROPERTY} from '../data/fixed-data/property'
import {isCI} from '../../helpers/env'
import type {APIRequestContext} from '@playwright/test'
import type {APIResponse} from '../types/api-methods'
import type {TestFixtures} from '../types/fixtures'

type PropertyFixtureOptions = {
	request: APIRequestContext
}

export async function property(
	{request}: PropertyFixtureOptions,
	use: (value: TestFixtures['property']) => Promise<void>,
) {
	if (isCI()) {
		let response: APIResponse<PropertyResponse> | undefined

		try {
			response = await apiRequest<PropertyResponse>(
				request,
				'post',
				API_ROUTES.propertyController,
				{data: createAProperty()},
			)
			await use(response.body)
		} finally {
			if (response) {
				await tryDeleteResource(
					request,
					`${API_ROUTES.propertyController}/${response.body.id}`,
				)
			}
		}
	} else {
		await use(FIXED_PROPERTY)
	}
}
