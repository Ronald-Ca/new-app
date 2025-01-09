import { DefaultReturnType } from '../lib/base-service'
import AboutService, { AboutType } from '../services/about-service'
import { useMutation, useQuery } from '@tanstack/react-query'

const about = new AboutService()

type PropsTypeObject = {
	onSuccess?: (data: DefaultReturnType<AboutType>) => void
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onError?: (error: any) => void
}

const useGetAboutQuery = () => {
	return useQuery(['get-home'], () => about.getAbout())
}

const useCreateAboutMutation = (options: PropsTypeObject) => {
	return useMutation(async (data: AboutType) => await about.createAbout(data), {
		onSuccess: options?.onSuccess,
		onError: options?.onError,
	})
}

const useUpdateAboutMutation = (options: PropsTypeObject) => {
	return useMutation(async (data: AboutType) => await about.updateHome(data), {
		onSuccess: options?.onSuccess,
		onError: options?.onError,
	})
}

export { useGetAboutQuery, useCreateAboutMutation, useUpdateAboutMutation }
