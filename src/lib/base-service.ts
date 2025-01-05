export default class BaseService {
	protected _routeBase: string

	constructor(basePath: string) {
		this._routeBase = basePath
	}

	getToken() {
		const headers = {
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth') as string)?.token}`,
			},
		}

		return headers
	}
}

export type DefaultReturnType<T> = {
	status: number
	mensagem: string
	data: T
}
