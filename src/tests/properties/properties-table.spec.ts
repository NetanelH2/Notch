import {expect, test} from '../../fixtures/base-test-fixture'
import {propertiesTablePage} from '../../pages/properties/properties-table.page'
import {propertyPage} from '../../pages/properties/property.page'
import {SortDirection} from '../../types/properties-table'

test.describe('Properties table', () => {
	test.beforeEach('Navigate to the properties list page', async ({page}) => {
		const propertiesTable = propertiesTablePage(page)
		await propertiesTable.goto()
		await propertiesTable.waitForTableToBeVisible()
	})

	test('Opens a property row and navigates to property detail page', async ({
		page,
		property,
	}) => {
		const prop = propertyPage(page)
		const propertiesTable = propertiesTablePage(page)
		await propertiesTable.searchInput.fill(property.name)
		await propertiesTable.applyFiltersButton.click()
		await propertiesTable.waitForTableToBeVisible()
		await propertiesTable.propertyLinkByName(property.name).click()
		await expect(prop.scansTab).toBeVisible()
	})

	test('Sorts the supported table columns', async ({page}) => {
		const propertiesTable = propertiesTablePage(page)
		const sortingScenarios = [
			[propertiesTable.nameHeader, SortDirection.Descending],
			[propertiesTable.scoreHeader, SortDirection.Descending],
			[propertiesTable.scoreChangeHeader, SortDirection.Descending],
			[propertiesTable.pagesHeader, SortDirection.Descending],
			[propertiesTable.issuesHeader, SortDirection.Descending],
		] as const

		for (const [header, direction] of sortingScenarios) {
			await propertiesTable.sortTableByColumn(header, direction)
		}
	})

	test('Searches properties by name', async ({page, property}) => {
		const propertiesTable = propertiesTablePage(page)
		await propertiesTable.searchInput.fill(property.name)
		await propertiesTable.applyFiltersButton.click()
		await propertiesTable.waitForTableToBeVisible()
		await expect(
			propertiesTable.propertyLinkByName(property.name),
		).toBeVisible()
	})
})
