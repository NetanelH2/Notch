export const VIEWPORT = {
	height: 1080,
	width: 1920,
} as const

export const WAIT_FOR_PAGE_READY_SCAN = 20
export const WAIT_FOR_PAGE_READY_DISCOVERY = 10
export const MAX_PAGES_COUNT = 1

export const DEFAULT_GROUPING_RULE = {
	urlPattern: '.*',
	excludedQueryParameters: [] as string[],
	ignoreQueryParameters: true,
	caseSensitive: true,
	ignoreFragment: true,
	ignoreTrailingSlash: true,
	ignoreHtmlSuffix: false,
} as const

export const LANGUAGE_FILTER = {
	allowed: ['en-US'],
	denied: [] as string[],
} as const

export const ALLOWED_CONTENT_TYPES = ['text/html', 'text/plain'] as const

export const createDiscoveryConfiguration = (url: string) => ({
	seeds: [{url}],
	groupingRules: [DEFAULT_GROUPING_RULE],
	browserConfiguration: {viewport: VIEWPORT},
	urlPatternFilter: {allowed: [url], denied: [] as string[]},
	domainFilter: {allowed: [] as string[], denied: [] as string[]},
	maxPagesCount: MAX_PAGES_COUNT,
	languageFilter: LANGUAGE_FILTER,
	allowedContentTypes: [...ALLOWED_CONTENT_TYPES],
	waitForPageReadySeconds: WAIT_FOR_PAGE_READY_DISCOVERY,
	useExternalScraper: false,
	useCanonicalUrl: false,
})
