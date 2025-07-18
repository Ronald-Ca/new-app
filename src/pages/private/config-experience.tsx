import type React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@app/components/ui/card"
import { DialogHeader } from "@app/components/ui/dialog"
import { useAlert } from "@app/contexts/alert-context"
import {
	useCreateExperienceMutation,
	useGetExperienceQuery,
	useUpdateExperienceMutation,
} from "@app/queries/experience"
import type { ExperienceType } from "@app/services/experience-service"
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { useState } from "react"
import { FaEdit, FaBriefcase } from "react-icons/fa"
import { IoIosAdd } from "react-icons/io"
import { useQueryClient } from "@tanstack/react-query"
import { FormExperience } from "@app/components/form/form-experience"
import { FaTrash } from "react-icons/fa6"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
} from "@radix-ui/react-alert-dialog"
import { IoClose } from "react-icons/io5"
import { Button } from "@app/components/ui/button"
import { TruncatedName } from "@app/components/common/truncate-tooltip/truncate-name"
import { Badge } from "@app/components/ui/badge"
import { AlertDialogFooter, AlertDialogHeader } from "@app/components/ui/alert-dialog"
import { useGetSkillsQuery } from "@app/queries/skill"
import { ConfigExperienceSkeleton } from "@app/components/common/skeleton/config-experience-skeleton"

