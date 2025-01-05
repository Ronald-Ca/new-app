import api from "../lib/api"
import BaseService, { DefaultReturnType } from "../lib/base-service"

export default class UserService extends BaseService {
	constructor() {
		super('user')
	}

	async authenticate(data: UserLoginType): Promise<DefaultReturnType<UserLoginResponseType>> {
		const response = await api.post('/user/authenticate', data)
		return response.data
	}

	async validateToken(data: UserLoginType): Promise<UserLoginResponseType> {
		const response = await api.post('/user/validate-token', data)
		return response.data
	}
}

export interface UserLoginType {
	email: string
	password: string
	token?: string
}

export interface UserLoginResponseType {
	token: string
	user: UserLoginType
}
