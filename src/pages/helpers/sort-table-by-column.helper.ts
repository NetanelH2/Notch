import {type Locator, expect} from '@playwright/test'
import {SortDirection} from '../../types/properties-table'

export const sortTableByColumn = async (
	columnHeaderLocator: Locator,
	direction: SortDirection,
) => {
	await columnHeaderLocator.click()
	try {
		await expect(columnHeaderLocator).toHaveAttribute('aria-sort', direction)
	} catch {
		await columnHeaderLocator.click()
		await expect(columnHeaderLocator).toHaveAttribute('aria-sort', direction)
	}
}
