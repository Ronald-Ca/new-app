import api from '../lib/api'
import BaseService, { DefaultReturnType } from '../lib/base-service'

export default class HomeService extends BaseService {
	constructor() {
		super('home')
	}

	async getHome(): Promise<HomeType> {
		const response = await api.get('/home/get')
		return response.data.data
	}

	async createHome(data: HomeType): Promise<DefaultReturnType<HomeType>> {
		const formData = new FormData()
		formData.append('title', data.title)
		formData.append('role', data.role)
		formData.append('description', data.description)
		if (data.image) {
			formData.append('image', data.image)
		}

		const response = await api.post('/home/create', formData, this.getToken())
		return response.data
	}

	async updateHome(data: HomeType): Promise<DefaultReturnType<HomeType>> {
		const formData = new FormData()
		formData.append('title', data.title)
		formData.append('role', data.role)
		formData.append('description', data.description)
		if (data.image) {
			formData.append('image', data.image)
		}

		const response = await api.put(`/home/update/${data.id}`, formData, this.getToken())
		return response.data
	}
}

export type HomeType = {
	id?: string
	image: File | null
	title: string
	role: string
	description: string
}
