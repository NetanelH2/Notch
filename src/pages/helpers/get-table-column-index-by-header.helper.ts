import type {Locator} from '@playwright/test'

export const getTableColumnIndexByHeader = async (
	tableHeaders: Locator,
	headerName: string,
): Promise<number> => {
	const headers = (await tableHeaders.allInnerTexts()).map((text) =>
		text.trim(),
	)
	const headerColumnIndex = headers.findIndex((header) => header === headerName)

	if (headerColumnIndex === -1) {
		throw new Error(`Column "${headerName}" not found in table`)
	}

	return headerColumnIndex
}
