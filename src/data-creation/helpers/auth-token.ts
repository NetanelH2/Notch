import {FILE_PATH} from '../constants/file-paths'
import {readJsonFile} from './read-file'

export const getAuthToken = (): string | undefined => {
	const authData: {token: string} | null = readJsonFile<{token: string}>(
		FILE_PATH.AUTH_TOKEN_FILE,
	)
	return authData?.token ?? undefined
}
