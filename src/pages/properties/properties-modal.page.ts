import {type Page, expect} from '@playwright/test'

export const propertiesModalPage = (page: Page) => {
	const modal = page.getByRole('dialog', {
		name: 'Create new property - step 0',
	})
	const urlInput = page.getByRole('textbox', {name: 'Enter a url'})
	const nextButton = page.getByRole('button', {name: 'Next'})
	const closePopupButton = page.getByRole('button', {name: 'Close Popup'})
	const modalText = page.locator('.create-property-popup-content')
	const validationError = page.locator(
		'[class*="error"], [class*="invalid"], [class*="validation"]',
	)
	const advancedSettingsLink = page.getByRole('button', {
		name: 'Advanced Settings',
	})
	const startCrawlingButton = page.getByRole('button', {
		name: 'Start Crawling',
	})
	const confirmClosePopupButton = page.getByRole('button', {name: 'Confirm'})

	return {
		modal,
		urlInput,
		nextButton,
		validationError,

		fillUrlInput: (url: string) => urlInput.fill(url),

		fillUrlInputSequentially: (url: string) =>
			urlInput.pressSequentially(url, {delay: 300}),

		triggerErrorForURLInput: () => urlInput.press('Tab'),

		clickNextButton: () => nextButton.click(),

		clickClosePopupButton: () => closePopupButton.click(),

		clickConfirmClosePopupButton: () => confirmClosePopupButton.click(),

		clickAdvancedSettingsLink: () => advancedSettingsLink.click(),

		clickStartCrawlingButton: () => startCrawlingButton.click(),

		validateModalText: async (
			url: string,
			domainScope: string,
			maxPages: number = 5000,
		) => {
			await expect(modalText).toContainText(`We will start at ${url}`)
			await expect(modalText).toContainText(`Crawl up to a ${maxPages} pages`)
			await expect(modalText).toContainText(
				`and remain in the context of ${domainScope} domain`,
			)
			await expect(modalText).toContainText(
				'You can change the above configuration in the advanced',
			)
			await expect(modalText).toContainText('settings section')
		},
	}
}
