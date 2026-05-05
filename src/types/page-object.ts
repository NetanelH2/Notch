export type NavigablePage = {
	goto(...args: string[]): Promise<unknown>
	[key: string]: unknown
}
