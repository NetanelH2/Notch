export const WEBSITE_DATA = {
	URL: 'https://example.com',
	INVALID_URL: 'not-a-valid-url',
	SHORT_URL: 'abcde',
	URL_WITH_SPACES: 'https://example .com/page',
	ADDITIONAL_SEED_URL: 'https://example.com/page',
	DOMAIN: 'example.com',
} as const

export const extractDomainFromURL = (url: string): string => {
	const match = url.match(/^https?:\/\/([^/]+)/)
	return match?.[1] ?? ''
}
