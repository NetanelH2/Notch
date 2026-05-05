import type {Page} from '@playwright/test'
import {ROUTES} from '../../constants/routes'
import {googleLoginPage} from './google.page'

export const loginPage = (page: Page) => {
	const signInWithGoogleButton = page
		.getByRole('button', {
			name: 'Sign in with Google',
		})
		.first()
	const emailInput = page.getByRole('textbox', {name: 'Email or phone'})
	const nextButton = page.getByRole('button', {name: 'Next'})
	return {
		goto: () => page.goto(ROUTES.login),
		loginWithGoogle: async (email: string, password: string) => {
			const google = await googleLoginPage(page)
			await signInWithGoogleButton.click()
			await emailInput.fill(email)
			await nextButton.click()
			await google.checkIfPasswordNeeded(password)
		},
	}
}
