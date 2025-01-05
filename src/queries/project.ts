import { DefaultReturnType } from '../lib/base-service'
import ProjectsService, { ProjectType } from '../services/project-service'
import { useMutation, useQuery } from 'react-query'

const project = new ProjectsService()

type PropsTypeObject = {
	onSuccess?: (data: DefaultReturnType<ProjectType>) => void
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onError?: (error: any) => void
}

const useGetProjectsQuery = () => {
	return useQuery(['get-projects'], () => project.getAll())
}

const useCreateProjectMutation = (options: PropsTypeObject) => {
	return useMutation(async (data: ProjectType) => await project.create(data), {
		onSuccess: options?.onSuccess,
		onError: options?.onError,
	})
}

const useUpdateProjectMutation = (options: PropsTypeObject) => {
	return useMutation(async (data: ProjectType) => await project.update(data), {
		onSuccess: options?.onSuccess,
		onError: options?.onError,
	})
}

export { useGetProjectsQuery, useCreateProjectMutation, useUpdateProjectMutation }
