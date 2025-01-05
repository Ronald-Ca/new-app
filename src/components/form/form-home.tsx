
import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

interface HomeData {
	image: File | null
	title: string
	role: string
	description: string
}

interface FormHomeProps {
	onSubmit: (data: HomeData) => void
}

export function FormHome({ onSubmit }: FormHomeProps) {
	const form = useFormContext<HomeData>()

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center gap-[10px]'>
			<FormField
				control={form.control}
				name='title'
				render={({ field }) => (
					<FormItem>
						<FormLabel className='text-gray-50'>Título:</FormLabel>
						<FormControl>
							<Input {...field} placeholder='Título' className='border-[1px] border-gray-50 w-[500px] bg-slate-950 text-gray-50' />
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name='role'
				render={({ field }) => (
					<FormItem>
						<FormLabel className='text-gray-50'>Cargo:</FormLabel>
						<FormControl>
							<Input {...field} placeholder='Cargo' className='border-[1px] border-gray-50 w-[500px] bg-slate-950 text-gray-50' />
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name='description'
				render={({ field }) => (
					<FormItem>
						<FormLabel className='text-gray-50'>Descrição:</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder='Descrição'
								className='border-[1px] border-gray-50 w-[500px] bg-slate-950 text-gray-50'
							/>
						</FormControl>
					</FormItem>
				)}
			/>
			<Button
				type='submit'
				className='bg-[#00BFFF] text-slate-950 border-[1px] border-slate-950 hover:text-[#00BFFF] hover:bg-[#1c222b] hover:border-[#00BFFF]'
			>
				Salvar
			</Button>
		</form>
	)
}
