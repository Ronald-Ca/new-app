import api from "../lib/api"
import BaseService, { DefaultReturnType } from "../lib/base-service"

export default class ProjectsService extends BaseService {
	constructor() {
		super('projects')
	}

	async getAll(): Promise<ProjectType[]> {
		const response = await api.get('/project')
		return response.data.data
	}

	async create(data: ProjectType): Promise<DefaultReturnType<ProjectType>> {
		const formData = new FormData()
		formData.append('name', data.name)
		formData.append('image', data.image)
		if (data.video) formData.append('video', data.video)
		formData.append('description', data.description || '')
		formData.append('link', data.link || '')

		data.projectSkills.forEach((skill) => {
			formData.append('projectSkills', skill.id)
		})

		const response = await api.post('/project', formData, this.getToken())
		return response.data.data
	}

	async update(data: ProjectType): Promise<DefaultReturnType<ProjectType>> {
		const formData = new FormData()
		formData.append('name', data.name)
		formData.append('image', data.image)
		if (data.video) formData.append('video', data.video)
		formData.append('description', data.description || '')
		formData.append('link', data.link || '')

		data.projectSkills.forEach((skill) => {
			formData.append('projectSkills', skill.id)
		})

		const response = await api.put(`/project/${data.id}`, formData, this.getToken())
		return response.data.data
	}
}

export type ProjectType = {
	id?: string
	name: string
	image: string | File
	video?: string | File
	description?: string
	link?: string
	projectSkills: ProjectSkillType[]
}

type ProjectSkillType = {
	id: string
	projectId: string
	skillId: string
}
