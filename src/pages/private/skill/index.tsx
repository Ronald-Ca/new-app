import { FaStar } from 'react-icons/fa'
import { ReactElement, useEffect, useState } from 'react'
import { useGetSkillsQuery } from '../../../queries/skill'
import { loadIcon } from '../../../utils/dynamic-icons'

interface Skill {
	name: string
	iconName: string
	color: string
	stars: number
	type: 'skill' | 'competence'
}

export default function Skills() {
	const [loadedSkills, setLoadedSkills] = useState<(Skill & { icon: ReactElement })[]>([])
	const { data: skill } = useGetSkillsQuery()

	useEffect(() => {
		async function loadSkillsAndCompetences() {
			if (skill) {
				const skillsWithIcons = await Promise.all(
					skill.map(async (skill) => {
						const iconName = skill.icon.trim()
						const icon = await loadIcon(iconName, skill.color || '#00BFFF')
						return { ...skill, stars: skill.level, icon, iconName: skill.icon }
					}),
				)
				setLoadedSkills(skillsWithIcons)
			}
		}
		loadSkillsAndCompetences()
	}, [skill])

	const renderSkillsOrCompetences = (tipo: 'skill' | 'competence') => {
		const filteredSkills = loadedSkills.filter((skill) => skill.type === tipo)

		return (
			<div className='flex flex-wrap justify-center gap-4 border-[1px] rounded-[10px] border-[#00BFFF] p-[50px]'>
				{filteredSkills.length > 0 ? (
					filteredSkills.map((skill, index) => (
						<div
							key={index}
							className='w-[200px] border-[1px] rounded-[10px] border-[#00BFFF] p-[20px] text-center flex flex-col items-center transform hover:scale-105 transition-transform duration-300'
						>
							<h2 className='text-gray-300 text-2xl font-semibold mb-4'>{skill.name}</h2>
							{skill.icon}
							<div className='flex justify-center mt-[10px]'>
								{Array(skill.stars)
									.fill(0)
									.map((_, i) => (
										<FaStar key={i} className='text-[#00BFFF] mr-1' />
									))}
							</div>
						</div>
					))
				) : (
					<p className='text-gray-300 text-xl font-medium'>
						Nenhuma {tipo === 'skill' ? 'skill' : 'competência'} cadastrada foi encontrada em nosso banco de dados.
					</p>
				)}
			</div>
		)
	}

	return (
		<div className='h-full flex-grow flex flex-col p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 animate-gradient-move'>
			<div className='flex mb-6'>
				<h1 className='w-full text-center text-[50px] font-semibold text-gray-300'>Habilidades</h1>
			</div>
			{renderSkillsOrCompetences('skill')}
			<div className='flex justify-center items-center gap-[10px] mb-6 mt-6'>
				<hr className='border-[2px] border-[#00BFFF] w-[50%] rounded-[10px]' />
				<h1 className='text-center text-[50px] font-semibold text-gray-300'>Competências</h1>
				<hr className='border-[2px] border-[#00BFFF] w-[50%] rounded-[10px]' />
			</div>
			{renderSkillsOrCompetences('competence')}
		</div>
	)
}
