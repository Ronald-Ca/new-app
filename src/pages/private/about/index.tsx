import { MdDriveFileRenameOutline } from 'react-icons/md'
import { FaGraduationCap, FaHouseDamage } from 'react-icons/fa'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import LoadingSpinner from '../../../components/common/loading'
import { ButtonCurriculum } from '../../../components/common/button-curriculum'
import { useGetAboutQuery } from '../../../queries/about'
import { useGetCurriculumQuery } from '../../../queries/curriculum'
import { useGetExperienceQuery } from '../../../queries/experience'
import { useGetSkillsQuery } from '../../../queries/skill'

export default function About() {
	const { data: about } = useGetAboutQuery()
	const { data: curriculum } = useGetCurriculumQuery()
	const { data: experiences } = useGetExperienceQuery()
	const { data: skills } = useGetSkillsQuery()

	const aboutInfo = [
		{
			title: 'Eu',
			description: about?.person,
			icon: MdDriveFileRenameOutline,
		},
		{
			title: 'Formação',
			description: about?.education,
			icon: FaGraduationCap,
		},
		{
			title: 'Endereço',
			description: about?.address,
			icon: FaHouseDamage,
		},
	]

	const filteredSkills = skills?.filter((skill) =>
		experiences?.some((experience) => experience.experienceSkill.some((experienceSkill) => experienceSkill.skillId === skill.id)),
	)

	if (!about) return <LoadingSpinner />

	return (
		<div className='min-h-screen bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 animate-gradient-move flex flex-col p-6 mt-20'>
			<div>
				<div className='flex justify-between items-center mb-6'>
					<h1 className='w-full text-center text-[50px] font-semibold text-gray-300'>Quem sou eu?</h1>
					<ButtonCurriculum id={curriculum?.id} />
				</div>
				<div className='flex flex-wrap justify-center items-center gap-[100px] border-[1px] rounded-[10px] border-[#00BFFF] p-[50px]'>
					<div className='border-4 border-[#00BFFF] p-2 rounded-full shadow-lg'>
						<Avatar className='w-[500px] h-[50px]'>
							<AvatarImage src={about.image?.toString()} alt='Foto de perfil' className='rounded-full h-[400px]' />
						</Avatar>
					</div>
					<div className='flex flex-col gap-5 w-full lg:w-1/2'>
						{aboutInfo.map((info, index) => (
							<div key={index} className='border-b-[1px] border-[#00BFFF] p-4'>
								<h2 className='text-2xl text-gray-300 flex items-center pb-2'>
									<info.icon className='mr-[5px] text-[#00BFFF]' /> {info.title}
								</h2>
								<p className='text-gray-300 text-xl'>{info.description}</p>
							</div>
						))}
					</div>
				</div>
			</div>
			<div>
				<div className='flex justify-center items-center gap-[10px] mb-6 mt-6'>
					<hr className='border-[2px] border-[#00BFFF] w-[50%] rounded-[10px]' />
					<h1 className='text-center text-[50px] font-semibold text-gray-300'>Experiências</h1>
					<hr className='border-[2px] border-[#00BFFF] w-[50%] rounded-[10px]' />
				</div>
				<div className='flex flex-wrap justify-between gap-5'>
					{experiences &&
						experiences.map((experience, index) => (
							<div key={index} className='border-[1px] rounded-[10px] border-[#00BFFF] p-4 flex-1 min-w-[300px]'>
								<h2 className='text-2xl text-gray-300 flex items-center pb-2 border-b-[1px] border-[#00BFFF]'>
									<MdDriveFileRenameOutline className='mr-[5px] text-[#00BFFF]' /> {experience.company}
								</h2>
								<p className='flex flex-col text-gray-300 text-xl mt-2'>
									{experience.role}
									<span className='text-slate-400 text-lg font-semibold'>
										{experience.mothInitial}/{experience.yearInitial}
										{' - '}
										{experience.mothFinal}/{experience.yearFinal}
									</span>
								</p>
								<h3 className='text-xl text-[#00BFFF] mt-2'>Atividades:</h3>
								<ul className='list-disc list-inside'>
									{experience.activities.map((activity, idx) => (
										<li key={idx} className='text-gray-300 text-xl'>
											{activity}
										</li>
									))}
								</ul>
								<h3 className='text-xl text-[#00BFFF] mt-2 mb-[10px]'>Stacks:</h3>

								<ul className='flex flex-wrap gap-2'>
									{filteredSkills?.map((skill, idx) => (
										<li
											key={idx}
											className='border-[2px] border-[#00BFFF] bg-slate-950 rounded-[8px] px-[15px] py-[3px] text-gray-300 font-bold'
										>
											{skill.name}
										</li>
									))}
								</ul>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}
