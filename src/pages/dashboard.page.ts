import type {Page} from '@playwright/test'
import type {NavigablePage} from '../types/page-object'
import {ROUTES} from '../constants/routes'

export const dashboardPage = (page: Page) =>
	({
		accountSummaryHeading: page.getByRole('heading', {
			name: 'Account summary',
		}),
		dashboardTab: page.getByRole('link', {name: 'Dashboard'}),

		goto: () => page.goto(ROUTES.dashboard),
	}) satisfies NavigablePage
