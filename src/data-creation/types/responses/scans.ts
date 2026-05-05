export type ScanResponse = {
	id: string
	createdTime?: string
	updatedTime?: string
	state?: string
	configuration: {
		urlSetId: string
		browserConfiguration: {
			viewport: {
				height: number
				width: number
			}
		}
		scraperConfiguration: {
			waitForPageReadySeconds: number
		}
		pageScanConfigurations: unknown[]
		customSeverityNames: Record<string, unknown>
	}
	propertyId: string
	totalUrlsCount: number
	successfulUrlsCount: number
	failedUrlsCount: number
	issuesCount: number
	criticalIssuesCount: number
	scoreResult: {
		score: number
	}
}
