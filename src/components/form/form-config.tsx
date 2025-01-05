
import { SkillType } from '../../services/skill-service'
import { FormProvider, useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'

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
}

export default function FormSkill({ selectedSkill, handleSave }: SkillFormProps) {
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
									className='bg-slate-800 text-gray-300 p-2 rounded-lg border-[1px] border-[#00BFFF]'
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
									className='bg-slate-800 text-gray-300 p-2 rounded-lg border-[1px] border-[#00BFFF]'
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
									className='bg-slate-800 text-gray-300 p-2 rounded-lg border-[1px] border-[#00BFFF]'
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
									className='bg-slate-800 text-gray-300 p-2 rounded-lg border-[1px] border-[#00BFFF]'
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
									className='bg-slate-800 text-gray-300 p-2 rounded-lg border-[1px] border-[#00BFFF]'
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
									<FormItem className='flex items-center gap-[10px]'>
										<FormLabel className='text-gray-300 mt-[5px]'>Habilidade</FormLabel>
										<RadioGroupItem
											value='skill'
											className={`text-white w-[10px] h-[10px] ${field.value === 'skill' ? 'bg-blue-500' : 'bg-white'} border border-white rounded-full`}
										/>
									</FormItem>
									<FormItem className='flex items-center gap-[10px]'>
										<FormLabel className='text-gray-300 mt-[5px]'>Competência</FormLabel>
										<RadioGroupItem
											value='competence'
											className={`text-white w-[10px] h-[10px] ${field.value === 'competence' ? 'bg-blue-500' : 'bg-white'} border border-white rounded-full`}
										/>
									</FormItem>
								</RadioGroup>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type='submit' className='bg-[#00BFFF] text-slate-950 hover:text-[#00BFFF] hover:bg-[#1c222b] hover:border-[#00BFFF]'>
					Salvar
				</Button>
			</form>
		</FormProvider>
	)
}
