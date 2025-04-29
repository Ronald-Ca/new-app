
import { SkillType } from '../../services/skill-service'
import { FormProvider, useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { FaSpinner } from 'react-icons/fa'

interface Skill {
	name: string
	level: number
	icon: string
	experience: number
	color: string
	type: 'skill' | 'competence'
}

interface SkillFormProps {
	selectedSkill: SkillType | null
	handleSave: (skill: Skill) => void
	isSubmitting?: boolean
}

export default function FormSkill({ selectedSkill, handleSave, isSubmitting }: SkillFormProps) {
	const form = useForm<Skill>({
		defaultValues: {
			name: selectedSkill?.name || '',
			level: selectedSkill?.level || 1,
			experience: selectedSkill?.experience || 1,
			icon: selectedSkill?.icon || '',
			color: selectedSkill?.color || '',
			type: selectedSkill?.type || 'skill',
		},
	})

	const onSubmit = (data: Skill) => {
		handleSave(data)
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
									placeholder='Nome'
									className='bg-slate-800 text-gray-300 p-2 rounded-lg border-2 border-default'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='level'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-300'>Nível</FormLabel>
							<FormControl>
								<Input
									{...field}
									type='number'
									placeholder='Nível'
									className='bg-slate-800 text-gray-300 p-2 rounded-lg border-2 border-default'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='experience'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-300'>Tempo de experiência</FormLabel>
							<FormControl>
								<Input
									{...field}
									type='number'
									placeholder='Experiência'
									className='bg-slate-800 text-gray-300 p-2 rounded-lg border-2 border-default'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='icon'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-300'>Ícone</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Ícone'
									className='bg-slate-800 text-gray-300 p-2 rounded-lg border-2 border-default'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='color'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-300'>Cor</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Cor'
									className='bg-slate-800 text-gray-300 p-2 rounded-lg border-2 border-default'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='type'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-300'>Tipo</FormLabel>
							<FormControl>
								<RadioGroup value={field.value} onValueChange={field.onChange} className='flex gap-4'>
									<FormItem className='flex items-center space-x-2'>
										<FormLabel className='text-gray-300 mt-1'>Habilidade</FormLabel>
										<RadioGroupItem
											value='skill'
											className={`${field.value === 'skill' ? 'bg-default' : 'bg-transparent'} border border-default`}
											color='red'
										/>
									</FormItem>
									<FormItem className='flex items-center space-x-2'>
										<FormLabel className='text-gray-300 mt-1'>Competência</FormLabel>
										<RadioGroupItem
											value='competence'
											className='border border-defa'
										/>
									</FormItem>
								</RadioGroup>
							</FormControl>
						</FormItem>
					)}
				/>

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
