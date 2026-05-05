import {Page} from '@playwright/test'
import {scrollPlaygroundComposerPanel} from './base-page.helper'

export const chatPage = (page: Page) => {
	const emailInput = page.getByRole('textbox', {
		name: 'e.g. mark@meta.com, you can keep it empty to test as a lead',
	})
	const sendAsCustomerButton = page.getByRole('button', {
		name: 'Send as customer',
	})
	const chatTextArea = page
		.getByPlaceholder('Use # for macros')
		.or(page.locator('main .ql-editor[contenteditable="true"]'))
		.last()
	const chatBotEndProcess = page.getByText('Qualification Questions')
	return {
		emailInput,
		sendAsCustomerButton,
		chatTextArea,
		chatBotEndProcess,
		messageBubble: async (message: string) =>
			page.getByRole('main').getByText(message, {exact: true}).last(),

		fillChatText: async (text: string) => {
			await scrollPlaygroundComposerPanel(page)
			await chatTextArea.fill(text)
		},
	}
}
