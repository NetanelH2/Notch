import {
	VIEWPORT,
	WAIT_FOR_PAGE_READY_SCAN,
	createDiscoveryConfiguration,
} from '../../constants/browser-config'

type PropertyOptions = {
	name?: string
	url?: string
}

const DEFAULT_PROPERTY_URL = 'https://example.com'

export const createAProperty = (options: PropertyOptions = {}) => {
	const url = options.url ?? DEFAULT_PROPERTY_URL
	const name = options.name ?? `starter-kit-property-${Date.now()}`

	return {
		name,
		scanConfiguration: {
			browserConfiguration: {viewport: VIEWPORT},
			scraperConfiguration: {waitForPageReadySeconds: WAIT_FOR_PAGE_READY_SCAN},
			pageScanConfigurations: [],
			customSeverityNames: {},
		},
		urlSetConfiguration: {
			source: 'URL_DISCOVERY',
			discoveryConfiguration: createDiscoveryConfiguration(url),
		},
		views: [],
		collections: [],
	}
}
