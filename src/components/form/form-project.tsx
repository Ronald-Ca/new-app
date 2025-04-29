
import { useGetSkillsQuery } from '../../queries/skill'
import { ProjectType } from '../../services/project-service'
import { useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { FaSpinner } from 'react-icons/fa'

interface ProjectFormProps {
	selectedProject?: ProjectType
	handleSave: (project: ProjectType) => void
	isSubmitting?: boolean
}

export function FormProject({ selectedProject, handleSave, isSubmitting }: ProjectFormProps) {
	const form = useForm({
		defaultValues: {
			name: selectedProject?.name || '',
			image: selectedProject?.image || '',
			video: selectedProject?.video || '',
			description: selectedProject?.description || '',
			link: selectedProject?.link || '',
			skillsId: selectedProject?.projectSkills?.map((skill) => skill.skillId) || [],
		},
	})

	const [imagePreview, setImagePreview] = useState<string | null>(typeof selectedProject?.image === 'string' ? selectedProject.image : null)
	const [videoPreview, setVideoPreview] = useState<string | null>(typeof selectedProject?.video === 'string' ? selectedProject.video : null)
	const [skillsId, setSkillsId] = useState<string[]>(selectedProject?.projectSkills?.map((skill) => skill.id) || [])
	const fileInputRef = useRef<HTMLInputElement | null>(null)
	const videoInputRef = useRef<HTMLInputElement | null>(null)

	const { data: skills } = useGetSkillsQuery()

	const handleFileChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		setPreview: React.Dispatch<React.SetStateAction<string | null>>,
		formKey: 'image' | 'video',
	) => {
		const file = event.target.files?.[0]
		if (file) {
			const fileURL = URL.createObjectURL(file)
			setPreview(fileURL)
			form.setValue(formKey, file)
		}
	}

	const handleCameraClick = (inputRef: React.RefObject<HTMLInputElement | null>) => {
		inputRef?.current?.click()
	}

	const onSubmit = (data: ProjectType) => {
		const newProject: ProjectType = {
			...data,
			projectSkills: skillsId.map((id) => ({ id })),
		}
		handleSave(newProject)
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-300'>Nome</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Nome do projeto'
									className='bg-slate-800 text-gray-300 p-2 rounded-lg border-2 border-default'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-300'>Descrição</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder='Descrição do projeto'
									className='bg-slate-800 text-gray-300 p-2 rounded-lg border-2 border-default'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='link'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-300'>Link</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Link do projeto'
									className='bg-slate-800 text-gray-300 p-2 rounded-lg border-2 border-default'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='skillsId'
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
											className='w-56 h-3h overflow-y-auto'
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
																: (field.value ?? []).filter((id) => id !== skill.id)

															const sanitizedValue = newValue.filter((id): id is string => id !== undefined)

															field.onChange(sanitizedValue)
															setSkillsId(sanitizedValue)
															form.setValue('skillsId', sanitizedValue)
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
				<FormItem>
					<FormLabel className='text-gray-300'>Imagem</FormLabel>
					<FormControl>
						<div
							onClick={() => handleCameraClick(fileInputRef)}
							className='h-2h cursor-pointer flex items-center justify-center border-2 border-dashed p-2 rounded-xl'
						>
							{imagePreview ? (
								<img src={imagePreview} alt='Preview' className='w-full h-full object-cover rounded-xl' />
							) : (
								<p className='text-gray-50'>Adicione uma imagem para pré-visualização</p>
							)}
							<Input
								type='file'
								className='hidden'
								onChange={(e) => handleFileChange(e, setImagePreview, 'image')}
								ref={fileInputRef}
							/>
						</div>
					</FormControl>
				</FormItem>
				{/* Vídeo */}
				<FormItem>
					<FormLabel className='text-gray-300'>Vídeo</FormLabel>
					<FormControl>
						<div
							onClick={() => handleCameraClick(videoInputRef)}
							className='h-2h cursor-pointer flex items-center justify-center border-2 border-dashed p-2 rounded-xl'
						>
							{videoPreview ? (
								<video src={videoPreview} className='w-full h-full object-cover rounded-xl' controls />
							) : (
								<p className='text-gray-50'>Adicione um vídeo para pré-visualização</p>
							)}
							<Input
								type='file'
								className='hidden'
								onChange={(e) => handleFileChange(e, setVideoPreview, 'video')}
								ref={videoInputRef}
							/>
						</div>
					</FormControl>
				</FormItem>

				{/* Botão de Salvar */}
				<div className="flex justify-center mt-4">
					<Button
						type='submit'
						disabled={isSubmitting}
						className={`flex items-center justify-center gap-2 bg-default text-slate-950 border border-slate-950 py-2 px-4 rounded transition-colors ${!isSubmitting && 'hover:text-default hover:bg-slate-950 hover:border-default'
							}`}
					>
						{isSubmitting ? (
							<>
								<FaSpinner className='animate-spin' />
							</>
						) : (
							'Salvar'
						)}
					</Button>
				</div>
			</form>
		</FormProvider>
	)
}
