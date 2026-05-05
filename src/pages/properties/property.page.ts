import {type Page, expect} from '@playwright/test'
import {ROUTES} from '../../constants/routes'
import type {NavigablePage} from '../../types/page-object'
import {getTableColumnIndexByHeader} from '../helpers/get-table-column-index-by-header.helper'

export const propertyPage = (page: Page) => {
	const newPropertyDialog = page.getByRole('dialog', {
		name: 'Create new property - step 1',
	})
	const propertyActions = page.getByRole('region', {
		name: 'Property actions',
	})
	const crawlIndicator = propertyActions.getByText(
		'This property is currently being crawled.',
		{exact: true},
	)
	const nonCrawlContent = page.getByText(
		'Once crawl is complete, initiate a scan and check results here',
	)
	const runningCrawlLocator = page.locator('.no-data-indication-content')
	const scansTable = page.getByRole('table', {name: 'Scans Table'})
	const scansTab = page.getByRole('link', {name: 'Scans', exact: true})
	const propertyTitle = page.getByTestId('ev-ellipsed-text-with-tooltip')
	const crawlStatus = page.locator('.scan-status')
	const viewsDropdown = page.locator('.manage-views')
	const crawlRunningText = runningCrawlLocator.getByRole('heading', {
		name: 'This property is currently being crawled.',
	})
	const scanRunningText = page.getByText('scan is running')
	const cancelCrawlLink = page.getByRole('button', {
		name: 'Cancel running crawl',
	})
	const cancelScanLink = page.getByRole('button', {
		name: 'Cancel',
		exact: true,
	})
	const crawledOnInfo = page.getByText(/Crawled on/)
	const schedulingStatus = page.getByText(/Schedule scans|Scheduled/)

	const paginationNextButton = page.getByRole('button', {name: 'next page'})
	const paginationPreviousButton = page.getByRole('button', {
		name: 'previous page',
	})
	const paginationItemsPerPage = page.getByRole('combobox', {
		name: 'Items per page selector',
	})

	const scansCountText = page
		.locator('[class*="scans-table"]')
		.getByText(/\d+ scans?/)

	const scanTableHeaders = scansTable.locator('thead th')
	const tableBodyRows = scansTable.locator('tbody tr')
	const crawlButton = propertyActions
		.getByRole('button', {name: 'Crawl Now'})
		.or(propertyActions.getByText('Crawl Now'))
	const scanNowButton = propertyActions.getByRole('button', {name: 'Scan Now'})
	const settingsButton = propertyActions.getByRole('button', {name: 'Settings'})

	const scanTableButton = tableBodyRows.getByRole('button', {
		name: 'Scan Now',
	})
	const scanActionsButton = tableBodyRows.getByRole('button', {
		name: 'Scan Actions',
	})
	const viewScanResultsButton = page.getByRole('menuitem', {
		name: 'View scan results',
	})
	const scanColumnHeaders = {
		date: 'Date',
		ended: 'Ended',
		score: 'Score',
		status: 'Status',
		issues: 'Issues',
		pages: 'Pages',
		errors: 'Errors',
		actions: 'Actions',
	} as const
	type ScanColumnHeader =
		(typeof scanColumnHeaders)[keyof typeof scanColumnHeaders]

	return {
		newPropertyDialog,
		crawlIndicator,
		scanColumnHeaders,
		scanTableButton,
		scansTable,
		tableBodyRows,
		crawlButton,
		scanNowButton,
		settingsButton,
		nonCrawlContent,
		runningCrawlLocator,
		scansTab,
		propertyTitle,
		crawlStatus,
		viewsDropdown,
		crawlRunningText,
		scanRunningText,
		cancelCrawlLink,
		cancelScanLink,
		crawledOnInfo,
		schedulingStatus,
		scansCountText,
		paginationNextButton,
		paginationPreviousButton,
		paginationItemsPerPage,
		scanActionsButton,
		viewScanResultsButton,
		goto: (propertyId: string) => page.goto(ROUTES.propertyDetail(propertyId)),
		waitForTableToBeVisible: () => expect(scansTable).toBeVisible(),
		scanCellAtIndexByHeaderName: async (
			headerName: ScanColumnHeader,
			rowIndex: number,
		) =>
			tableBodyRows
				.nth(rowIndex)
				.locator('td')
				.nth(await getTableColumnIndexByHeader(scanTableHeaders, headerName)),

		openScanResultsFromRow: async (rowIndex: number) => {
			await scanActionsButton.nth(rowIndex).click()
			await viewScanResultsButton.click()
		},
	} satisfies NavigablePage
}
