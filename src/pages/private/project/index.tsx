import { Card, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog'
import { useGetProjectsQuery } from '../../../queries/project'
import { useGetSkillsQuery } from '../../../queries/skill'
import { ProjectType } from '../../../services/project-service'
import { SkillType } from '../../../services/skill-service'
import { useState } from 'react'
import { IoIosClose } from 'react-icons/io'

export default function Projects() {
	const { data: projects } = useGetProjectsQuery()
	const { data: skills } = useGetSkillsQuery()

	return (
		<div className='flex flex-col min-h-full p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 animate-gradient-move mt-20'>
			<div className='flex mb-6'>
				<h1 className='w-full text-center text-5xl font-semibold text-white'>Projetos</h1>
			</div>
			<div className='flex flex-wrap justify-center gap-4 border-2 rounded-xl border-default p-12'>
				{projects && skills && projects.map((project, index) => <ProjectCard key={index} project={project} skills={skills} />)}
			</div>
		</div>
	)
}

interface ProjectCardProps {
	project: ProjectType
	skills?: SkillType[]
}

const ProjectCard = ({ project, skills }: ProjectCardProps) => {
	const [isOpen, setIsOpen] = useState(false)

	const filteredSkills = skills?.filter((skill) => project.projectSkills && project.projectSkills.some((projectSkill) => projectSkill.skillId === skill.id))

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Card className='bg-slate-950 w-4w border-2 rounded-xl border-default p-5 text-center cursor-pointer transform transition-transform duration-300 hover:scale-105'>
					<CardHeader>
						<img
							src={project.image as string}
							alt={`${project.name} preview`}
							className='mb-4 rounded-xl border-2 border-default'
						/>
						<CardTitle className='text-gray-300 text-2xl font-semibold'>{project.name}</CardTitle>
						<CardDescription className='text-gray-400'>{project.description}</CardDescription>
					</CardHeader>
				</Card>
			</DialogTrigger>
			<DialogContent className='fixed w-8w border-2 mx-auto z-50 flex justify-center items-center bg-black/80 bg-slate-900 rounded-lg p-6 border-default' onClick={() => setIsOpen(false)}>
				<div
					className=' relative'
					onClick={(e) => e.stopPropagation()}
				>
					<DialogClose asChild>
						<IoIosClose size={35} className='text-default absolute -top-5 -right-4 cursor-pointer z-50' onClick={() => setIsOpen(false)} />
					</DialogClose>
					<DialogHeader>
						<DialogTitle className='text-gray-100 text-center font-semibold text-3xl'>{project.name}</DialogTitle>
						<video
							className='w-[100%] h-3h rounded-xl border-2 border-default'
							src={project.video as string}
							autoPlay
							controls
						></video>
						<DialogTitle className='text-gray-100 font-semibold text-xl'>Descrição:</DialogTitle>
						<DialogDescription className='text-gray-100 text-base rounded-xl border-2 border-default p-2'>
							{project.description}
						</DialogDescription>
						<DialogTitle className='text-gray-100 font-semibold text-xl'>Link:</DialogTitle>
						<DialogDescription className='text-gray-100 text-base rounded-xl border-2 border-default p-2'>
							<a
								href={project.link}
								target='_blank'
								rel='noreferrer'
								className='transition-colors hover:text-default underline decoration-solid'
							>
								{project.link}
							</a>
						</DialogDescription>
						<DialogTitle className='text-gray-100 font-semibold text-xl'>Stacks:</DialogTitle>
						<DialogDescription className='text-gray-100 text-base rounded-xl border-2 border-default p-2'>
							{filteredSkills?.map((stack) => (
								<span
									key = { stack.id }
									className = {`mr-2 text-slate-900 bg-default rounded-sm pb-1 pl-1 pr-1 font-semibold`}
								>
							{stack.name}
						</span>
							))}
					</DialogDescription>
				</DialogHeader>
			</div>
		</DialogContent>
		</Dialog >
	)
}
