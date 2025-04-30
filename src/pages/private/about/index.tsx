import { FaBirthdayCake, FaCalendarAlt, FaChalkboardTeacher, FaCity, FaHome, FaUserGraduate } from 'react-icons/fa'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import LoadingSpinner from '../../../components/common/loading'
import { ButtonCurriculum } from '../../../components/common/button-curriculum'
import { useGetAboutQuery } from '../../../queries/about'
import { useGetCurriculumQuery } from '../../../queries/curriculum'
import { useGetExperienceQuery } from '../../../queries/experience'
import { useGetSkillsQuery } from '../../../queries/skill'
import { BsFillPersonVcardFill } from 'react-icons/bs'
import { useGetEducationQuery } from '@app/queries/education'
import { BiSolidInstitution } from 'react-icons/bi'
import { TbPointFilled } from 'react-icons/tb'
import { HiBuildingOffice } from 'react-icons/hi2'

export default function About() {
	const { data: about } = useGetAboutQuery()
	const { data: curriculum } = useGetCurriculumQuery()
	const { data: experiences } = useGetExperienceQuery()
	const { data: skills } = useGetSkillsQuery()
	const { data: education } = useGetEducationQuery()

	const filteredSkills = skills?.filter((skill) =>
		experiences?.some((experience) => experience.experienceSkill.some((experienceSkill) => experienceSkill.skillId === skill.id)),
	)

	if (!about) return <LoadingSpinner />

	return (
		<div className='min-h-screen bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 animate-gradient-move flex flex-col p-6 mt-20'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='w-full text-center text-5xl font-semibold text-white'>Quem sou eu?</h1>
				<ButtonCurriculum id={curriculum?.id} />
			</div>

			<div className='flex flex-wrap justify-center items-center gap-24 border-2 rounded-xl border-default p-12'>
				<div className='flex flex-col items-center gap-5 border-4 border-default rounded-xl p-4 relative'>
					<TbPointFilled size={40} className='text-default absolute top-2 left-2' />

					<div className='border-4 border-default p-2 rounded-full shadow-lg'>
						<Avatar className='w-5w h-12'>
							<AvatarImage src={about.image?.toString()} alt='Foto de perfil' className='rounded-full h-4h' />
						</Avatar>
					</div>

					<div className='flex flex-col gap-5'>
						<div className='flex items-center gap-2 text-default'><BsFillPersonVcardFill size={20} /> <span className='text-white font-semibold'>{about.name}</span></div>
						<div className='flex items-center gap-2 text-default'><FaBirthdayCake size={20} /> <span className='text-white font-semibold'>{about.age} anos</span></div>
						<div className='flex items-center gap-2 text-default'><FaHome size={20} /> <span className='text-white font-semibold'>{about.city} - {about.state}</span></div>
					</div>

				</div>

				<div className='flex gap-5 border-4 border-default rounded-xl p-4'>
					<h1
						className="font-bold text-5xl text-white uppercase border-2 border-default rounded-lg pl-4 pr-4 text-center lg:text-left"
						style={{
							writingMode: 'vertical-rl',
							textOrientation: 'upright'
						}}
					>
						Formação
					</h1>

					<div className='flex flex-col gap-5 w-6w'>
						{education?.map((edu) => (
							<div className='border-2 border-default rounded-xl p-4 '>
								<div className='flex items-center gap-2 text-default'>
									<FaUserGraduate />
									<span className='font-bold text-white'>{edu.course}</span>
								</div>

								<div className='flex items-center gap-2 text-default'>
									<BiSolidInstitution />
									<span className='font-bold text-white'>{edu.institution}</span>
								</div>

								<div className='flex items-center gap-2 text-default'>
									<FaCity />
									<span className='font-bold text-white'>{edu.city} - {edu.state}</span>
								</div>

								<div className='flex items-center gap-2 text-default'>
									<FaChalkboardTeacher />
									<span className='font-bold text-white'>{edu.modality === 'on-site' ? 'Presencial' : 'Home Office'}</span>
								</div>

								<div className='flex items-center gap-2 text-default'>
									<FaCalendarAlt />
									<span className='font-bold text-white'>{edu.yearInit} - {edu.yearFinal}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className='flex justify-center items-center gap-3 mb-6 mt-6'>
				<hr className='border-2 border-default w-[50%] rounded-xl' />
				<h1 className='text-center text-5xl font-semibold text-white'>Experiências</h1>
				<hr className='border-2 border-default w-[50%] rounded-xl' />
			</div>

			<div className='grid grid-cols-2 gap-5'>
				{experiences &&
					experiences.map((experience, index) => (
						<div key={index} className='border-4 rounded-xl border-default p-4 flex-1'>
							<h2 className='flex font-semibold text-2xl text-white items-center pb-2 border-b-2 border-default '>
								<HiBuildingOffice className='mr-1 text-default' /> {experience.company}
							</h2>

							<p className='flex flex-col text-white text-xl mt-2 font-semibold'>
								{experience.role}
								<span className='text-slate-400 text-lg font-semibold'>
									{experience.mothInitial}/{experience.yearInitial}
									{' - '}
									{experience.mothFinal}/{experience.yearFinal}
								</span>
							</p>

							<h3 className='text-xl text-default mt-2 font-semibold'>Atividades:</h3>
							<ul className='list-disc list-inside'>
								{experience.activities.map((activity, idx) => (
									<li key={idx} className='text-white text-xl'>
										{activity}
									</li>
								))}
							</ul>
							<h3 className='text-xl text-default mt-2 mb-3 font-semibold'>Stacks:</h3>

							<ul className='flex flex-wrap gap-2'>
								{filteredSkills?.map((skill, idx) => (
									<li
										key={idx}
										className='border-2border-default bg-slate-950 rounded-lg px-4 py-1 text-gray-300 font-bold'
									>
										{skill.name}
									</li>
								))}
							</ul>
						</div>
					))}
			</div>
		</div>
	)
}
