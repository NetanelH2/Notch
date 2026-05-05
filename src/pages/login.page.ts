import type {Page} from '@playwright/test'
import {ROUTES} from '../constants/routes'
import type {NavigablePage} from '../types/page-object'

export const loginPage = (page: Page) => {
	const emailInput = page.locator('[id="username"]')
	const passwordInput = page.getByRole('textbox', {name: 'password'})
	const continueButton = page.getByRole('button', {name: 'Continue'})
	const loginButton = page.getByRole('button', {name: 'Log in'})

	return {
		continueButton,

		goto: () => page.goto(ROUTES.login),

		login: async (email: string, password: string) => {
			await emailInput.fill(email)
			await continueButton.click()
			await passwordInput.fill(password)
			await loginButton.click()
		},
	} satisfies NavigablePage
}
