import {existsSync} from 'node:fs'
import {rm} from 'node:fs/promises'

export const deleteDataDirectory = async (filePath: string): Promise<void> => {
	if (existsSync(filePath)) {
		await rm(filePath, {recursive: true, force: true})
	}
}
