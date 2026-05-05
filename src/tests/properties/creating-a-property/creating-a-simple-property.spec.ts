import {tryDeleteResource} from '../../../data-creation/base/api-methods'
import {API_ROUTES} from '../../../data-creation/data/api-routes'
import {SNAPSHOT_NAMES} from '../../../constants/snapshot-names'
import {extractDomainFromURL, WEBSITE_DATA} from '../../../data/website'
import {expect, test} from '../../../fixtures/base-test-fixture'
import {
	getResponseJson,
	waitForApiResponse,
} from '../../../pages/base-page.helper'
import {propertiesModalPage} from '../../../pages/properties/properties-modal.page'
import {propertiesTablePage} from '../../../pages/properties/properties-table.page'
import {propertyPage} from '../../../pages/properties/property.page'
import {ResponseMethod} from '../../../types/response-methods'

test.describe('Creating a property', () => {
	const createdPropertyIds: string[] = []

	test.beforeEach('Go to add new property modal', async ({page}) => {
		const propertiesTable = propertiesTablePage(page)
		await propertiesTable.goto()
		await propertiesTable.waitForTableToBeVisible()
		await propertiesTable.addPropertyButton.click()
	})

	test.afterEach(
		'Delete properties created by test case',
		async ({request}) => {
			const propertyIdsToDelete = createdPropertyIds.splice(0)
			await Promise.all(
				propertyIdsToDelete.map((id) =>
					tryDeleteResource(request, `${API_ROUTES.propertyController}/${id}`),
				),
			)
		},
	)

	test('Adds a property with a valid URL and starts crawling', async ({
		page,
	}) => {
		const propertiesModal = propertiesModalPage(page)
		await expect(propertiesModal.modal).toBeVisible()
		await propertiesModal.fillUrlInput(WEBSITE_DATA.URL)
		await propertiesModal.clickNextButton()
		await propertiesModal.validateModalText(
			WEBSITE_DATA.URL,
			extractDomainFromURL(WEBSITE_DATA.URL),
		)

		await expect(page).toHaveScreenshot(
			SNAPSHOT_NAMES.creatingProperty.addPropertyModal,
			{
				mask: [
					propertiesModal.modal.locator('[data-automation-id="timestamp"]'),
				],
			},
		)

		const responsePromise = waitForApiResponse(
			page,
			API_ROUTES.propertyController,
			ResponseMethod.POST,
		)
		await propertiesModal.clickStartCrawlingButton()

		const {id} = await getResponseJson<{id: string}>(await responsePromise)
		createdPropertyIds.push(id)

		const property = propertyPage(page)
		await expect(property.scansTab).toBeVisible()
		await expect(
			property.crawlRunningText.or(property.scansTable),
		).toBeVisible()
	})
})
