import { GiCoffeeCup } from 'react-icons/gi'
import { FaAddressCard, FaHouseUser, FaGamepad } from 'react-icons/fa'
import { PiProjectorScreenChartFill } from 'react-icons/pi'
import { MdOutlineContactMail } from 'react-icons/md'
import { IoMdLogIn } from 'react-icons/io'

type HeaderProps = {
	setSection: (section: string) => void
}

export default function Header({ setSection }: HeaderProps) {
	return (
		<div className='w-full flex justify-between bg-slate-900 pl-[30px] pr-[30px] pt-[10px] pb-[10px] items-center'>
			<div className='flex flex-col justify-center items-center p-2 bg-[#00BFFF] rounded-lg shadow-lg'>
				<a onClick={() => setSection('body')} className='cursor-pointer'>
					<GiCoffeeCup size={30} className='text-slate-900' />
				</a>
			</div>
			<div className='flex gap-3'>
				<a
					onClick={() => setSection('body')}
					className='w-[100px] border border-gray-600 rounded-[10px] p-1 flex justify-center items-center gap-2 bg-slate-900 text-gray-200 transition-transform duration-300 hover:bg-[#1c222b] hover:border-[#00BFFF] cursor-pointer'
				>
					<FaHouseUser color='#00BFFF' />
					Início
				</a>
				<a
					onClick={() => setSection('about')}
					className='w-[100px] border border-gray-600 rounded-[10px] p-1 flex justify-center items-center gap-2 bg-slate-900 text-gray-200 transition-transform duration-300 hover:bg-[#1c222b] hover:border-[#00BFFF] cursor-pointer'
				>
					<FaAddressCard color='#00BFFF' />
					Sobre
				</a>
				<a
					onClick={() => setSection('skills')}
					className='w-[100px] border border-gray-600 rounded-[10px] p-1 flex justify-center items-center gap-2 bg-slate-900 text-gray-200 transition-transform duration-300 hover:bg-[#1c222b] hover:border-[#00BFFF] cursor-pointer'
				>
					<FaGamepad color='#00BFFF' />
					Skills
				</a>
				<a
					onClick={() => setSection('projects')}
					className='w-[100px] border border-gray-600 rounded-[10px] p-1 flex justify-center items-center gap-2 bg-slate-900 text-gray-200 transition-transform duration-300 hover:bg-[#1c222b] hover:border-[#00BFFF] cursor-pointer'
				>
					<PiProjectorScreenChartFill color='#00BFFF' />
					Projetos
				</a>
			</div>
			<div className='flex gap-3'>
				<a
					onClick={() => setSection('contact')}
					className='w-[100px] border border-gray-600 rounded-[10px] p-1 flex justify-center items-center gap-1 bg-slate-700 text-gray-200 transition-transform duration-300 hover:bg-[#1c222b] hover:border-[#00BFFF] cursor-pointer'
				>
					<MdOutlineContactMail color='#00BFFF' />
					Contato
				</a>
				<a
					href='/login'
					className='w-[100px] border border-gray-600 rounded-[10px] p-1 flex justify-center items-center gap-1 bg-slate-950 text-gray-200 transition-transform duration-300 hover:bg-[#1c222b] hover:border-[#00BFFF]'
				>
					<IoMdLogIn color='#00BFFF' />
					Login
				</a>
			</div>
		</div>
	)
}
