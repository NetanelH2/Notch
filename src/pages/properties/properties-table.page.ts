import {type Page, expect} from '@playwright/test'
import {ROUTES} from '../../constants/routes'
import type {NavigablePage} from '../../types/page-object'
import {sortTableByColumn} from '../helpers/sort-table-by-column.helper'

export const propertiesTablePage = (page: Page) => {
	const table = page.getByRole('table', {name: 'Properties table'})
	const tableBodyRows = table.locator('tbody tr')
	const addPropertyButton = page.getByRole('button', {
		name: 'Add Property',
	})
	const nameHeader = table.getByRole('columnheader', {name: 'Name'})
	const scoreHeader = table.getByRole('columnheader', {
		name: 'Score',
		exact: true,
	})
	const scoreChangeHeader = table.getByRole('columnheader', {
		name: 'Score Change',
	})
	const pagesHeader = table.getByRole('columnheader', {name: 'Pages'})
	const issuesHeader = table.getByRole('columnheader', {name: 'Issues'})
	const statusHeader = table.getByRole('columnheader', {name: 'Status'})
	const actionsHeader = table.getByRole('columnheader', {name: 'Actions'})
	const paginationNextButton = page.getByRole('button', {name: 'next page'})
	const paginationPreviousButton = page.getByRole('button', {
		name: 'previous page',
	})
	const paginationPageButton = page.getByRole('spinbutton', {
		name: 'go to page',
	})
	const paginationFirstPageButton = page.getByRole('button', {
		name: 'go back to first page',
	})
	const paginationLastPageButton = page.getByRole('button', {
		name: 'go to last page',
	})
	const paginationItemsPerPageButton = page.getByRole('combobox', {
		name: 'Items per page selector',
	})
	const searchInput = page.getByRole('textbox', {name: 'Search'})
	const applyFiltersButton = page.getByRole('button', {
		name: 'Apply filters',
	})
	const resetFiltersButton = page.getByRole('button', {
		name: 'Reset Filters',
	})
	const collectionFilter = page.getByRole('combobox', {
		name: 'Select Collections',
	})
	const collectionListbox = page.getByRole('listbox', {
		name: 'Select options',
	})

	return {
		addPropertyButton,
		searchInput,
		applyFiltersButton,
		resetFiltersButton,
		nameHeader,
		scoreHeader,
		scoreChangeHeader,
		pagesHeader,
		issuesHeader,
		statusHeader,
		actionsHeader,
		paginationPageButton,
		paginationFirstPageButton,
		paginationLastPageButton,

		goto: () => page.goto(ROUTES.properties),
		waitForTableToBeVisible: () => expect(table).toBeVisible(),
		getPropertyRowCount: () => tableBodyRows.count(),
		propertyLinkByName: (name: string) => table.getByRole('link', {name}),

		sortTableByColumn,
		tryToNavigateTablePages: async (direction: 'next' | 'previous') => {
			const button =
				direction === 'next' ? paginationNextButton : paginationPreviousButton
			await expect(button).toBeEnabled()
			await button.click()
		},
		setItemsPerPage: (option: string) =>
			paginationItemsPerPageButton.selectOption(option),
		filterByCollection: async (collectionName: string) => {
			await collectionFilter.click()
			await collectionListbox
				.getByRole('option', {name: collectionName})
				.click()
			await applyFiltersButton.click()
		},
	} satisfies NavigablePage
}
