import type {Page} from '@playwright/test'

export const breadcrumbComponent = (page: Page) => {
	const breadcrumb = page.getByRole('navigation', {name: 'breadcrumbs'})

	return {
		breadcrumbIndex: (index: number) => breadcrumb.locator('li').nth(index),
	}
}
