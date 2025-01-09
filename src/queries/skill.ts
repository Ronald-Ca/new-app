import { DefaultReturnType } from '../lib/base-service'
import SkillService, { SkillType } from '../services/skill-service'
import { useMutation, useQuery } from '@tanstack/react-query'

const skill = new SkillService()

type PropsTypeObject = {
	onSuccess?: (data: DefaultReturnType<SkillType>) => void
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onError?: (error: any) => void
}

const useGetSkillsQuery = () => {
	return useQuery(['get-skill'], () => skill.getSkills())
}

const useCreateSkillMutation = (options: PropsTypeObject) => {
	return useMutation(async (data: SkillType) => await skill.createSkill(data), {
		onSuccess: options?.onSuccess,
		onError: options?.onError,
	})
}

const useUpdateSkillMutation = (options: PropsTypeObject) => {
	return useMutation(async (data: SkillType) => await skill.updateSkill(data), {
		onSuccess: options?.onSuccess,
		onError: options?.onError,
	})
}

export { useGetSkillsQuery, useCreateSkillMutation, useUpdateSkillMutation }
