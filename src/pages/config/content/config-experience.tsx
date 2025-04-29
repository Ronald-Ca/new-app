import { FormExperience } from '../../../components/form/form-experience'
import { Card, CardTitle } from '../../../components/ui/card'
import { DialogHeader } from '../../../components/ui/dialog'
import { useAlert } from '../../../contexts/alertContext'
import { useCreateExperienceMutation, useGetExperienceQuery, useUpdateExperienceMutation } from '../../../queries/experience'
import { ExperienceType } from '../../../services/experience-service'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { IoIosAdd, IoIosClose } from 'react-icons/io'
import { useQueryClient } from '@tanstack/react-query'

export default function ConfigExperience() {
	const { setAlert } = useAlert()
	const queryClient = useQueryClient()
	const [isOpen, setIsOpen] = useState(false)
	const [selectedExperience, setSelectedExperience] = useState<ExperienceType>()

	const handleEditClick = (experience: ExperienceType) => {
		setSelectedExperience(experience)
		setIsOpen(true)
	}

	const handleAddClick = () => {
		setSelectedExperience(undefined)
		setIsOpen(true)
	}

	const { data: experiences } = useGetExperienceQuery()

	const createExperience = useCreateExperienceMutation({
		onSuccess: () => {
			setIsOpen(false)
			queryClient.invalidateQueries(['get-experience'])
			setAlert({ title: 'Sucesso!', message: 'Experiência criada com sucesso!', type: 'success' })
		},
		onError: () => {
			setAlert({ title: 'Erro ao criar Experiência!', message: 'Erro ao criar a experiência!', type: 'error' })
		},
	})

	const updateExperience = useUpdateExperienceMutation({
		onSuccess: () => {
			setIsOpen(false)
			queryClient.invalidateQueries(['get-experience'])
			setAlert({ title: 'Sucesso!', message: 'Experiência atualizada com sucesso!', type: 'success' })
		},
		onError: () => {
			setAlert({ title: 'Erro ao atualizar Experiência!', message: 'Erro ao atualizar a experiência!', type: 'error' })
		},
	})

	const handleSave = (newExperience: ExperienceType) => {
		if (selectedExperience) {
			updateExperience.mutate(newExperience)
		} else {
			createExperience.mutate(newExperience)
		}
		setIsOpen(false)
	}

	const isMutating = createExperience.isLoading || updateExperience.isLoading

	return (
		<div className='flex flex-col justify-center items-center border-2 border-default pt-5 pb-5 rounded-xl gap-5'>
			<div className='flex gap-5'>
				{experiences &&
					experiences.map((experience: ExperienceType, index: number) => (
						<Card
							key={index}
							onClick={() => handleEditClick(experience)}
							className='bg-slate-950 w-3w h-3h border-2 rounded-xl border-default p-5 flex justify-center items-center relative cursor-pointer transform hover:scale-105 transition-transform duration-300'
						>
							<FaEdit className='text-3xl text-slate-950 absolute -top-1 -right-1 bg-default p-1 rounded-2' />
							<CardTitle className='text-gray-300 text-2xl font-semibold'>{experience.company}</CardTitle>
						</Card>
					))}
				<Card
					onClick={handleAddClick}
					className='bg-slate-950 w-3w h-3h border-2 rounded-xl border-default p-5 flex justify-center items-center relative cursor-pointer transform hover:scale-105 transition-transform duration-300'
				>
					<IoIosAdd className='text-gray-300 text-8xl' />
				</Card>
			</div>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
					<div
						className='bg-slate-900 rounded-lg p-6 w-5w mx-auto relative border-2 border-default'
						onClick={(e) => e.stopPropagation()}
					>
						<DialogClose asChild>
							<IoIosClose size={35} className='text-default absolute top-0 right-0 cursor-pointer' onClick={() => setIsOpen(false)} />
						</DialogClose>
						<DialogHeader>
							<DialogTitle className='text-gray-100 text-center font-semibold text-3xl'>
								{selectedExperience ? 'Editar Experiência' : 'Adicionar Experiência'}
							</DialogTitle>
						</DialogHeader>
						<DialogDescription>
							<FormExperience selectedExperience={selectedExperience} handleSave={handleSave} isSubmitting={isMutating} />
						</DialogDescription>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
