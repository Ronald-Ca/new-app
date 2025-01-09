import { DefaultReturnType } from '../lib/base-service'
import UserService, { UserLoginResponseType, UserLoginType } from '../services/user-service'
import { useMutation } from '@tanstack/react-query'

const user = new UserService()

type PropsTypeObject = {
	onSuccess?: (data: DefaultReturnType<UserLoginResponseType>) => void
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onError?: (error: any) => void
}

const useAuthenticateMutation = (options: PropsTypeObject) => {
	return useMutation(async (data: UserLoginType) => await user.authenticate(data), {
		onSuccess: options?.onSuccess,
		onError: options?.onError,
	})
}

export { useAuthenticateMutation }
