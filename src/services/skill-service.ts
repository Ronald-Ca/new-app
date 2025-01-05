import api from "../lib/api"
import BaseService, { DefaultReturnType } from "../lib/base-service"

export default class SkillService extends BaseService {
	constructor() {
		super('skill')
	}
	async getSkills(): Promise<SkillType[]> {
		const response = await api.get('/skill', this.getToken())
		return response.data.data
	}
	async createSkill(data: SkillType): Promise<DefaultReturnType<SkillType>> {
		const response = await api.post('/skill/create', data, this.getToken())
		return response.data
	}

	async updateSkill(data: SkillType): Promise<DefaultReturnType<SkillType>> {
		const response = await api.put(`/skill/update/${data.id}`, data, this.getToken())
		return response.data
	}
}

export type SkillType = {
	id?: string
	name: string
	level: number
	experience: number
	type: 'skill' | 'competence'
	icon: string
	color: string
}
