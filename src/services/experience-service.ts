import api from "../lib/api"
import BaseService, { DefaultReturnType } from "../lib/base-service"

export default class ExperienceService extends BaseService {
	constructor() {
		super('experience')
	}

	async getAll(): Promise<ExperienceType[]> {
		const response = await api.get('/experience')
		return response.data.data
	}

	async create(data: ExperienceType): Promise<DefaultReturnType<ExperienceType>> {
		const response = await api.post('/experience', data, this.getToken())
		return response.data.data
	}

	async update(data: ExperienceType): Promise<DefaultReturnType<ExperienceType>> {
		const response = await api.put(`/experience/${data.id}`, data, this.getToken())
		return response.data.data
	}
}

export type ExperienceType = {
	id?: string
	company: string
	role: string
	yearInitial: string
	mothInitial: string
	yearFinal: string
	mothFinal: string
	activities: string[]
	experienceSkill: ExperienceSkillType[]
}

type ExperienceSkillType = {
	id: string
	experienceId: string
	skillId: string
}
