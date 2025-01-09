import { DefaultReturnType } from '../lib/base-service'
import CurriculumService, { CurriculumType } from '../services/curriculum-service'
import { useMutation, useQuery } from '@tanstack/react-query'

const about = new CurriculumService()

type PropsTypeObject = {
	onSuccess?: (data: DefaultReturnType<CurriculumType>) => void
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onError?: (error: any) => void
}

const useGetCurriculumQuery = () => {
	return useQuery(['get-curriculum'], () => about.getCurriculum())
}

const useCreateCurriculumMutation = (options: PropsTypeObject) => {
	return useMutation(async (data: CurriculumType) => await about.createCurriculum(data), {
		onSuccess: options?.onSuccess,
		onError: options?.onError,
	})
}

const useUpdateCurriculumMutation = (options: PropsTypeObject) => {
	return useMutation(async (data: CurriculumType) => await about.updateCurriculum(data), {
		onSuccess: options?.onSuccess,
		onError: options?.onError,
	})
}

export { useGetCurriculumQuery, useCreateCurriculumMutation, useUpdateCurriculumMutation }
