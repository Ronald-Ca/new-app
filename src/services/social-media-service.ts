import api from "../lib/api"
import BaseService, { DefaultReturnType } from "../lib/base-service"
export default class SocialMediaService extends BaseService {
	constructor() {
		super('social-media')
	}

	async getAll(): Promise<SocialMediaType[]> {
		const response = await api.get('/social-media')
		return response.data.data
	}

	async create(data: SocialMediaType): Promise<DefaultReturnType<SocialMediaType>> {
		const response = await api.post('/social-media', data, this.getToken())
		return response.data.data
	}

	async update(data: SocialMediaType): Promise<DefaultReturnType<SocialMediaType>> {
		const response = await api.put(`/social-media/${data.id}`, data, this.getToken())
		return response.data.data
	}
}

export type SocialMediaType = {
	id?: string
	name: string
	link: string
	icon: string
	color: string
}
