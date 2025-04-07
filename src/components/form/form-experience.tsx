import { useForm, FormProvider } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { moths, years } from '../../utils/moths-and-years'
import { ExperienceType } from '../../services/experience-service'
import { useState } from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { useGetSkillsQuery } from '@app/queries/skill'

interface ExperienceFormProps {
	selectedExperience?: ExperienceType
	handleSave: (experience: ExperienceType) => void
	loading?: boolean
}

export function FormExperience({ selectedExperience, handleSave, loading }: ExperienceFormProps) {
	const form = useForm({
		defaultValues: {
			company: '',
			role: '',
			yearInitial: '',
			mothInitial: '',
			yearFinal: '',
			mothFinal: '',
			activities: '',
			experienceSkill: [] as string[],
		},
	})

	const { handleSubmit } = form

	const { data: skills } = useGetSkillsQuery()

	const onSubmit = (data: any) => {
		const newExperience: ExperienceType = {
			...data,
			activities: data.activities.split(','),
		}
		handleSave(newExperience)
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-white">
				{/* Organização */}
				<FormField
					control={form.control}
					name="company"
					defaultValue={selectedExperience?.company || ''}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-50">Organização:</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Organização" className="p-2 rounded bg-slate-800 text-gray-100" />
							</FormControl>
						</FormItem>
					)}
				/>
				{/* Função */}
				<FormField
					control={form.control}
					name="role"
					defaultValue={selectedExperience?.role || ''}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-50">Função:</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Função" className="p-2 rounded bg-slate-800 text-gray-100" />
							</FormControl>
						</FormItem>
					)}
				/>
				{/* Ano Inicial e Mês Inicial */}
				<div className="flex gap-4">
					<FormField
						control={form.control}
						name="yearInitial"
						defaultValue={selectedExperience?.yearInitial || ''}
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Ano Inicial:</FormLabel>
								<FormControl>
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger>
											<SelectValue placeholder="Selecione o Ano" />
										</SelectTrigger>
										<SelectContent>
											{years.map((year) => (
												<SelectItem key={year.year} value={year.year.toString()}>
													{year.year}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="mothInitial"
						defaultValue={selectedExperience?.mothInitial || ''}
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Mês Inicial:</FormLabel>
								<FormControl>
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger>
											<SelectValue placeholder="Selecione o Mês" />
										</SelectTrigger>
										<SelectContent>
											{moths.map((month) => (
												<SelectItem key={month.id} value={month.abbreviation}>
													{month.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				{/* Ano Final e Mês Final */}
				<div className="flex gap-4">
					<FormField
						control={form.control}
						name="yearFinal"
						defaultValue={selectedExperience?.yearFinal || ''}
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Ano Final:</FormLabel>
								<FormControl>
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger>
											<SelectValue placeholder="Selecione o Ano" />
										</SelectTrigger>
										<SelectContent>
											{years.map((year) => (
												<SelectItem key={year.year} value={year.year.toString()}>
													{year.year}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="mothFinal"
						defaultValue={selectedExperience?.mothFinal || ''}
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Mês Final:</FormLabel>
								<FormControl>
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger>
											<SelectValue placeholder="Selecione o Mês" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem key="Present" value="Present">
												Atual
											</SelectItem>
											{moths.map((month) => (
												<SelectItem key={month.id} value={month.abbreviation}>
													{month.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				{/* Atividades */}
				<FormField
					control={form.control}
					name="activities"
					defaultValue={selectedExperience?.activities.join(', ') || ''}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-50">Atividades:</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder="Atividades (separadas por ponto e vírgula ';')"
									className="p-2 rounded bg-slate-800 text-gray-100"
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='experienceSkill'
					render={({ field }) => {
						const [isOpen, setIsOpen] = useState(false)

						const handleToggle = () => setIsOpen((prev) => !prev)
						const handleClose = () => setIsOpen(false)

						return (
							<FormItem className='flex flex-col'>
								<FormLabel>Skills:</FormLabel>
								<FormControl>
									<DropdownMenu open={isOpen}>
										<DropdownMenuTrigger asChild>
											<Button
												variant='outline'
												className='w-[48%] text-gray-400 bg-transparent'
												onClick={(e) => {
													e.preventDefault()
													handleToggle()
												}}
											>
												{field.value?.length > 0 ? `Selected (${field.value.length})` : 'Select Skills'}
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent
											className='w-56 h-[300px] overflow-y-auto'
											onClick={(e) => e.stopPropagation()}
											onPointerDownOutside={(e) => {
												e.preventDefault()
												handleClose()
											}}
										>
											<DropdownMenuLabel>Available Skills</DropdownMenuLabel>
											<DropdownMenuSeparator />
											{skills?.map((skill) => {
												if (!skill.id) return null
												const isChecked = field.value?.includes(skill.id) ?? false

												return (
													<DropdownMenuCheckboxItem
														key={skill.id}
														checked={isChecked}
														onCheckedChange={(checked) => {
															const newValue = checked
																? [...(field.value ?? []), skill.id]
																: (field.value ?? []).filter((id: string) => id !== skill.id)

															const sanitizedValue = newValue.filter((id: string | undefined): id is string => id !== undefined)

															field.onChange(sanitizedValue)
															form.setValue('experienceSkill', sanitizedValue)
														}}
													>
														{skill.name}
													</DropdownMenuCheckboxItem>
												)
											})}
										</DropdownMenuContent>
									</DropdownMenu>
								</FormControl>
							</FormItem>
						)
					}}
				/>
				{/* Botão de Salvar */}
				<Button
					disabled={loading}
					type="submit"
					className="bg-[#00BFFF] text-slate-950 hover:text-[#00BFFF] hover:bg-[#1c222b] hover:border-[#00BFFF]"
				>
					{loading ? 'Salvando...' : 'Salvar'}
				</Button>
			</form>
		</FormProvider>
	)
}
