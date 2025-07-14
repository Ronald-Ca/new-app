import { FaBirthdayCake, FaCalendarAlt, FaChalkboardTeacher, FaCity, FaHome } from 'react-icons/fa'
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
import { HiAcademicCap, HiBuildingOffice, HiUser } from 'react-icons/hi2'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { HiCode } from 'react-icons/hi'
import { Card, CardContent, CardHeader } from '@app/components/ui/card'
import { Separator } from '@radix-ui/react-select'
import { Badge } from '@app/components/ui/badge'

export default function About() {
	const { data: about } = useGetAboutQuery()
	const { data: curriculum } = useGetCurriculumQuery()
	const { data: experiences } = useGetExperienceQuery()
	const { data: skills } = useGetSkillsQuery()
	const { data: education } = useGetEducationQuery()

	const filteredSkills = skills?.filter((skill) =>
		experiences?.some((experience) =>
			experience.experienceSkill.some((experienceSkill) => experienceSkill.skillId === skill.id),
		),
	)

	if (!about) return <LoadingSpinner />

	return (
		<div className="min-h-screen-header-footer bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 animate-gradient-move py-10 px-4 md:px-8 lg:px-16">
			<div className="max-w-7xl mx-auto">
				<Tabs defaultValue="profile" className="w-full mt-20">
					<TabsList className="grid grid-cols-3 max-w-md mx-auto mb-8 bg-slate-800/50 rounded-lg">
						<TabsTrigger value="profile" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-slate-950  flex items-center justify-center font-semibold pt-2 pb-2 rounded-l-lg text-default border border-default">
							<HiUser className="mr-2" /> Perfil
						</TabsTrigger>
						<TabsTrigger value="education" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-slate-950 flex items-center justify-center font-semibold pt-2 pb-2 text-default border-t border-t-default border-b border-b-default ">
							<HiAcademicCap className="mr-2" /> Formação
						</TabsTrigger>
						<TabsTrigger value="experience" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-slate-950 flex items-center justify-center font-semibold pt-2 pb-2 rounded-r-lg text-default border border-default">
							<HiCode className="mr-2" /> Experiências
						</TabsTrigger>
					</TabsList>

					<TabsContent value="profile" className="mt-0">
						<Card className="bg-slate-900/50 border-cyan-500/50 text-white">
							<CardHeader className="text-center relative">
								<div className="flex justify-center mb-6">
									<div className="border-4 border-cyan-500 p-2 rounded-full shadow-lg shadow-cyan-500/20">
										<Avatar className="w-40 h-40">
											<AvatarImage
												src={about.image?.toString() || "/placeholder.svg"}
												alt="Foto de perfil"
												className="rounded-full w-96 h-96 object-cover"
											/>
										</Avatar>
									</div>
									<div className='absolute top-0 right-0 mt-4 mr-4'>
										<ButtonCurriculum id={curriculum?.id} />
									</div>
								</div>
								<h2 className="text-3xl font-bold text-cyan-400">{about.name}</h2>
							</CardHeader>
							<CardContent>
								<div className="flex flex-col gap-4 justify-between bg-slate-800/50 p-6 rounded-lg">
									<div className='w-full'>
										<h3 className="text-xl font-semibold text-cyan-400 mb-4">Sobre mim</h3>
										<p className="text-gray-300 leading-relaxed">
											Sou um desenvolvedor apaixonado por criar soluções inovadoras e eficientes. Com experiência em
											desenvolvimento web full stack, estou sempre em busca de novos desafios e aprendizados na área de
											tecnologia.
										</p>
									</div>

									<div className="flex gap-4 items-center md:items-start">
										<div className="flex items-center gap-3 text-lg">
											<BsFillPersonVcardFill className="text-cyan-400" size={24} />
											<span>Desenvolvedor Full Stack</span>
										</div>

										<Separator className="h-8 w-[1px] bg-slate-700" />

										<div className="flex items-center gap-3 text-lg">
											<FaBirthdayCake className="text-cyan-400" size={24} />
											<span>{about.age} anos</span>
										</div>

										<Separator className="h-8 w-[1px] bg-slate-700" />

										<div className="flex items-center gap-3 text-lg">
											<FaHome className="text-cyan-400" size={24} />
											<span>
												{about.city} - {about.state}
											</span>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="education" className="mt-0">
						<Card className="bg-slate-900/50 border-cyan-500/50 text-white">
							<CardHeader>
								<h2 className="text-3xl font-bold text-center text-cyan-400">Formação Acadêmica</h2>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 gap-6">
									{education?.map((edu, key) => (
										<div key={key} className="bg-slate-800/50 rounded-xl p-6 border-l-4 border-cyan-500">
											<h3 className="text-xl font-bold text-white mb-4">{edu.course}</h3>

											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div className="flex items-center gap-2 text-gray-300">
													<BiSolidInstitution className="text-cyan-400" />
													<span>{edu.institution}</span>
												</div>

												<div className="flex items-center gap-2 text-gray-300">
													<FaCity className="text-cyan-400" />
													<span>
														{edu.city} - {edu.state}
													</span>
												</div>

												<div className="flex items-center gap-2 text-gray-300">
													<FaChalkboardTeacher className="text-cyan-400" />
													<span>{edu.modality === "on-site" ? "Presencial" : "Home Office"}</span>
												</div>

												<div className="flex items-center gap-2 text-gray-300">
													<FaCalendarAlt className="text-cyan-400" />
													<span>
														{edu.yearInit} - {edu.yearFinal}
													</span>
												</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="experience" className="mt-0">
						<Card className="bg-slate-900/50 border-cyan-500/50 text-white">
							<CardHeader>
								<h2 className="text-3xl font-bold text-center text-cyan-400">Experiências Profissionais</h2>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 gap-8">
									{experiences?.map((experience, index) => (
										<div key={index} className="bg-slate-800/50 rounded-xl p-6">
											<div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
												<h3 className="text-2xl font-bold text-white flex items-center">
													<HiBuildingOffice className="mr-2 text-cyan-400" />
													{experience.company}
												</h3>
												<div className="text-cyan-400 font-medium mt-2 md:mt-0">
													{experience.mothInitial}/{experience.yearInitial} - {experience.mothFinal}/
													{experience.yearFinal}
												</div>
											</div>

											<div className="mb-4 text-xl font-semibold text-gray-300">{experience.role}</div>

											<Separator className="my-4 bg-slate-700" />

											<div className="mb-6">
												<h4 className="text-lg font-semibold text-cyan-400 mb-3">Atividades:</h4>
												<ul className="space-y-2">
													{experience.activities.map((activity, idx) => (
														<li key={idx} className="text-gray-300 flex items-start">
															<span className="text-cyan-400 mr-2">•</span>
															{activity}
														</li>
													))}
												</ul>
											</div>

											<div>
												<h4 className="text-lg font-semibold text-cyan-400 mb-3">Stacks:</h4>
												<div className="flex flex-wrap gap-2">
													{filteredSkills?.map((skill, idx) => (
														<Badge key={idx} className="bg-slate-950 hover:bg-slate-900 text-white border-cyan-500/50">
															{skill.name}
														</Badge>
													))}
												</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
