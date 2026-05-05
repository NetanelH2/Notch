import type {Page} from '@playwright/test'
import {ROUTES} from '../constants/routes'

export const inboxPage = (page: Page) => {
	const inboxTab = page.getByRole('link', {name: 'Inbox'})
	const startConversation = page.getByRole('button', {name: 'Test Taylor'})

	return {
		goto: () => page.goto(ROUTES.inbox),
		startConversation,
		inboxTab,
	}
}
