import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { states } from '@app/utils/states'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { FaIdCard, FaMapMarkerAlt, FaSave, FaSpinner } from 'react-icons/fa'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'

interface About {
	image: File | null
	name: string
	age: number
	city: string
	state: string
}

interface FormAboutProps {
	onSubmit: (data: About) => void
	isSubmitting?: boolean
}

export function FormAbout({ onSubmit, isSubmitting = false }: FormAboutProps) {
	const form = useFormContext<About>()

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
			<div className="space-y-5">
				<div className="flex items-center gap-1 mb-2">
					<div className="h-1 w-1 rounded-full bg-cyan-400"></div>
					<h3 className="text-gray-300 font-medium">Dados Pessoais</h3>
				</div>

				<div className="flex gap-4 items-start">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel className="text-gray-300 flex items-center gap-2">
									<FaIdCard className="text-cyan-500/70" size={14} />
									Nome Completo
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Seu nome completo"
										className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="age"
						render={({ field }) => (
							<FormItem className="w-24 -mt-3">
								<FormLabel className="text-gray-300">Idade</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Idade"
										type="number"
										min={0}
										className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex items-center gap-1 mb-2 mt-6">
					<div className="h-1 w-1 rounded-full bg-cyan-400"></div>
					<h3 className="text-gray-300 font-medium flex items-center gap-2">
						<FaMapMarkerAlt className="text-cyan-500/70" size={14} />
						Localização
					</h3>
				</div>

				<div className="flex gap-4 items-start">
					<FormField
						control={form.control}
						name="city"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel className="text-gray-300">Cidade</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Sua cidade"
										className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="state"
						render={({ field }) => (
							<FormItem className="w-24">
								<FormLabel className="text-gray-300">Estado</FormLabel>
								<FormControl>
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<Select value={field.value} onValueChange={field.onChange} defaultValue={field.value || ""}>
													<SelectTrigger className="bg-[#070b14] border border-[#1e2a4a] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 rounded-md">
														<SelectValue placeholder="UF" />
													</SelectTrigger>
													<SelectContent className="bg-[#0c1220] border border-[#1e2a4a] text-gray-100 max-h-60">
														{states.map((estado) => (
															<SelectItem
																key={estado.id}
																value={estado.sigla}
																className="focus:bg-cyan-500/20 focus:text-cyan-50"
															>
																{estado.sigla} - {estado.name}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</TooltipTrigger>
											<TooltipContent side="right">
												<p>Selecione seu estado</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>

			<div className="pt-6">
				<Button
					type="submit"
					disabled={isSubmitting}
					className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-2.5 rounded-md transition-all duration-300 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
				>
					{isSubmitting ? (
						<>
							<FaSpinner className="animate-spin" />
							<span>Salvando...</span>
						</>
					) : (
						<>
							<FaSave />
							<span>Salvar Informações</span>
						</>
					)}
				</Button>
			</div>
		</form>
	)
}