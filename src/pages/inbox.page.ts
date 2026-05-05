import type {Page} from '@playwright/test'
import {ROUTES} from '../constants/routes'

export const inboxPage = (page: Page) => {
	const inboxTab = page.getByRole('link', {name: 'Inbox'})

	return {
		goto: () => page.goto(ROUTES.inbox),
		inboxTab,
	}
}
