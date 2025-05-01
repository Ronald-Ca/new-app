import { type ReactElement, useEffect, useState } from "react"
import { useGetSkillsQuery } from "../../../queries/skill"
import { loadIcon } from "../../../utils/dynamic-icons"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@app/components/ui/card"
import { Badge } from "@app/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { Progress } from "@radix-ui/react-progress"

interface Skill {
	name: string
	iconName: string
	color: string
	stars: number
	type: "skill" | "competence"
}

export default function Skills() {
	const [loadedSkills, setLoadedSkills] = useState<(Skill & { icon: ReactElement })[]>([])
	const { data: skill } = useGetSkillsQuery()
	const [, setActiveTab] = useState<string>("skills")

	useEffect(() => {
		async function loadSkillsAndCompetences() {
			if (skill) {
				const skillsWithIcons = await Promise.all(
					skill.map(async (skill) => {
						const iconName = skill.icon.trim()
						const icon = await loadIcon(iconName, skill.color || "#00BFFF")
						return { ...skill, stars: skill.level, icon, iconName: skill.icon }
					}),
				)
				setLoadedSkills(skillsWithIcons)
			}
		}
		loadSkillsAndCompetences()
	}, [skill])

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	}

	const item = {
		hidden: { y: 20, opacity: 0 },
		show: { y: 0, opacity: 1 },
	}

	const renderSkillCard = (skill: Skill & { icon: ReactElement }, index: number) => {
		return (
			<motion.div
				key={index}
				variants={item}
				whileHover={{
					scale: 1.05,
					boxShadow: "0 10px 30px rgba(0,191,255,0.2)",
				}}
				className="w-full"
			>
				<Card className="h-full bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 overflow-hidden group">
					<CardHeader className="pb-2">
						<div className="flex justify-between items-center">
							<CardTitle className="text-xl font-bold text-white">{skill.name}</CardTitle>
							<Badge variant="outline" className="bg-slate-700/50 text-cyan-400 border-cyan-500/50">
								{skill.stars}/5
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col items-center gap-4">
							<div className="text-5xl text-cyan-400 p-3 rounded-full bg-slate-800/50 border border-slate-700">
								{skill.icon}
							</div>
							<Progress value={skill.stars * 20} className="h-2 w-full bg-slate-700">
								<div
									className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
									style={{ width: `${skill.stars * 20}%` }}
								></div>
							</Progress>
						</div>
					</CardContent>
				</Card>
			</motion.div>
		)
	}

	const renderSkillsOrCompetences = (tipo: "skill" | "competence") => {
		const filteredSkills = loadedSkills.filter((skill) => skill.type === tipo)

		return (
			<motion.div
				variants={container}
				initial="hidden"
				animate="show"
				className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
			>
				{filteredSkills.length > 0 ? (
					filteredSkills.map((skill, index) => renderSkillCard(skill, index))
				) : (
					<p className="text-white text-xl font-medium col-span-full text-center py-12">
						Nenhuma {tipo === "skill" ? "skill" : "competência"} cadastrada foi encontrada em nosso banco de dados.
					</p>
				)}
			</motion.div>
		)
	}

	return (
		<div className="min-h-screen-header-footer py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
			<div className="max-w-7xl mx-auto mt-12">
				<Tabs defaultValue="skills" className="w-full" onValueChange={setActiveTab}>
					<div className="flex justify-center items-center mb-8">
						<TabsList className="grid grid-cols-2 w-full max-w-md bg-slate-800/50 rounded-lg p-1 border border-default">
							<TabsTrigger
								value="skills"
								className="
        w-full py-2 font-semibold text-center
        rounded-l-lg
        data-[state=active]:bg-default data-[state=active]:text-slate-800
        data-[state=inactive]:text-default
      "
							>
								Habilidades Técnicas
							</TabsTrigger>

							<TabsTrigger
								value="competences"
								className="
        w-full py-2 font-semibold text-center
        rounded-r-lg
        data-[state=active]:bg-default data-[state=active]:text-slate-800
        data-[state=inactive]:text-default
      "
							>
								Competências
							</TabsTrigger>
						</TabsList>
					</div>


					<TabsContent value="skills" className="mt-0">
						{renderSkillsOrCompetences("skill")}
					</TabsContent>

					<TabsContent value="competences" className="mt-0">
						{renderSkillsOrCompetences("competence")}
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
