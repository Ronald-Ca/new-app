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
		const formData = new FormData()
		formData.append('course', data.course)
		formData.append('institution', data.institution)
		formData.append('yearInit', data.yearInit)
		if (data.yearFinal) {
			formData.append('yearFinal', data.yearFinal)
		}
		if (data.city) {
			formData.append('city', data.city)
		}
		if (data.state) {
			formData.append('state', data.state)
		}
		if (data.modality) {
			formData.append('modality', data.modality)
		}

		const response = await api.post('/education', formData, this.getToken())
		return response.data
	}

	async updateEducation(data: EducationType): Promise<DefaultReturnType<EducationType>> {
		const formData = new FormData()
		formData.append('course', data.course)
		formData.append('institution', data.institution)
		formData.append('yearInit', data.yearInit)
		if (data.yearFinal) {
			formData.append('yearFinal', data.yearFinal)
		}
		if (data.city) {
			formData.append('city', data.city)
		}
		if (data.state) {
			formData.append('state', data.state)
		}
		if (data.modality) {
			formData.append('modality', data.modality)
		}

		const response = await api.put(`/education/${data.id}`, formData, this.getToken())
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
	modality?: string
}
