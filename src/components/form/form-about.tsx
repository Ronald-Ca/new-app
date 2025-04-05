import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { states } from '@app/utils/states'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface About {
	image: File | null
	name: string
	age: number
	city: string
	state: string
}

interface FormAboutProps {
	onSubmit: (data: About) => void
}

export function FormAbout({ onSubmit }: FormAboutProps) {
	const form = useFormContext<About>()

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center gap-3 w-full'>
			<div className="flex gap-3">
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem className="flex-1 min-w-80">
							<FormLabel className='text-gray-50'>Nome:</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Seu nome'
									className='border-[1px] border-gray-50 w-full bg-slate-950 text-gray-50'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='age'
					render={({ field }) => (
						<FormItem className="w-20">
							<FormLabel className='text-gray-50'>Idade:</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Idade'
									type='number'
									className='border-[1px] border-gray-50 w-full bg-slate-950 text-gray-50'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
			</div>
			
			<div className="flex gap-3">
				<FormField
					control={form.control}
					name='city'
					render={({ field }) => (
						<FormItem className="flex-1 min-w-80">
							<FormLabel className='text-gray-50'>Cidade:</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Sua cidade'
									className='border-[1px] border-gray-50 w-full bg-slate-950 text-gray-50'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='state'
					render={({ field }) => (
						<FormItem className="w-20">
							<FormLabel className='text-gray-50'>Estado:</FormLabel>
							<FormControl>
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="UF" />
									</SelectTrigger>
									<SelectContent>
										{states.map((estado) => (
											<SelectItem key={estado.id} value={estado.sigla}>
												{estado.sigla}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>
			</div>
			<Button
				type='submit'
				className='bg-[#00BFFF] text-slate-950 border-[1px] border-slate-950 hover:text-[#00BFFF] hover:bg-[#1c222b] hover:border-[#00BFFF]'
			>
				Salvar
			</Button>
		</form>
	)
}
