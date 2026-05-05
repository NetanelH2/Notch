import type {Page} from '@playwright/test'

export const headerComponent = (page: Page) => {
	const userMenu = page.getByRole('button', {name: 'User Menu'})
	const logoutOption = page.getByRole('menuitem', {name: 'Logout'})
	const contactUsOption = page.getByRole('menuitem', {name: 'Contact Us'})

	return {
		userMenu,
		logoutOption,
		contactUsOption,

		openUserMenu: () => userMenu.click(),

		logout: async () => {
			await userMenu.click()
			await logoutOption.click()
		},

		openContactUsModal: () => contactUsOption.click(),
	}
}
