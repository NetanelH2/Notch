import {test as teardown} from '@playwright/test'
import {SETUP_DATA_DIR} from '../data-creation/constants/file-paths'
import {deleteDataDirectory} from '../data-creation/helpers/resources-file'

teardown.describe('Global Teardown', () => {
	teardown('Delete Setup Data Directory', async () => {
		try {
			await deleteDataDirectory(SETUP_DATA_DIR)
		} catch (error) {
			throw new Error(`Error deleting setup data directory: ${error}`)
		}
	})
})
