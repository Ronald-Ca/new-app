import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

interface About {
	image: File | null
	person: string
	address: string
	education: string
}

interface FormAboutProps {
	onSubmit: (data: About) => void
}

export function FormAbout({ onSubmit }: FormAboutProps) {
	const form = useFormContext<About>()

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center gap-[10px]'>
			<FormField
				control={form.control}
				name='person'
				render={({ field }) => (
					<FormItem>
						<FormLabel className='text-gray-50'>Eu:</FormLabel>
						<FormControl>
							<Input
								{...field}
								placeholder='Quem sou eu?'
								className='border-[1px] border-gray-50 w-[500px] bg-slate-950 text-gray-50'
							/>
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name='address'
				render={({ field }) => (
					<FormItem>
						<FormLabel className='text-gray-50'>Endereço:</FormLabel>
						<FormControl>
							<Input
								{...field}
								placeholder='Qual seu endereço?'
								className='border-[1px] border-gray-50 w-[500px] bg-slate-950 text-gray-50'
							/>
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name='education'
				render={({ field }) => (
					<FormItem>
						<FormLabel className='text-gray-50'>Formação:</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder='Qual sua formação?'
								className='border-[1px] border-gray-50 w-[500px] h-[200px] bg-slate-950 text-gray-50'
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
