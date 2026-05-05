import {
	VIEWPORT,
	WAIT_FOR_PAGE_READY_SCAN,
} from '../../constants/browser-config'

export function createAScan(propertyId: string, urlSetId: string) {
	return {
		configuration: {
			urlSetId,
			browserConfiguration: {viewport: VIEWPORT},
			scraperConfiguration: {waitForPageReadySeconds: WAIT_FOR_PAGE_READY_SCAN},
			pageScanConfigurations: [],
			customSeverityNames: {},
		},
		propertyId,
		totalUrlsCount: 1,
		successfulUrlsCount: 0,
		failedUrlsCount: 0,
	}
}
