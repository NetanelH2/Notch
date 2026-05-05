import {VALIDATION_MESSAGES} from './validation-messages'
import {WEBSITE_DATA} from '../data/website'

export const DEFAULT_PAGE_SIZE = 10

export const DEFAULT_ITEMS_PER_PAGE_OPTION = '25'

export const PROPERTY_DATA = {
	propertyName: 'Fixed-Property (API)',
} as const

export const SEED_URL_VALIDATION_CASES = [
	{
		url: WEBSITE_DATA.SHORT_URL,
		error: VALIDATION_MESSAGES.SEED_URL_TOO_SHORT,
		description: 'shorter than 6 characters',
	},
	{
		url: WEBSITE_DATA.INVALID_URL,
		error: VALIDATION_MESSAGES.SEED_URL_INVALID,
		description: 'invalid',
	},
	{
		url: WEBSITE_DATA.URL_WITH_SPACES,
		error: VALIDATION_MESSAGES.SEED_URL_SPACES,
		description: 'with spaces',
	},
] as const
