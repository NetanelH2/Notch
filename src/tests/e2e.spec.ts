import {expect, test} from '@playwright/test'
import {inboxPage} from '../pages/inbox.page'

test('Open inbox with authenticated storage state', async ({page}) => {
	const inbox = inboxPage(page)
	await inbox.goto()
	await expect(inbox.inboxTab).toBeVisible()
})
