import {readFileSync} from 'node:fs'

export const readJsonFile = <T>(path: string): T | null => {
	try {
		return JSON.parse(readFileSync(path, 'utf-8')) as T
	} catch {
		return null
	}
}
