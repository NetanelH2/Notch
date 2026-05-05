import {expect, test as base} from '@playwright/test'

import {TEST_TIMEOUT_MS} from '../data-creation/constants/timeouts'
import {property} from '../data-creation/fixtures/property'
import {request} from '../data-creation/fixtures/request'
import {scan} from '../data-creation/fixtures/scan'
import type {TestFixtures} from '../data-creation/types/fixtures'

process.env.CI = 'true'

export const test = base.extend<TestFixtures>({
	request,
	property: [property, {timeout: TEST_TIMEOUT_MS}],
	scan: [scan, {timeout: TEST_TIMEOUT_MS}],
})

export {expect}