export default function ConfigExperience() {
	const { setAlert } = useAlert()
	const queryClient = useQueryClient()
	const [isOpen, setIsOpen] = useState(false)
	const [selectedExperience, setSelectedExperience] = useState<ExperienceType | undefined>(undefined)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

	const { data: experiences, isLoading } = useGetExperienceQuery()
	const { data: skills, isLoading: isLoadingSkills } = useGetSkillsQuery()

	const createExperience = useCreateExperienceMutation({
		onSuccess: () => {
			setIsOpen(false)
			queryClient.invalidateQueries(["get-experience"])
			setAlert({ title: "Sucesso!", message: "Experiência criada com sucesso!", type: "success" })
		},
		onError: () => {
			setAlert({ title: "Erro!", message: "Erro ao criar a experiência!", type: "error" })
		},
	})

	const updateExperience = useUpdateExperienceMutation({
		onSuccess: () => {
			setIsOpen(false)
			queryClient.invalidateQueries(["get-experience"])
			setAlert({ title: "Sucesso!", message: "Experiência atualizada com sucesso!", type: "success" })
		},
		onError: () => {
			setAlert({ title: "Erro!", message: "Erro ao atualizar a experiência!", type: "error" })
		},
	})

	const handleSave = (newExperience: ExperienceType) => {
		if (selectedExperience?.id) {
			updateExperience.mutate({ ...newExperience, id: selectedExperience.id })
		} else {
			createExperience.mutate(newExperience)
		}
	}

	const handleEditClick = (experience: ExperienceType, e: React.MouseEvent) => {
		e.stopPropagation()
		setSelectedExperience(experience)
		setIsOpen(true)
	}

	const handleDeleteClick = (experience: ExperienceType, e: React.MouseEvent) => {
		e.stopPropagation()
		setSelectedExperience(experience)
		setIsDeleteDialogOpen(true)
	}

	const handleCardClick = (experience: ExperienceType) => {
		setSelectedExperience(experience)
		setIsOpen(true)
	}

	const handleAddClick = () => {
		setSelectedExperience(undefined)
		setIsOpen(true)
	}

	const formatPeriod = (mothInitial: string, yearInitial: number, mothFinal?: string, yearFinal?: number) => {
		const start = `${mothInitial}/${yearInitial}`
		const end = mothFinal === "Present" ? "Atual" : mothFinal && yearFinal ? `${mothFinal}/${yearFinal}` : "Atual"
		return `${start} - ${end}`
	}

	const isMutating = createExperience.isLoading || updateExperience.isLoading

	if (isLoading || isLoadingSkills) return <ConfigExperienceSkeleton />

	return (
		<div className="min-h-full">
			<div className="mb-6 flex items-center justify-between">
				<h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
					<span className="bg-cyan-500/10 p-2 rounded-md">
						<FaBriefcase className="text-cyan-400" size={24} />
					</span>
					Experiência Profissional
				</h2>
				<Button
					onClick={handleAddClick}
					className="
					bg-gradient-to-r from-cyan-500 to-blue-600 
					hover:from-cyan-600 hover:to-blue-700 text-white"
				>
					<IoIosAdd size={20} className="mr-1" />
					Adicionar Experiência
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{experiences &&
					experiences.map((experience: ExperienceType) => (
						<Card
							key={experience.id}
							onClick={() => handleCardClick(experience)}
							className="
							bg-[#070b14] border border-[#1e2a4a] hover:border-cyan-500/50 
							transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 
							cursor-pointer group overflow-hidden"
						>
							<div className="
									absolute top-0 left-0 w-full h-1 
									bg-gradient-to-r from-cyan-500 to-blue-600 
									transform origin-left scale-x-0 
									group-hover:scale-x-100 transition-transform duration-300"></div>

							<CardHeader className="pb-2">
								<CardTitle className="
										text-xl font-semibold text-gray-100 
										group-hover:text-cyan-400 transition-colors"
								>
									<TruncatedName name={experience.company} maxLength={25} tooltipSide="top" />
								</CardTitle>
								<p className="text-cyan-500/70 text-sm font-medium">{experience.role}</p>
							</CardHeader>

							<CardContent>
								<div className="space-y-3 text-gray-400">
									<p className="flex items-center gap-2">
										<span className="text-cyan-500/70">Período:</span>{" "}
										{formatPeriod(
											experience.mothInitial,
											experience.yearInitial,
											experience.mothFinal,
											experience.yearFinal,
										)}
									</p>

									{experience.activities && experience.activities.length > 0 && (
										<div>
											<p className="text-cyan-500/70 mb-1">Atividades:</p>
											<ul className="list-disc list-inside text-sm space-y-1 pl-1">
												{experience.activities.slice(0, 2).map((activity, idx) => (
													<li key={idx} className="text-gray-300">
														<TruncatedName name={activity} maxLength={40} tooltipSide="right" showIcon={false} />
													</li>
												))}
												{experience.activities.length > 2 && (
													<li className="text-gray-400 italic text-xs">
														+ {experience.activities.length - 2} atividades...
													</li>
												)}
											</ul>
										</div>
									)}

									{experience.experienceSkill && experience.experienceSkill.length > 0 && (
										<div className="flex flex-wrap gap-1 pt-1">
											{experience.experienceSkill.slice(0, 3).map((skill, idx) => {
												const matchedSkill = skills?.find((s) => s.id === skill.skillId);
												return (
													<Badge
														key={idx}
														variant="outline"
														className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 text-xs"
													>
														{matchedSkill ? matchedSkill.name : "Desconhecido"}
													</Badge>
												);
											})}
											{experience.experienceSkill.length > 3 && (
												<Badge
													variant="outline"
													className="bg-gray-500/10 text-gray-400 border-gray-500/30 text-xs"
												>
													+{experience.experienceSkill.length - 3}
												</Badge>
											)}
										</div>
									)}
								</div>
							</CardContent>

							<CardFooter className="flex justify-end gap-2">
								<Button
									size="sm"
									variant="ghost"
									className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
									onClick={(e) => handleEditClick(experience, e)}
								>
									<FaEdit size={16} />
								</Button>
								<Button
									size="sm"
									variant="ghost"
									className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
									onClick={(e) => handleDeleteClick(experience, e)}
								>
									<FaTrash size={16} />
								</Button>
							</CardFooter>
						</Card>
					))}

				<Card
					onClick={handleAddClick}
					className="
						bg-[#070b14] border border-dashed border-[#1e2a4a] hover:border-cyan-500/50 
						transition-all duration-300 flex items-center justify-center 
						h-[250px] cursor-pointer group"
				>
					<div className="
							flex flex-col items-center justify-center gap-3 
							text-gray-500 group-hover:text-cyan-400 transition-colors"
					>
						<div className="
								w-16 h-16 rounded-full bg-[#0c1220] flex 
								items-center justify-center group-hover:bg-cyan-500/10 
								transition-colors"
						>
							<IoIosAdd size={40} className="transition-transform group-hover:scale-110 duration-300" />
						</div>
						<p className="font-medium">Adicionar Experiência</p>
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
					scrollbar-thumb-default scrollbar-thumb-rounded-lg
					hover:scrollbar-thumb-default
					"
				>
					<DialogHeader>
						<DialogTitle className="text-xl font-semibold text-cyan-400 flex items-center justify-between gap-2">
							<div className="flex gap-2 items-center">
								<FaBriefcase size={18} />
								{selectedExperience ? "Editar Experiência" : "Adicionar Experiência"}
							</div>
							<IoClose className="cursor-pointer" onClick={() => setIsOpen(false)} />
						</DialogTitle>
					</DialogHeader>

					<FormExperience selectedExperience={selectedExperience} handleSave={handleSave} isSubmitting={isMutating} />
				</DialogContent>
			</Dialog>

			<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<AlertDialogContent
					className="
					fixed top-1/2 left-1/2 
					p-4 rounded-lg
					transform -translate-x-1/2 -translate-y-1/2 
					bg-[#0c1220] border border-[#1e2a4a] 
					text-gray-100 sm:max-w-[600px]
					"
				>
					<AlertDialogHeader>
						<AlertDialogTitle className="text-red-400 font-semibold text-xl">Confirmar exclusão</AlertDialogTitle>
						<AlertDialogDescription className="text-gray-400">
							Tem certeza que deseja excluir a experiência{" "}
							<span className="font-semibold text-gray-300">{selectedExperience?.company}</span>?
							<br />
							Esta ação não pode ser desfeita.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className="
							pt-1 pb-1 pl-2 pr-2 rounded-sm bg-[#070b14] 
							text-gray-300 hover:bg-[#111827] hover:text-gray-100"
						>
							Cancelar
						</AlertDialogCancel>
						<AlertDialogAction
							className="
							pt-1 pb-1 pl-2 pr-2 rounded-sm bg-red-600 
							hover:bg-red-700 text-white pointer-events-none"
							disabled={true}
						>
							Excluir
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}
