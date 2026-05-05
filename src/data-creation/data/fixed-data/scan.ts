import type {ScanResponse} from '../../types/responses/scans'
import {ScanStateEnum} from '../../constants/scan-states'
import {
	VIEWPORT,
	WAIT_FOR_PAGE_READY_SCAN,
} from '../../constants/browser-config'
import {FIXED_PROPERTY_ID, FIXED_SCAN_ID} from './ids'

export const FIXED_SCAN: ScanResponse = {
	id: FIXED_SCAN_ID,
	state: ScanStateEnum.DONE,
	configuration: {
		urlSetId: '',
		browserConfiguration: {viewport: VIEWPORT},
		scraperConfiguration: {waitForPageReadySeconds: WAIT_FOR_PAGE_READY_SCAN},
		pageScanConfigurations: [],
		customSeverityNames: {},
	},
	propertyId: FIXED_PROPERTY_ID,
	totalUrlsCount: 1,
	successfulUrlsCount: 1,
	failedUrlsCount: 0,
	issuesCount: 0,
	criticalIssuesCount: 0,
	scoreResult: {score: 100},
}
