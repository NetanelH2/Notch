import type {PropertyResponse} from '../../types/responses/properties'
import {WEBSITE_DATA} from '../../../data/website'
import {
	VIEWPORT,
	WAIT_FOR_PAGE_READY_SCAN,
} from '../../constants/browser-config'
import {FIXED_PROPERTY_ID} from './ids'

export const FIXED_PROPERTY: PropertyResponse = {
	id: FIXED_PROPERTY_ID,
	name: 'Fixed-Property (API)',
	scanConfiguration: {
		urlSetId: '',
		browserConfiguration: {
			viewport: VIEWPORT,
		},
		scraperConfiguration: {
			waitForPageReadySeconds: WAIT_FOR_PAGE_READY_SCAN,
		},
		pageScanConfigurations: [],
		customSeverityNames: {},
	},
	urlSetConfiguration: {
		source: 'URL_DISCOVERY',
		discoveryConfiguration: {
			seeds: [{url: WEBSITE_DATA.URL}],
			groupingRules: [
				{
					urlPattern: '.*',
					excludedQueryParameters: [],
					ignoreQueryParameters: true,
					caseSensitive: true,
					ignoreFragment: true,
					ignoreTrailingSlash: true,
					ignoreHtmlSuffix: false,
				},
			],
			browserConfiguration: {viewport: VIEWPORT},
			urlPatternFilter: {allowed: [WEBSITE_DATA.URL], denied: []},
			domainFilter: {allowed: [], denied: []},
			maxPagesCount: 1,
			languageFilter: {allowed: ['en-US'], denied: []},
			allowedContentTypes: ['text/html', 'text/plain'],
			waitForPageReadySeconds: 10,
			useExternalScraper: false,
			useCanonicalUrl: false,
		},
	},
	lastUrlSet: undefined,
	lastScan: undefined,
	views: [],
	collections: [],
	scoreResult: {score: 0},
}
