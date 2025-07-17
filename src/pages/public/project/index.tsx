import { motion } from "framer-motion"
import { useGetProjectsQuery } from "../../../queries/project"
import ProjectCard from "./components/project-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@app/components/ui/carousel"

export default function Projects() {
	const { data: projects } = useGetProjectsQuery()

	return (
		<div className="
			min-h-screen-header-footer py-16 px-4 sm:px-6 lg:px-8 
			flex justify-center items-center bg-gradient-to-r 
			from-slate-900 via-indigo-950 to-blue-950 
			animate-gradient-move
		">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<Carousel className="w-full max-w-md mx-auto">
						<CarouselContent>
							{projects &&
								projects.map((project, index) => (
									<CarouselItem key={project.id || index}>
										<ProjectCard project={project} index={index} />
									</CarouselItem>
								))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
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

