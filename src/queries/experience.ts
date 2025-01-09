import { DefaultReturnType } from '../lib/base-service'
import ExperienceService, { ExperienceType } from '../services/experience-service'
import { useMutation, useQuery } from '@tanstack/react-query'

const experience = new ExperienceService()

type PropsTypeObject = {
	onSuccess?: (data: DefaultReturnType<ExperienceType>) => void
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onError?: (error: any) => void
}

const useGetExperienceQuery = () => {
	return useQuery(['get-experience'], () => experience.getAll())
}

const useCreateExperienceMutation = (options: PropsTypeObject) => {
	return useMutation(async (data: ExperienceType) => await experience.create(data), {
		onSuccess: options?.onSuccess,
		onError: options?.onError,
	})
}

const useUpdateExperienceMutation = (options: PropsTypeObject) => {
	return useMutation(async (data: ExperienceType) => await experience.update(data), {
		onSuccess: options?.onSuccess,
		onError: options?.onError,
	})
}

export { useGetExperienceQuery, useCreateExperienceMutation, useUpdateExperienceMutation }
