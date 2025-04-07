import { Button } from '../../components/ui/button'
import { FaAddressCard, FaEdit, FaGamepad, FaHouseUser, FaGraduationCap } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { PiProjectorScreenChartFill } from 'react-icons/pi'
import { useState } from 'react'
import { IoDocumentAttach, IoShareSocial } from 'react-icons/io5'
import { SiLevelsdotfyi } from 'react-icons/si'
import ConfigAbout from './content/config-about'
import ConfigHome from './content/config-home'
import ConfigSkill from './content/config-skill'
import ConfigProject from './content/config-project'
import ConfigSocialMedia from './content/config-social-media'
import ConfigExperience from './content/config-experience'
import ConfigCurriculum from './content/config-curriculum'
import ConfigEducation from './content/config-education'

export default function Config() {
	const [activeComponent, setActiveComponent] = useState<
		'home' | 'about' | 'education' | 'skills' | 'projects' | 'social-media' | 'stack' | 'experience' | 'curriculum'
	>('home')

	const renderComponent = () => {
		switch (activeComponent) {
			case 'home':
				return <ConfigHome />
			case 'about':
				return <ConfigAbout />
			case 'education':
				return <ConfigEducation />
			case 'skills':
				return <ConfigSkill />
			case 'projects':
				return <ConfigProject />
			case 'social-media':
				return <ConfigSocialMedia />
			case 'experience':
				return <ConfigExperience />
			case 'curriculum':
				return <ConfigCurriculum />
			default:
				return <ConfigHome />
		}
	}

	return (
		<div className='flex flex-col min-h-screen bg-gradient-to-r from-slate-950 via-slate-900 to-gray-950 animate-gradient-move'>
			<header className='flex items-center justify-between p-[20px] bg-slate-950 border-b border-[#00BFFF]'>
				<h1 className='text-[#00BFFF] text-[25px] font-bold flex items-center gap-[10px]'>
					<FaEdit className='mt-[2px] text-[#00BFFF]' />
					Modo Editor
				</h1>
				<a href='/'>
					<Button className='text-[#00BFFF] w-[100px] flex gap-[5px] border border-[#00BFFF] hover:bg-[#1c222b]'>
						<ImExit className='mt-[2px]' />
						Sair
					</Button>
				</a>
			</header>
			<main className='flex flex-1'>
				<menu className='w-[250px] bg-slate-950 min-h-full border-r border-[#00BFFF]'>
					<ul className='flex flex-col justify-center items-center gap-[10px] text-gray-50'>
						<li
							onClick={() => setActiveComponent('home')}
							className={`flex justify-center items-center gap-[5px] text-[#00BFFF] border-t border-t-[#00BFFF] border-b border-b-[#00BFFF] w-full p-[10px] mt-[10px] font-semibold cursor-pointer transition-colors ${activeComponent === 'home' ? 'bg-[#1c222b]' : 'hover:bg-[#1c222b]'}`}
						>
							<FaHouseUser color='#00BFFF' />
							Início
						</li>
						<li
							onClick={() => setActiveComponent('about')}
							className={`flex justify-center items-center gap-[5px] text-[#00BFFF] border-t border-t-[#00BFFF] border-b border-b-[#00BFFF] w-full p-[10px] font-semibold cursor-pointer transition-colors ${activeComponent === 'about' ? 'bg-[#1c222b]' : 'hover:bg-[#1c222b]'}`}
						>
							<FaAddressCard color='#00BFFF' />
							Sobre
						</li>
						<li
							onClick={() => setActiveComponent('education')}
							className={`flex justify-center items-center gap-[5px] text-[#00BFFF] border-t border-t-[#00BFFF] border-b border-b-[#00BFFF] w-full p-[10px] font-semibold cursor-pointer transition-colors ${activeComponent === 'education' ? 'bg-[#1c222b]' : 'hover:bg-[#1c222b]'}`}
						>
							<FaGraduationCap color='#00BFFF' />
							Formação Acadêmica
						</li>
						<li
							onClick={() => setActiveComponent('experience')}
							className={`flex justify-center items-center gap-[5px] text-[#00BFFF] border-t border-t-[#00BFFF] border-b border-b-[#00BFFF] w-full p-[10px] font-semibold cursor-pointer transition-colors ${activeComponent === 'experience' ? 'bg-[#1c222b]' : 'hover:bg-[#1c222b]'}`}
						>
							<SiLevelsdotfyi color='#00BFFF' />
							Experiência
						</li>
						<li
							onClick={() => setActiveComponent('skills')}
							className={`flex justify-center items-center gap-[5px] text-[#00BFFF] border-t border-t-[#00BFFF] border-b border-b-[#00BFFF] w-full p-[10px] font-semibold cursor-pointer transition-colors ${activeComponent === 'skills' ? 'bg-[#1c222b]' : 'hover:bg-[#1c222b]'}`}
						>
							<FaGamepad color='#00BFFF' />
							Skills
						</li>
						<li
							onClick={() => setActiveComponent('projects')}
							className={`flex justify-center items-center gap-[5px] text-[#00BFFF] border-t border-t-[#00BFFF] border-b border-b-[#00BFFF] w-full p-[10px] font-semibold cursor-pointer transition-colors ${activeComponent === 'projects' ? 'bg-[#1c222b]' : 'hover:bg-[#1c222b]'}`}
						>
							<PiProjectorScreenChartFill color='#00BFFF' />
							Projetos
						</li>
						<li
							onClick={() => setActiveComponent('social-media')}
							className={`flex justify-center items-center gap-[5px] text-[#00BFFF] border-t border-t-[#00BFFF] border-b border-b-[#00BFFF] w-full p-[10px] font-semibold cursor-pointer transition-colors ${activeComponent === 'social-media' ? 'bg-[#1c222b]' : 'hover:bg-[#1c222b]'}`}
						>
							<IoShareSocial color='#00BFFF' />
							Redes Sociais
						</li>
						<li
							onClick={() => setActiveComponent('curriculum')}
							className={`flex justify-center items-center gap-[5px] text-[#00BFFF] border-t border-t-[#00BFFF] border-b border-b-[#00BFFF] w-full p-[10px] font-semibold cursor-pointer transition-colors ${activeComponent === 'curriculum' ? 'bg-[#1c222b]' : 'hover:bg-[#1c222b]'}`}
						>
							<IoDocumentAttach color='#00BFFF' />
							Currículo
						</li>
					</ul>
				</menu>
				<div className='flex-1 p-[20px]'>{renderComponent()}</div>
			</main>
		</div>
	)
}
