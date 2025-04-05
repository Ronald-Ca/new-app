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
		<div className='flex flex-col min-h-full p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 animate-gradient-move'>
			<div className='flex mb-6'>
				<h1 className='w-full text-center text-[50px] font-semibold text-gray-300'>Projetos</h1>
			</div>
			<div className='flex flex-wrap justify-center gap-4 border-[1px] rounded-[10px] border-[#00BFFF] p-[50px]'>
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

	const filteredSkills = skills?.filter((skill) => project.projectSkills.some((projectSkill) => projectSkill.skillId === skill.id))

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Card className='bg-slate-950 w-[400px] border-[2px] rounded-[10px] border-[#00BFFF] p-[20px] text-center cursor-pointer transform transition-transform duration-300 hover:scale-105'>
					<CardHeader>
						<img
							src={project.image as string}
							alt={`${project.name} preview`}
							className='mb-4 rounded-[10px] border-[2px] border-[#00BFFF]'
						/>
						<CardTitle className='text-gray-300 text-2xl font-semibold'>{project.name}</CardTitle>
						<CardDescription className='text-gray-400'>{project.description}</CardDescription>
					</CardHeader>
				</Card>
			</DialogTrigger>
			<DialogContent className='fixed mx-auto  z-50 flex justify-center items-center bg-black/80 bg-slate-900 rounded-lg p-6 max-w-[800px] border-[2px] border-[#00BFFF]' onClick={() => setIsOpen(false)}>
				<div
					className=' relative'
					onClick={(e) => e.stopPropagation()}
				>
					<DialogClose asChild>
						<IoIosClose size={35} className='text-[#00BFFF] absolute -top-5 -right-4 cursor-pointer z-50' onClick={() => setIsOpen(false)} />
					</DialogClose>
					<DialogHeader>
						<DialogTitle className='text-gray-100 text-center font-semibold text-[30px]'>{project.name}</DialogTitle>
						<video
							className='w-[100%] h-[350px] rounded-[10px] border-[2px] border-[#00BFFF]'
							src={project.video as string}
							autoPlay
							controls
						></video>
						<DialogTitle className='text-gray-100 font-semibold text-[20px]'>Descrição:</DialogTitle>
						<DialogDescription className='text-gray-100 text-[15px] rounded-[10px] border-[2px] border-[#00BFFF] p-[8px]'>
							{project.description}
						</DialogDescription>
						<DialogTitle className='text-gray-100 font-semibold text-[20px]'>Link:</DialogTitle>
						<DialogDescription className='text-gray-100 text-[15px] rounded-[10px] border-[2px] border-[#00BFFF] p-[8px]'>
							<a
								href={project.link}
								target='_blank'
								rel='noreferrer'
								className='transition-colors hover:text-[#00BFFF] underline decoration-solid'
							>
								{project.link}
							</a>
						</DialogDescription>
						<DialogTitle className='text-gray-100 font-semibold text-[20px]'>Stacks:</DialogTitle>
						<DialogDescription className='text-gray-100 text-[15px] rounded-[10px] border-[2px] border-[#00BFFF] p-[8px]'>
							{filteredSkills?.map((stack) => (
								<span
									key = { stack.id }
									className = {`mr-2 text-slate-900 bg-[${stack.color.toString()}] rounded-[4px] pb-[2px] pl-[5px] pr-[5px] font-semibold`}
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
