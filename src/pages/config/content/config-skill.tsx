import FormSkill from '../../../components/form/form-skill'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import { useAlert } from '../../../contexts/alert-context'
import { useCreateSkillMutation, useGetSkillsQuery, useUpdateSkillMutation } from '../../../queries/skill'
import { SkillType } from '../../../services/skill-service'
import { useState } from 'react'
import { FaCode, FaEdit, FaTrash } from 'react-icons/fa'
import { IoIosAdd } from 'react-icons/io'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@app/components/ui/button'
import { Badge } from '@app/components/ui/badge'
import { Progress } from '@radix-ui/react-progress'
import DeleteDialog from '@app/components/common/dialogs/delete-dialog/delete-dialog'
import FormDialog from '@app/components/common/dialogs/form-dialog/form-dialog'
import SkeletonGrid from '@app/components/common/skeleton-grid/skeleton-grid'
import PageHeader from '@app/components/common/page-header/page-header'

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
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

	const { data: skills, isLoading } = useGetSkillsQuery()

	const createSkill = useCreateSkillMutation({
		onSuccess: () => {
			setIsOpen(false)
			queryClient.invalidateQueries(["get-skill"])
			setAlert({ title: "Sucesso!", message: "Habilidade criada com sucesso!", type: "success" })
		},
		onError: () => {
			setAlert({ title: "Erro!", message: "Erro ao criar a habilidade!", type: "error" })
		},
	})

	const updateSkill = useUpdateSkillMutation({
		onSuccess: () => {
			setIsOpen(false)
			queryClient.invalidateQueries(["get-skill"])
			setAlert({ title: "Sucesso!", message: "Habilidade atualizada com sucesso!", type: "success" })
		},
		onError: () => {
			setAlert({ title: "Erro!", message: "Erro ao atualizar a habilidade!", type: "error" })
		},
	})

	const handleEditClick = (skill: SkillType, e: React.MouseEvent) => {
		e.stopPropagation()
		setSelectedSkill(skill)
		setIsOpen(true)
	}

	const handleDeleteClick = (skill: SkillType, e: React.MouseEvent) => {
		e.stopPropagation()
		setSelectedSkill(skill)
		setIsDeleteDialogOpen(true)
	}

	const handleCardClick = (skill: SkillType) => {
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
	}

	const isMutationLoading = createSkill.isLoading || updateSkill.isLoading

	// Função para obter a cor do texto baseada na cor de fundo
	const getTextColor = (bgColor: string) => {
		// Se a cor começar com # e tiver 7 caracteres (formato #RRGGBB)
		if (bgColor && bgColor.startsWith("#") && bgColor.length === 7) {
			// Converte a cor hex para RGB
			const r = Number.parseInt(bgColor.slice(1, 3), 16)
			const g = Number.parseInt(bgColor.slice(3, 5), 16)
			const b = Number.parseInt(bgColor.slice(5, 7), 16)

			// Calcula a luminosidade (fórmula simplificada)
			const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

			// Retorna branco para cores escuras e preto para cores claras
			return luminance > 0.5 ? "#000000" : "#FFFFFF"
		}

		// Cor padrão se não conseguir determinar
		return "#FFFFFF"
	}

	return (
		<div className="min-h-full">
			<PageHeader
				title="Habilidades e Competências"
				titleIcon={<FaCode size={24} className="text-cyan-400" />}
				buttonText="Adicionar Habilidade"
				buttonIcon={<IoIosAdd size={20} />}
				onButtonClick={handleAddClick}
			/>

			{isLoading ? (
				<SkeletonGrid count={8} className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4' />
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
					{skills &&
						skills.map((skill: SkillType) => (
							<Card
								key={skill.id}
								onClick={() => handleCardClick(skill)}
								className="
								bg-[#070b14] border border-[#1e2a4a] hover:border-cyan-500/50 
								transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 
								cursor-pointer group overflow-hidden relative"
							>
								<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

								<CardHeader className="pb-2 text-center">
									<CardTitle className="text-lg font-semibold text-gray-100 group-hover:text-cyan-400 transition-colors">
										{skill.name}
									</CardTitle>
								</CardHeader>

								<CardContent className="pb-2 px-3">
									<div className="space-y-3">
										<div className="space-y-1">
											<div className="flex justify-between text-xs">
												<span className="text-gray-400">Nível:</span>
												<span className="text-cyan-400">{skill.level}/10</span>
											</div>

											<Progress value={skill.level * 10} className="h-2 w-full bg-slate-700">
												<div
													className={`linear-gradient(to right, ${skill.color ? `${skill.color}-500, ${skill.color}-600` : "cyan-500, blue-600"}) rounded-full`}
													style={{ width: `${skill.level * 10}%` }}
												></div>
											</Progress>
										</div>

										<div className="flex justify-between items-center text-xs">
											<span className="text-gray-400">Experiência:</span>
											<Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 text-xs">
												{skill.experience} {skill.experience === 1 ? "ano" : "anos"}
											</Badge>
										</div>

										<div className="flex justify-between items-center text-xs">
											<span className="text-gray-400">Tipo:</span>
											<Badge
												variant="outline"
												className={`${skill.type === "skill"
													? "bg-blue-500/10 text-blue-400 border-blue-500/30"
													: "bg-purple-500/10 text-purple-400 border-purple-500/30"
													} text-xs`}
											>
												{skill.type === "skill" ? "Habilidade" : "Competência"}
											</Badge>
										</div>
									</div>
								</CardContent>

								<CardFooter className="flex justify-center pt-0 pb-3">
									<div
										className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
										style={{
											backgroundColor: skill.color || "#0ea5e9",
											color: getTextColor(skill.color),
										}}
									>
										{skill.icon || "💻"}
									</div>
								</CardFooter>

								<div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
									<Button
										size="sm"
										variant="ghost"
										className="h-6 w-6 p-0 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
										onClick={(e) => handleEditClick(skill, e)}
									>
										<FaEdit size={12} />
									</Button>
									<Button
										size="sm"
										variant="ghost"
										className="h-6 w-6 p-0 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
										onClick={(e) => handleDeleteClick(skill, e)}
									>
										<FaTrash size={12} />
									</Button>
								</div>
							</Card>
						))}
					<Card
						onClick={handleAddClick}
						className="bg-[#070b14] border border-dashed border-[#1e2a4a] hover:border-cyan-500/50 transition-all duration-300 flex items-center justify-center h-[180px] cursor-pointer group"
					>
						<div className="flex flex-col items-center justify-center gap-3 text-gray-500 group-hover:text-cyan-400 transition-colors">
							<div className="w-12 h-12 rounded-full bg-[#0c1220] flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
								<IoIosAdd size={30} className="transition-transform group-hover:scale-110 duration-300" />
							</div>
							<p className="font-medium text-sm">Adicionar Habilidade</p>
						</div>
					</Card>
				</div>
			)}

			<FormDialog
				open={isOpen}
				onOpenChange={setIsOpen}
				title={selectedSkill ? 'Editar Habilidade' : 'Adicionar Habilidade'}
				icon={<FaCode size={18} />}
			>
				<FormSkill selectedSkill={selectedSkill} handleSave={handleSave} isSubmitting={isMutationLoading} />
			</FormDialog>

			<DeleteDialog
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
				title="Confirmar exclusão"
				description={
					<>
						Tem certeza que deseja excluir a habilidade{' '}
						<span className="font-semibold text-gray-300">
							{selectedSkill?.name}
						</span>
						?<br />
						Esta ação não pode ser desfeita.
					</>
				}
				cancelText="Cancelar"
				confirmText="Excluir"
				isLoading={false}
				onConfirm={() => { }}
			/>
		</div>
	)
}
