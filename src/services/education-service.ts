import api from "../lib/api"
import BaseService, { DefaultReturnType } from "../lib/base-service"

export default class EducationService extends BaseService {
	constructor() {
		super('education')
	}

	async getEducation(): Promise<EducationType[]> {
		const response = await api.get('/education')
		return response.data.data
	}

	async createEducation(data: EducationType): Promise<DefaultReturnType<EducationType>> {
		const response = await api.post('/education', data, this.getToken())
		return response.data
	}

	async updateEducation(data: EducationType): Promise<DefaultReturnType<EducationType>> {
		const response = await api.put(`/education/${data.id}`, data, this.getToken())
		return response.data
	}
}

export type EducationType = {
	id?: string
	course: string
	institution: string
	yearInit: string
	yearFinal?: string
	city?: string
	state?: string
	modality?: 'on-site' | 'hybrid' | 'remote'
}
