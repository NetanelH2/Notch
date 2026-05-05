import {Page} from '@playwright/test'

export const googleLoginPage = async (page: Page) => {
	const passwordInput = page.getByRole('textbox', {name: 'Enter your password'})
	const nextButton = page.getByRole('button', {name: 'המשך'})
	const autoLogin = page.getByText('כניסה אל getnotch.com')
	return {
		checkIfPasswordNeeded: async (password: string) => {
			if (await autoLogin.isVisible()) {
				await nextButton.click()
			} else {
				await passwordInput.fill(password)
				await nextButton.click()
			}
		},
	}
}
