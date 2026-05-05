export type APIResponse<T> = {
	status: number
	body: T
	headers: Record<string, string>
}
