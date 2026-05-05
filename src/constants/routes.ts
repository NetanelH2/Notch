export const properties = '/properties'

export const ROUTES = {
	home: '/',
	dashboard: '/dashboard',
	properties,
	login: '/login',
	manageCollections: '/manage-collections',
	propertyNew: `${properties}/new`,
	propertyNewAdvancedSettings: (baseurl: string) =>
		`${properties}/new/settings?baseurl=${encodeURIComponent(baseurl)}`,
	propertyDetail: (propertyId: string) => `${properties}/${propertyId}`,
	propertySettings: (propertyId: string) =>
		`${properties}/${propertyId}/settings`,
	scanResults: (propertyId: string, scanId: string) =>
		`${properties}/${propertyId}/scans/${scanId}`,
	scanResultsOverview: (propertyId: string, scanId: string) =>
		`${properties}/${propertyId}/scans/${scanId}/overview`,
	scanResultsComponents: (propertyId: string, scanId: string) =>
		`${properties}/${propertyId}/scans/${scanId}/components`,
	scanResultsIssueTypes: (propertyId: string, scanId: string) =>
		`${properties}/${propertyId}/scans/${scanId}/issue-types`,
	scanResultsPages: (propertyId: string, scanId: string) =>
		`${properties}/${propertyId}/scans/${scanId}/pages`,
	scanResultsAllIssues: (propertyId: string, scanId: string) =>
		`${properties}/${propertyId}/scans/${scanId}/all-issues`,
	scanResultsUrlsStatus: (propertyId: string, scanId: string) =>
		`${properties}/${propertyId}/scans/${scanId}/urls-status`,
	crawlResults: (propertyId: string, urlSetId: string) =>
		`${properties}/${propertyId}/urlset/${urlSetId}`,
	invalid: '/invalid-route-for-404',
} as const
