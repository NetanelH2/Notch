import type {APIRequestContext} from '@playwright/test'

import type {PropertyResponse} from './responses/properties'
import type {ScanResponse} from './responses/scans'

export type ScanWithProperty = ScanResponse & {
	propertyId: string
}

export type TestFixtures = {
	request: APIRequestContext
	property: PropertyResponse
	scan: ScanWithProperty
}
