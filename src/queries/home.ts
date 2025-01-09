import { DefaultReturnType } from '../lib/base-service'
import HomeService, { HomeType } from '../services/home-service'
import { useMutation, useQuery } from '@tanstack/react-query'

const home = new HomeService()

type PropsTypeObject = {
	onSuccess?: (data: DefaultReturnType<HomeType>) => void
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onError?: (error: any) => void
}

const useGetHomeQuery = () => {
	return useQuery(['get-home'], () => home.getHome())
}

const useCreateHomeMutation = (options: PropsTypeObject) => {
	return useMutation(async (data: HomeType) => await home.createHome(data), {
		onSuccess: options?.onSuccess,
		onError: options?.onError,
	})
}

const useUpdateHomeMutation = (options: PropsTypeObject) => {
	return useMutation(async (data: HomeType) => await home.updateHome(data), {
		onSuccess: options?.onSuccess,
		onError: options?.onError,
	})
}

export { useGetHomeQuery, useCreateHomeMutation, useUpdateHomeMutation }
