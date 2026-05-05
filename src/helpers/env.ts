export const isCI = (): boolean => process.env.CI === 'true'

const getRequiredEnv = (key: string): string => {
	const value = process.env[key]
	if (value === undefined || value === '') {
		throw new Error(`${key} is not set`)
	}
	return value
}

export const getAuthEmail = (): string => getRequiredEnv('AUTH_EMAIL')
export const getAuthPassword = (): string => getRequiredEnv('AUTH_PASSWORD')
