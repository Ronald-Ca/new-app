import { useForm, FormProvider } from 'react-hook-form'
import { IoSendOutline } from 'react-icons/io5'
import { FaDiscord, FaGithub, FaInstagramSquare, FaLinkedin, FaWhatsappSquare } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { FormControl, FormField, FormItem, FormLabel } from '../../../components/ui/form'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'

function ContactForm() {
	const form = useForm()

	const onSubmit = () => {}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center gap-[10px]'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-50'>Nome:</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Seu nome'
									className='border-[1px] border-gray-50 w-[500px] bg-slate-950 text-gray-50'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='phone'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-50'>Telefone:</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Seu telefone'
									className='border-[1px] border-gray-50 w-[500px] bg-slate-950 text-gray-50'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-50'>Email:</FormLabel>
							<FormControl>
								<Input
									{...field}
									type='email'
									placeholder='Seu email'
									className='border-[1px] border-gray-50 w-[500px] bg-slate-950 text-gray-50'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='subject'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-50'>Assunto:</FormLabel>
							<FormControl>
								<Input {...field} placeholder='Assunto' className='border-[1px] border-gray-50 w-[500px] bg-slate-950 text-gray-50' />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='message'
					render={({ field }) => (
						<FormItem className='p-0 m-0'>
							<FormLabel className='text-gray-50 m-0 p-0'>Messagem:</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder='Sua mensagem'
									className='border-[1px] border-gray-50 w-[500px] bg-slate-950 text-gray-50'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button className='w-[200px] mt-[30px] hover:bg-[#00BFFF] hover:text-slate-900 flex gap-[5px] font-semibold text-[15px]'>
					Enviar
					<IoSendOutline size={15} />
				</Button>
			</form>
		</FormProvider>
	)
}

export default function Contact() {
	return (
		<div className='min-h-full bg-slate-800 flex flex-col p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 animate-gradient-move'>
			<div className='flex mb-[15px]'>
				<h1 className='w-full text-center text-[50px] font-semibold text-gray-300'>Entrar em contato</h1>
			</div>
			<div className='flex flex-col items-center justify-center border-[1px] rounded-[10px] border-[#00BFFF] p-[50px]'>
				<div className='flex gap-[10px]'>
					<FaLinkedin className='cursor-pointer text-[#00BFFF] text-[40px] transform hover:scale-105 transition-transform duration-300' />
					<FaInstagramSquare className='cursor-pointer text-[#00BFFF] text-[40px] transform hover:scale-105 transition-transform duration-300' />
					<FaWhatsappSquare className='cursor-pointer text-[#00BFFF] text-[40px] transform hover:scale-105 transition-transform duration-300' />
					<FaGithub className='cursor-pointer text-[#00BFFF] text-[40px] transform hover:scale-105 transition-transform duration-300' />
					<MdEmail className='cursor-pointer text-[#00BFFF] text-[40px] transform hover:scale-105 transition-transform duration-300' />
					<FaDiscord className='cursor-pointer text-[#00BFFF] text-[40px] transform hover:scale-105 transition-transform duration-300' />
				</div>
				<ContactForm />
			</div>
		</div>
	)
}
