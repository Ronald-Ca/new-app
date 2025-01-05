import { DefaultReturnType } from '../lib/base-service'
import SocialMediaService, { SocialMediaType } from '../services/social-media-service'
import { useMutation, useQuery } from 'react-query'

const socialMedia = new SocialMediaService()

type PropsTypeObject = {
	onSuccess?: (data: DefaultReturnType<SocialMediaType>) => void
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onError?: (error: any) => void
}

const useGetSocialMediaQuery = () => {
	return useQuery(['get-social-media'], () => socialMedia.getAll())
}

const useCreateSocialMediaMutation = (options: PropsTypeObject) => {
	return useMutation(async (data: SocialMediaType) => await socialMedia.create(data), {
		onSuccess: options?.onSuccess,
		onError: options?.onError,
	})
}

const useUpdateSocialMediaMutation = (options: PropsTypeObject) => {
	return useMutation(async (data: SocialMediaType) => await socialMedia.update(data), {
		onSuccess: options?.onSuccess,
		onError: options?.onError,
	})
}

export { useGetSocialMediaQuery, useCreateSocialMediaMutation, useUpdateSocialMediaMutation }
