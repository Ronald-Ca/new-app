import { FormProject } from '@app/components/form/form-project'
import { Card, CardContent, CardHeader, CardTitle } from '@app/components/ui/card'
import { Button } from '@app/components/ui/button'
import { useAlert } from '@app/contexts/alert-context'
import { useCreateProjectMutation, useGetProjectsQuery, useUpdateProjectMutation } from '@app/queries/project'
import { ProjectType } from '@app/services/project-service'
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'	
import { IoIosAdd, IoIosClose } from 'react-icons/io'
import { useQueryClient } from '@tanstack/react-query'

export default function ConfigProject() {
	const { setAlert } = useAlert()
	const queryClient = useQueryClient()
	const [isOpen, setIsOpen] = useState(false)
	const [selectedProject, setSelectedProject] = useState<ProjectType | undefined>(undefined)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

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
		<div className="min-h-full">
			<div className="mb-6 flex items-center justify-between">
				<h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
					<span className="bg-cyan-500/10 p-2 rounded-md">
						<FaEdit className="text-cyan-400" size={24} />
					</span>
					Projetos
				</h2>
				<Button
					onClick={handleAddClick}
					className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
				>
					<IoIosAdd size={20} className="mr-1" /> Adicionar Projeto
				</Button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{projects && projects.map((project: ProjectType, index: number) => (
					<Card
						key={index}
						onClick={() => handleEditClick(project)}
						className="bg-[#070b14] border border-[#1e2a4a] hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer group overflow-hidden relative"
					>
						<div className="absolute top-2 right-2 flex gap-1">
							<Button
								size="sm"
								variant="ghost"
								className="h-7 w-7 p-0 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
								onClick={e => { e.stopPropagation(); handleEditClick(project); }}
							>
								<FaEdit size={14} />
							</Button>
							<Button
								size="sm"
								variant="ghost"
								className="h-7 w-7 p-0 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
								onClick={e => { e.stopPropagation(); setSelectedProject(project); setIsDeleteDialogOpen(true); }}
							>
								<FaTrash size={14} />
							</Button>
						</div>
						<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
						<CardHeader className="pb-2 text-center mt-8">
							<CardTitle className="text-lg font-semibold text-gray-100 group-hover:text-cyan-400 transition-colors">
								{project.name}
							</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col items-center justify-center pb-2 px-3">
							<img src={project.image as string} alt={`${project.name} preview`} className="mb-4 rounded-xl max-h-32 object-contain bg-slate-800 w-full" />
							{/* Exemplo de badge para status/tipo se houver: */}
							{/* <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 text-xs mt-2">Ativo</Badge> */}
						</CardContent>
					</Card>
				))}
				<Card
					onClick={handleAddClick}
					className="bg-[#070b14] border border-dashed border-[#1e2a4a] hover:border-cyan-500/50 transition-all duration-300 flex items-center justify-center h-[250px] cursor-pointer group"
				>
					<div className="flex flex-col items-center justify-center gap-3 text-gray-500 group-hover:text-cyan-400 transition-colors">
						<div className="w-16 h-16 rounded-full bg-[#0c1220] flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
							<IoIosAdd size={40} className="transition-transform group-hover:scale-110 duration-300" />
						</div>
						<p className="font-medium">Adicionar Projeto</p>
					</div>
				</Card>
			</div>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent
					className="
					fixed top-1/2 left-1/2 
					p-4 rounded-lg
					transform -translate-x-1/2 -translate-y-1/2 
					bg-[#0c1220] border border-[#1e2a4a] 
					text-gray-100 w-full max-w-2xl max-h-[90vh] overflow-y-auto
					scrollbar-thin
					scrollbar-track-transparent scrollbar-track-rounded-lg
					scrollbar-thumb-cyan-400 scrollbar-thumb-rounded-lg
					hover:scrollbar-thumb-cyan-400
					"
				>
					<div className="mb-4">
						<DialogTitle className="text-xl font-semibold text-cyan-400 flex items-center justify-between gap-2">
							<div className="flex gap-2 items-center">
								<FaEdit size={18} />
								{selectedProject ? 'Editar Projeto' : 'Adicionar Projeto'}
							</div>
							<IoIosClose className="cursor-pointer" onClick={() => setIsOpen(false)} />
						</DialogTitle>
					</div>
					<FormProject selectedProject={selectedProject} handleSave={handleSave} isSubmitting={isMutating} />
				</DialogContent>
			</Dialog>
			<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<DialogContent
					className="
					fixed top-1/2 left-1/2 
					p-4 rounded-lg
					transform -translate-x-1/2 -translate-y-1/2 
					bg-[#0c1220] border border-[#1e2a4a] 
					text-gray-100 w-full max-w-md max-h-[90vh] overflow-y-auto
					"
				>
					<div className="mb-4">
						<DialogTitle className="text-xl font-semibold text-red-400 flex items-center justify-between gap-2">
							<div className="flex gap-2 items-center">
								<FaTrash size={18} />
								Confirmar exclusão
							</div>
							<IoIosClose className="cursor-pointer" onClick={() => setIsDeleteDialogOpen(false)} />
						</DialogTitle>
					</div>
					<div className="text-gray-400 mb-4">
						Tem certeza que deseja excluir o projeto{' '}
						<span className="font-semibold text-gray-300">{selectedProject?.name}</span>?
						<br />Esta ação não pode ser desfeita.
					</div>
					<div className="flex justify-end gap-2">
						<Button
							variant="ghost"
							className="pt-1 pb-1 pl-2 pr-2 rounded-sm bg-[#070b14] text-gray-300 hover:bg-[#111827] hover:text-gray-100"
							onClick={() => setIsDeleteDialogOpen(false)}
						>
							Cancelar
						</Button>
						<Button
							variant="destructive"
							className="pt-1 pb-1 pl-2 pr-2 rounded-sm bg-red-600 hover:bg-red-700 text-white"
							// onClick={handleDeleteProject} // Implemente a função de exclusão real
							disabled
						>
							Excluir
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
