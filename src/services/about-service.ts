import api from "../lib/api"
import BaseService, { DefaultReturnType } from "../lib/base-service"

export default class AboutService extends BaseService {
	constructor() {
		super('about')
	}
	async getAbout(): Promise<AboutType> {
		const response = await api.get('/about/get')
		return response.data.data
	}
	async createAbout(data: AboutType): Promise<DefaultReturnType<AboutType>> {
		const formData = new FormData()
		formData.append('person', data.person)
		formData.append('education', data.education)
		formData.append('address', data.address)
		if (data.image) {
			formData.append('image', data.image)
		}

		const response = await api.post('/about/create', formData, this.getToken())
		return response.data
	}

	async updateHome(data: AboutType): Promise<DefaultReturnType<AboutType>> {
		const formData = new FormData()
		formData.append('person', data.person)
		formData.append('education', data.education)
		formData.append('address', data.address)
		if (data.image) {
			formData.append('image', data.image)
		}

		const response = await api.put(`/about/update/${data.id}`, formData, this.getToken())
		return response.data
	}
}

export type AboutType = {
	id?: string
	person: string
	education: string
	address: string
	image: File | null
}
