import {apiRequest, tryDeleteResource} from '../base/api-methods'
import type {ScanResponse} from '../types/responses/scans'
import {API_ROUTES} from '../data/api-routes'
import {createAScan} from '../data/create-templates/scan-template'
import {validateStateByBodyId} from '../helpers/state-poll'
import {ScanStateEnum} from '../constants/scan-states'
import type {APIRequestContext} from '@playwright/test'
import type {TestFixtures} from '../types/fixtures'
import {FIXED_SCAN} from '../data/fixed-data/scan'
import {isCI} from '../../helpers/env'

type ScanFixtureOptions = {
	request: APIRequestContext
	property: TestFixtures['property']
}

export async function scan(
	{request, property}: ScanFixtureOptions,
	use: (value: TestFixtures['scan']) => Promise<void>,
) {
	if (isCI()) {
		let createdScan: ScanResponse | undefined
		try {
			const response = await apiRequest<ScanResponse>(
				request,
				'post',
				API_ROUTES.scanController,
				{data: createAScan(property.id, property.scanConfiguration.urlSetId)},
			)
			createdScan = response.body

			await validateStateByBodyId(
				request,
				API_ROUTES.scanController,
				response.body,
			).toBe(ScanStateEnum.DONE)

			const scanResponse = await apiRequest<ScanResponse>(
				request,
				'get',
				`${API_ROUTES.scanController}/${response.body.id}`,
			)
			await use({...scanResponse.body, propertyId: property.id})
		} finally {
			if (createdScan) {
				await tryDeleteResource(
					request,
					`${API_ROUTES.scanController}/${createdScan.id}`,
				)
			}
		}
	} else {
		await use({...FIXED_SCAN, propertyId: property.id})
	}
}
