import { SocialMediaType } from '../../services/social-media-service'
import { FormProvider, useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

interface SocialMediaFormProps {
	selectedMedia: SocialMediaType | null
	handleSave: (media: SocialMediaType) => void
	loading?: boolean
}

export default function FormSocialMedia({ selectedMedia, handleSave, loading }: SocialMediaFormProps) {
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
									className='bg-slate-800 text-gray-300 p-2 rounded-lg border-[1px] border-[#00BFFF]'
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
									placeholder='Nome do ícone da rede'
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
									placeholder='Cor do ícone'
									className='bg-slate-800 text-gray-300 p-2 rounded-lg border-[1px] border-[#00BFFF]'
								/>
							</FormControl>
						</FormItem>
					)}
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
