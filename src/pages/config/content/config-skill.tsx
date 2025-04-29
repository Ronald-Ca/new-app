
import FormSkill from '../../../components/form/form-skill'
import { Card, CardTitle } from '../../../components/ui/card'
import { DialogHeader } from '../../../components/ui/dialog'
import { useAlert } from '../../../contexts/alertContext'
import { useCreateSkillMutation, useGetSkillsQuery, useUpdateSkillMutation } from '../../../queries/skill'
import { SkillType } from '../../../services/skill-service'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { IoIosAdd, IoIosClose } from 'react-icons/io'
import { useQueryClient } from '@tanstack/react-query'

interface Skill {
	name: string
	level: number
	icon: string
	experience: number
	color: string
	type: 'skill' | 'competence'
}

export default function ConfigSkill() {
	const { setAlert } = useAlert()
	const queryClient = useQueryClient()
	const [isOpen, setIsOpen] = useState(false)
	const [selectedSkill, setSelectedSkill] = useState<SkillType | null>(null)

	const { data: skill } = useGetSkillsQuery()

	const createSkill = useCreateSkillMutation({
		onSuccess: () => {
			setAlert({ title: 'Sucesso!', message: 'Skill criada com sucesso!', type: 'success' })
			queryClient.invalidateQueries(['get-skill'])
		},
		onError: () => {
			setAlert({ title: 'Erro ao criar About!', message: 'Erro ao criar Skill!', type: 'error' })
		},
	})

	const updateSkill = useUpdateSkillMutation({
		onSuccess: () => {
			setAlert({ title: 'Sucesso!', message: 'Skill atualizada com sucesso!', type: 'success' })
			queryClient.invalidateQueries(['get-skill'])
		},
		onError: () => {
			setAlert({ title: 'Erro ao atualizar Skill!', message: 'Erro ao atualizar Skill!', type: 'error' })
		},
	})

	const handleEditClick = (skill: SkillType) => {
		setSelectedSkill(skill)
		setIsOpen(true)
	}

	const handleAddClick = () => {
		setSelectedSkill(null)
		setIsOpen(true)
	}

	const handleSave = (newSkill: Skill) => {
		const experience = Number(newSkill.experience)
		const level = Number(newSkill.level)

		if (selectedSkill) {
			const id = selectedSkill.id
			updateSkill.mutate({ ...newSkill, experience, level, id })
		} else {
			createSkill.mutate({ ...newSkill, experience, level })
		}

		setIsOpen(false)
		setSelectedSkill(null)
	}

	const isMutationLoading = createSkill.isLoading || updateSkill.isLoading

	return (
		<div className='flex flex-col justify-center items-center border-2 border-default pt-5 pb-5 rounded-xl gap-5'>
			<div className='flex flex-wrap justify-center items-center gap-5'>
				{skill &&
					skill.map((skill: SkillType, index: number) => (
						<Card
							key={index}
							onClick={() => handleEditClick(skill)}
							className='bg-slate-950 w-2w h-2h border-2 rounded-xl border-default p-5 flex flex-col justify-center items-center relative cursor-pointer transform hover:scale-105 transition-transform duration-300'
						>
							<FaEdit className='text-3xl text-slate-950 absolute -top-1 -right-1 bg-default p-[3px] rounded-sm' />
							<CardTitle className='text-gray-300 text-2xl font-semibold mb-4'>{skill.name}</CardTitle>
						</Card>
					))}
				<Card
					onClick={handleAddClick}
					className='bg-slate-950 w-2w h-2h border-2 rounded-xl border-default p-5 flex justify-center items-center relative cursor-pointer transform hover:scale-105 transition-transform duration-300'
				>
					<IoIosAdd className='text-gray-300 text-8xl' />
				</Card>
			</div>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
					<div
						className='bg-slate-900 rounded-lg p-6 w-4w mx-auto relative border-2 border-default'
						onClick={(e) => e.stopPropagation()}
					>
						<DialogClose asChild>
							<IoIosClose size={35} className='text-default absolute top-0 right-0 cursor-pointer' onClick={() => setIsOpen(false)} />
						</DialogClose>
						<DialogHeader>
							<DialogTitle className='text-gray-100 text-center font-semibold text-3xl'>
								{selectedSkill ? 'Editar Habilidade' : 'Adicionar Habilidade'}
							</DialogTitle>
						</DialogHeader>
						<FormSkill selectedSkill={selectedSkill} handleSave={handleSave} isSubmitting={isMutationLoading} />
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
