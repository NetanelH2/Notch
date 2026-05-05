import path from 'path'

export const STORAGE_STATE_FILE = path.join(process.cwd(), '.auth/user.json')
export const FILE_TO_UPLOAD_TO_SUPPORT = path.join(
	process.cwd(),
	'src',
	'data',
	'file-upload-to-support.txt',
)

export const SETUP_DATA_DIR = path.join(process.cwd(), 'src/setup/data')
export const AUTH_TOKEN_FILE = path.join(SETUP_DATA_DIR, 'auth-token.json')
