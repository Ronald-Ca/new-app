import { FaInstagramSquare, FaWhatsappSquare, FaLinkedin, FaGithub } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
export default function Footer() {
	return (
		<div className='w-full bg-slate-900 p-6 flex justify-between items-center'>
			<span className='text-gray-200'>© 2024 Ronald Camargo</span>
			<div className='flex ml-auto'>
				<a href='https://instagram.com/ronald_camargo_?igshid=YmMyMTA2M2Y=' target='_blank' rel='noreferrer' className='ml-2'>
					<FaInstagramSquare
						size={35}
						className='transition-colors  text-[#00BFFF] hover:text-slate-900 hover:bg-gray-300 rounded-full p-1'
					/>
				</a>
				<a
					href='https://api.whatsapp.com/send?phone=5566984043892&text=Ol%C3%A1%20sou%20Ronald%20Camargo%2C%20iniciante%20em%20Front%20End!'
					target='_blank'
					rel='noreferrer'
					className='ml-2'
				>
					<FaWhatsappSquare
						size={35}
						className='transition-colors  text-[#00BFFF] hover:text-slate-900 hover:bg-gray-300 rounded-full p-1'
					/>
				</a>
				<a href='https://www.linkedin.com/in/ronald-camargo-04b942238/' target='_blank' rel='noreferrer' className='ml-2'>
					<FaLinkedin size={35} className='transition-colors  text-[#00BFFF] hover:text-slate-900 hover:bg-gray-300 rounded-full p-1' />
				</a>
				<a href='https://github.com/Ronald-Ca' target='_blank' rel='noreferrer' className='ml-2'>
					<FaGithub size={35} className='transition-colors  text-[#00BFFF] hover:text-slate-900 hover:bg-gray-300 rounded-full p-1' />
				</a>
				<a href='mailto:ronaldcamargodev@gmail.com' target='_blank' rel='noreferrer' className='ml-2'>
					<MdEmail size={35} className='transition-colors  text-[#00BFFF] hover:text-slate-900 hover:bg-gray-300 rounded-full p-1' />
				</a>
			</div>
		</div>
	)
}
