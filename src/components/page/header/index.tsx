import { FaAddressCard, FaHouseUser, FaGamepad } from 'react-icons/fa'
import { PiProjectorScreenChartFill } from 'react-icons/pi'
import { MdOutlineContactMail } from 'react-icons/md'
import { IoMdLogIn } from 'react-icons/io'
import { BiSolidGame } from 'react-icons/bi'

type HeaderProps = {
  setSection: (section: string) => void
}

export default function Header({ setSection }: HeaderProps) {
  return (
    <header className="w-full flex justify-between items-center bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-4 border-b border-slate-700 backdrop-blur-lg fixed top-0 z-50">
      <div className="flex flex-col justify-center items-center p-3 bg-[#00BFFF] rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 group relative overflow-hidden">
        <div className="absolute inset-0 bg-[#00BFFF] opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-[2px]"></div>
        <a onClick={() => setSection('body')} className="cursor-pointer">
          <BiSolidGame size={30} className="text-slate-900 animate-pulse" />
        </a>
      </div>

      <nav className="flex gap-4">
        {[
          { section: 'body', icon: <FaHouseUser />, text: 'Início' },
          { section: 'about', icon: <FaAddressCard />, text: 'Sobre' },
          { section: 'skills', icon: <FaGamepad />, text: 'Skills' },
          { section: 'projects', icon: <PiProjectorScreenChartFill />, text: 'Projetos' },
        ].map((item) => (
          <a
            key={item.section}
            onClick={() => setSection(item.section)}
            className="relative w-28 h-10 flex justify-center items-center gap-2 
            text-gray-200 rounded-lg transition-all duration-300 hover:text-[#00BFFF]
            before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] 
            before:bg-[#00BFFF] before:origin-bottom-right before:scale-x-0 
            before:transition-transform before:duration-300 hover:before:origin-bottom-left 
            hover:before:scale-x-100 group cursor-pointer"
          >
            <span className="text-[#00BFFF] group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
            <span className="font-medium tracking-wide">{item.text}</span>
          </a>
        ))}
      </nav>

      <div className="flex gap-4">
        <a
          onClick={() => setSection('contact')}
          className="px-6 py-2 flex items-center gap-2 bg-slate-800/50 rounded-lg 
          text-gray-200 border border-slate-600 hover:border-[#00BFFF] 
          hover:bg-[#00BFFF]/10 transition-all duration-300 hover:shadow-[0_0_15px_3px_rgba(0,191,255,0.3)] cursor-pointer"
        >
          <MdOutlineContactMail className="text-[#00BFFF] animate-pulse" />
          Contato
        </a>
        
        <a
          href="/login"
          className="px-6 py-2 flex items-center gap-2 bg-[#00BFFF]/10 rounded-lg 
          text-gray-200 border border-[#00BFFF] hover:bg-[#00BFFF]/20 
          transition-all duration-300 group"
        >
          <IoMdLogIn className="text-[#00BFFF] group-hover:translate-x-1 transition-transform" />
          Login
        </a>
      </div>
    </header>
  )
}