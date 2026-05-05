export const BASE_URL = 'https://guardio.app.getnotch.dev'

export const ROUTES = {
	home: BASE_URL,
	login: `${BASE_URL}/login`,
	inbox: `${BASE_URL}/conversations/inbox/`,
} as const
