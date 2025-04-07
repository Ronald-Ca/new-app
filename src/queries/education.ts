import { DefaultReturnType } from '../lib/base-service'
import EducationService, { EducationType } from '../services/education-service'
import { useMutation, useQuery } from '@tanstack/react-query'

const education = new EducationService()

type PropsTypeObject = {
	onSuccess?: (data: DefaultReturnType<EducationType>) => void
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onError?: (error: any) => void
}

const useGetEducationQuery = () => {
	return useQuery(['get-education'], () => education.getEducation())
}

const useCreateEducationMutation = (options: PropsTypeObject) => {
	return useMutation(async (data: EducationType) => await education.createEducation(data), {
		onSuccess: options?.onSuccess,
		onError: options?.onError,
	})
}

const useUpdateEducationMutation = (options: PropsTypeObject) => {
	return useMutation(async (data: EducationType) => await education.updateEducation(data), {
		onSuccess: options?.onSuccess,
		onError: options?.onError,
	})
}

export { useGetEducationQuery, useCreateEducationMutation, useUpdateEducationMutation }
