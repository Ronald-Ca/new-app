import { useGetSkillsQuery } from '../../queries/skill'
import { ExperienceType } from '../../services/experience-service'
import { DropdownMenuCheckboxItem } from '@radix-ui/react-dropdown-menu'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { moths, years } from '../../utils/moths-and-years'
import { Textarea } from '../ui/textarea'

interface ExperienceFormProps {
	selectedExperience?: ExperienceType
	handleSave: (experience: ExperienceType) => void
	loading?: boolean
}

export function FormExperience({ selectedExperience, handleSave, loading }: ExperienceFormProps) {
	const form = useForm()

	const { data: skills } = useGetSkillsQuery()

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onSubmit = (data: any) => {
		const newExperience: ExperienceType = {
			...data,
			activities: data.activities.split(','),
		}
		handleSave(newExperience)
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
				<FormField
					control={form.control}
					name='company'
					defaultValue={selectedExperience?.company || ''}
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-50'>Organização:</FormLabel>
							<FormControl>
								<Input {...field} placeholder='Organização' className='p-2 rounded bg-slate-800 text-gray-100' />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='role'
					defaultValue={selectedExperience?.role || ''}
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-50'>Função:</FormLabel>
							<FormControl>
								<Input {...field} placeholder='Função' className='p-2 rounded bg-slate-800 text-gray-100' />
							</FormControl>
						</FormItem>
					)}
				/>

				<div className='flex space-x-4'>
					<FormField
						control={form.control}
						name='yearInitial'
						defaultValue={selectedExperience?.yearInitial || ''}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-50'>Ano Inicial:</FormLabel>
								<FormControl>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant='outline' className='w-full'>
												{field.value ? `Selecionado: ${field.value}` : 'Selecione o Ano'}
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className='w-56'>
											<DropdownMenuLabel>Anos Disponíveis</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuRadioGroup
												value={field.value?.toString() || ''}
												onValueChange={(value) => {
													const selectedYear = parseInt(value, 10)
													field.onChange(selectedYear)
													form.setValue('yearInitial', selectedYear)
												}}
											>
												{years.map((year) => (
													<DropdownMenuRadioItem key={year.year} value={year.year.toString()}>
														{year.year}
													</DropdownMenuRadioItem>
												))}
											</DropdownMenuRadioGroup>
										</DropdownMenuContent>
									</DropdownMenu>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='mothInitial'
						defaultValue={selectedExperience?.mothInitial || ''}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-50'>Mês Inicial:</FormLabel>
								<FormControl>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant='outline' className='w-full'>
												{field.value
													? `Selecionado: ${moths.find((m) => m.abbreviation === field.value)?.name}`
													: 'Selecione o Mês'}
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className='w-56'>
											<DropdownMenuLabel>Meses Disponíveis</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuRadioGroup
												value={field.value?.toString() || ''}
												onValueChange={(value) => {
													const selectedMonth = moths.find((month) => month.id.toString() === value)?.abbreviation
													if (selectedMonth) {
														field.onChange(selectedMonth)
														form.setValue('mothInitial', selectedMonth)
													}
												}}
											>
												{moths.map((month) => (
													<DropdownMenuRadioItem key={month.id} value={month.id.toString()}>
														{month.name}
													</DropdownMenuRadioItem>
												))}
											</DropdownMenuRadioGroup>
										</DropdownMenuContent>
									</DropdownMenu>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>

				<div className='flex space-x-4'>
					<FormField
						control={form.control}
						name='yearFinal'
						defaultValue={selectedExperience?.yearFinal || ''}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-50'>Ano Final:</FormLabel>
								<FormControl>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant='outline' className='w-full'>
												{field.value ? `Selecionado: ${field.value}` : 'Selecione o Ano'}
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className='w-56'>
											<DropdownMenuLabel>Anos Disponíveis</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuRadioGroup
												value={field.value?.toString() || ''}
												onValueChange={(value) => {
													const selectedYear = parseInt(value, 10)
													field.onChange(selectedYear)
													form.setValue('yearFinal', selectedYear)
												}}
											>
												{years.map((year) => (
													<DropdownMenuRadioItem key={year.year} value={year.year.toString()}>
														{year.year}
													</DropdownMenuRadioItem>
												))}
											</DropdownMenuRadioGroup>
										</DropdownMenuContent>
									</DropdownMenu>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='mothFinal'
						defaultValue={selectedExperience?.mothFinal || ''}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-50'>Mês Final:</FormLabel>
								<FormControl>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant='outline' className='w-full'>
												{field.value === 'Present'
													? 'Selecionado: Atual'
													: field.value
														? `Selecionado: ${moths.find((m) => m.abbreviation === field.value)?.name}`
														: 'Selecione o Mês'}
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className='w-56'>
											<DropdownMenuLabel>Meses Disponíveis</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuRadioGroup
												value={field.value?.toString() || ''}
												onValueChange={(value) => {
													const selectedValue =
														value === 'Present'
															? 'Present'
															: moths.find((month) => month.id.toString() === value)?.abbreviation
													if (selectedValue) {
														field.onChange(selectedValue)
														form.setValue('mothFinal', selectedValue)
													}
												}}
											>
												<DropdownMenuRadioItem key='Present' value='Present'>
													Atual
												</DropdownMenuRadioItem>
												{moths.map((month) => (
													<DropdownMenuRadioItem key={month.id} value={month.id.toString()}>
														{month.name}
													</DropdownMenuRadioItem>
												))}
											</DropdownMenuRadioGroup>
										</DropdownMenuContent>
									</DropdownMenu>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name='activities'
					defaultValue={selectedExperience?.activities.join(', ') || ''}
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-50'>Atividades:</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder='Atividades (separadas por vírgula)'
									className='p-2 rounded bg-slate-800 text-gray-100'
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
							<FormItem>
								<FormLabel className='text-gray-300'>Skills</FormLabel>
								<FormControl>
									<DropdownMenu open={isOpen}>
										<DropdownMenuTrigger asChild>
											<Button
												variant='outline'
												className='w-full'
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

															const sanitizedValue = newValue.filter((id: string): id is string => id !== undefined)

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

				<Button
					disabled={loading}
					type='submit'
					className='bg-[#00BFFF] text-slate-950 hover:text-[#00BFFF] hover:bg-[#1c222b] hover:border-[#00BFFF]'
				>
					{loading ? 'Salvando...' : 'Salvar'}
				</Button>
			</form>
		</FormProvider>
	)
}
