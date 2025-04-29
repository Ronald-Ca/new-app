
import { FormProject } from '../../../components/form/form-project'
import { Card, CardContent, CardTitle } from '../../../components/ui/card'
import { DialogHeader } from '../../../components/ui/dialog'
import { useAlert } from '../../../contexts/alertContext'
import { useCreateProjectMutation, useGetProjectsQuery, useUpdateProjectMutation } from '../../../queries/project'
import { ProjectType } from '../../../services/project-service'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { IoIosAdd, IoIosClose } from 'react-icons/io'
import { useQueryClient } from '@tanstack/react-query'

export default function ConfigProject() {
	const { setAlert } = useAlert()
	const queryClient = useQueryClient()
	const [isOpen, setIsOpen] = useState(false)
	const [selectedProject, setSelectedProject] = useState<ProjectType | undefined>(undefined)

	const handleEditClick = (project: ProjectType) => {
		setSelectedProject(project)
		setIsOpen(true)
	}

	const handleAddClick = () => {
		setSelectedProject(undefined)
		setIsOpen(true)
	}

	const { data: projects } = useGetProjectsQuery()

	const createProject = useCreateProjectMutation({
		onSuccess: () => {
			setIsOpen(false)
			queryClient.invalidateQueries(['get-projects'])
			setAlert({ title: 'Sucesso!', message: 'Projeto criado com sucesso!', type: 'success' })
		},
		onError: () => {
			setAlert({ title: 'Erro ao criar Projeto!', message: 'Erro ao criar o projeto!', type: 'error' })
		},
	})

	const updateProject = useUpdateProjectMutation({
		onSuccess: () => {
			setIsOpen(false)
			queryClient.invalidateQueries(['get-projects'])
			setAlert({ title: 'Sucesso!', message: 'Projeto atualizado com sucesso!', type: 'success' })
		},
		onError: () => {
			setAlert({ title: 'Erro ao atualizar Projeto!', message: 'Erro ao atualizar o projeto!', type: 'error' })
		},
	})

	const handleSave = (newProject: ProjectType) => {
		if (selectedProject) {
			updateProject.mutate({ ...selectedProject, ...newProject, id: selectedProject.id })
		} else {
			createProject.mutate(newProject)
		}
	}

	const isMutating = createProject.isLoading || updateProject.isLoading

	return (
		<>
			<div className='flex flex-wrap justify-center items-center border-2 border-default pt-5 pb-5 rounded-[10px] gap-5'>
				{projects &&
					projects.map((project: ProjectType, index: number) => (
						<Card
							key={index}
							onClick={() => handleEditClick(project)}
							className='bg-slate-950 w-3w h-3h border-2 rounded-xl border-default p-5 flex flex-col justify-center items-center relative cursor-pointer transform hover:scale-105 transition-transform duration-300'
						>
							<FaEdit className='text-3xl text-slate-950 absolute -top-1 -right-1 bg-default p-1 rounded-sm' />
							<CardContent className='flex justify-center'>
								<img src={project.image as string} alt={`${project.name} preview`} className='mb-4 rounded-xl' />
							</CardContent>
							<CardTitle className='text-gray-300 text-2xl font-semibold mb-4'>{project.name}</CardTitle>
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
						className='bg-slate-900 rounded-lg p-6 w-5w h-8h relative border-2 border-default'
						onClick={(e) => e.stopPropagation()}
					>
						<DialogClose asChild>
							<IoIosClose size={35} className='text-default absolute top-0 right-0 cursor-pointer' onClick={() => setIsOpen(false)} />
						</DialogClose>
						<DialogHeader>
							<DialogTitle className='text-gray-100 text-center font-semibold text-3xl'>
								{selectedProject ? 'Editar Projeto' : 'Adicionar Projeto'}
							</DialogTitle>
						</DialogHeader>
						<DialogDescription className='h-6h overflow-y-auto p-2'>
							<FormProject selectedProject={selectedProject} handleSave={handleSave} isSubmitting={isMutating} />
						</DialogDescription>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}
