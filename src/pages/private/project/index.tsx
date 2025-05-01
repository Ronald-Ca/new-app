import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useGetProjectsQuery } from "../../../queries/project"
import { useGetSkillsQuery } from "../../../queries/skill"
import type { ProjectType } from "../../../services/project-service"
import type { SkillType } from "../../../services/skill-service"
import { Badge } from "@app/components/ui/badge"
import ProjectModal from "./modal"



export default function Projects() {
	const { data: projects } = useGetProjectsQuery()
	const { data: skills } = useGetSkillsQuery()

	return (
		<div className="min-h-screen-header-footer py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800 flex justify-center items-center">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					<AnimatePresence>
						{projects &&
							skills &&
							projects.map((project, index) => (
								<ProjectCard key={project.id || index} project={project} skills={skills} index={index} />
							))}
					</AnimatePresence>
				</motion.div>

				{projects && projects.length === 0 && (
					<div className="text-center py-20">
						<p className="text-slate-400 text-lg">Nenhum projeto encontrado.</p>
					</div>
				)}
			</div>
		</div>
	)
}

interface ProjectCardProps {
	project: ProjectType
	skills?: SkillType[]
	index: number
}

const ProjectCard = ({ project, skills, index }: ProjectCardProps) => {
	const [isOpen, setIsOpen] = useState(false)

	const filteredSkills = skills?.filter(
		(skill) => project.projectSkills && project.projectSkills.some((projectSkill) => projectSkill.skillId === skill.id),
	)

	const delay = index * 0.1

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.4, delay }}
				whileHover={{ y: -8, transition: { duration: 0.2 } }}
				className="group"
			>
				<div
					onClick={() => setIsOpen(true)}
					className="h-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-default shadow-lg cursor-pointer group-hover:shadow-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300"
				>
					<div className="relative overflow-hidden">
						<div className="aspect-video overflow-hidden">
							<img
								src={(project.image as string) || "/placeholder.svg"}
								alt={`${project.name} preview`}
								className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
							/>
						</div>
						<div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
					</div>

					<div className="p-6">
						<h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
							{project.name}
						</h3>

						<p className="text-slate-400 line-clamp-2 mb-4 h-12">{project.description}</p>

						<div className="flex flex-wrap gap-2 mt-auto">
							{filteredSkills?.slice(0, 3).map((stack) => (
								<Badge key={stack.id} variant="outline" className="bg-slate-800 text-cyan-400 border-cyan-500/20">
									{stack.name}
								</Badge>
							))}
							{filteredSkills && filteredSkills.length > 3 && (
								<Badge variant="outline" className="bg-slate-800 border-slate-700">
									+{filteredSkills.length - 3}
								</Badge>
							)}
						</div>
					</div>
				</div>
			</motion.div>

			<ProjectModal project={project} skills={filteredSkills || []} isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</>
	)
}

