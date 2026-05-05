import {expect, test} from '@playwright/test'
import {ROUTES} from '../constants/routes'
import {waitForApiResponse} from '../pages/base-page.helper'
import {inboxPage} from '../pages/inbox.page'
import {chatPage} from '../pages/chat.page'
import {user} from '../data/user'

test('Send Playground bot a valid message and verify reply signal in thread', async ({
	page,
}) => {
	const inbox = inboxPage(page)
	await inbox.goto()
	await expect(inbox.inboxTab).toBeVisible()

	await page.goto(ROUTES.playground)

	const chat = chatPage(page)
	await expect(chat.emailInput).toBeVisible()

	await chat.emailInput.fill(user.email)
	await chat.fillChatText(user.message)
	const chatResponse = waitForApiResponse(
		page,
		'/dashboard/fetchers/by-message/',
		'GET',
	)
	await chat.sendAsCustomerButton.click()

	await expect(page.getByText(user.message)).toBeVisible()
	const botReplyResponse = await chatResponse
	expect(botReplyResponse.ok()).toBeTruthy()
})
