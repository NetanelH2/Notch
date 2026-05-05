export type PropertyResponse = {
	id: string
	createdTime?: string
	name: string
	scanConfiguration: {
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
	urlSetConfiguration: {
		source: string
		discoveryConfiguration: {
			seeds: {
				url: string
			}[]
			groupingRules: {
				urlPattern: string
				excludedQueryParameters: string[]
				ignoreQueryParameters: boolean
				caseSensitive: boolean
				ignoreFragment: boolean
				ignoreTrailingSlash: boolean
				ignoreHtmlSuffix: boolean
			}[]
			browserConfiguration: {
				viewport: {
					height: number
					width: number
				}
			}
			urlPatternFilter: {
				allowed: string[]
				denied: string[]
			}
			domainFilter: {
				allowed: string[]
				denied: string[]
			}
			maxPagesCount: number
			languageFilter: {
				allowed: string[]
				denied: string[]
			}
			allowedContentTypes: string[]
			waitForPageReadySeconds: number
			useExternalScraper: boolean
			useCanonicalUrl: boolean
		}
	}
	lastUrlSet?: {
		id: string
		createdTime?: string
		state: string
		updatedTime?: string
		totalUrlsCount: number
		propertyId?: string
	}
	lastScan?: {
		id: string
		createdTime?: string
		updatedTime?: string
		state: string
		propertyId?: string
		totalUrlsCount: number
		successfulUrlsCount: number
		failedUrlsCount: number
		issuesCount: number
		criticalIssuesCount: number
		scoreResult: {
			score: number
		}
	}
	views: {
		id: string
		name: string
		propertyId?: string
		updatedTime?: string
	}[]
	collections: unknown[]
	scoreResult: {
		score: number
	}
}
