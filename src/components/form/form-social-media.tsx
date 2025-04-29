import { SocialMediaType } from '../../services/social-media-service'
import { FormProvider, useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FaSpinner } from 'react-icons/fa'

interface SocialMediaFormProps {
	selectedMedia: SocialMediaType | null
	handleSave: (media: SocialMediaType) => void
	isSubmitting?: boolean
}

export default function FormSocialMedia({ selectedMedia, handleSave, isSubmitting }: SocialMediaFormProps) {
	const form = useForm<SocialMediaType>({
		defaultValues: {
			name: selectedMedia?.name || '',
			link: selectedMedia?.link || '',
			icon: selectedMedia?.icon || '',
			color: selectedMedia?.color || '',
		},
	})

	const onSubmit = (data: SocialMediaType) => {
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
									placeholder='Nome da rede social'
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
									placeholder='Link da rede social'
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
									placeholder='Nome do ícone da rede'
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
									placeholder='Cor do ícone'
									className='bg-slate-800 text-gray-300 p-2 rounded-lg border-2 border-default'
								/>
							</FormControl>
						</FormItem>
					)}
				/>

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
