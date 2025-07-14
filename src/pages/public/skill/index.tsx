import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { useLoadedSkills } from '@app/hooks/use-loaded-skills'
import SkillsList from './components/skill-list'
import { container, item } from '../../../motion/variants'
import LoadingSpinner from '@app/components/common/loading'
import ErrorComponent from '@app/components/common/error'

export default function Skills() {
	const { loadedSkills, isLoading, isError } = useLoadedSkills()
	const [activeTab, setActiveTab] = useState<'skills' | 'competences'>('skills')

	if (isLoading) return <LoadingSpinner />
	if (isError || !loadedSkills) return <ErrorComponent />

	return (
		<div
			className="
				min-h-screen-header-footer
				py-16 px-4 sm:px-6 lg:px-8
				bg-gradient-to-r 
			  from-slate-900 via-indigo-950 to-blue-950
				animate-gradient-move
			"
		>
			<div className="max-w-7xl mx-auto mt-12">
				<Tabs
					value={activeTab}
					onValueChange={val => setActiveTab(val as 'skills' | 'competences')}
					className="w-full"
					defaultValue="skills"
				>
					<div className="flex justify-center items-center mb-8">
						<TabsList
							className="
								grid grid-cols-2 w-full max-w-md
								bg-slate-800/50 rounded-lg p-1 border border-default
							"
						>
							<TabsTrigger
								value="skills"
								className="
									w-full py-2 font-semibold text-center rounded-l-lg
									data-[state=active]:bg-default data-[state=active]:text-slate-800
									data-[state=inactive]:text-default
								"
							>
								Habilidades Técnicas
							</TabsTrigger>
							<TabsTrigger
								value="competences"
								className="
									w-full py-2 font-semibold text-center rounded-r-lg
									data-[state=active]:bg-default data-[state=active]:text-slate-800
									data-[state=inactive]:text-default
								"
							>
								Competências
							</TabsTrigger>
						</TabsList>
					</div>

					<TabsContent value="skills" className="mt-0">
						<SkillsList
							skills={loadedSkills}
							filter="skill"
							variants={{ container, item }}
						/>
					</TabsContent>

					<TabsContent value="competences" className="mt-0">
						<SkillsList
							skills={loadedSkills}
							filter="competence"
							variants={{ container, item }}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
