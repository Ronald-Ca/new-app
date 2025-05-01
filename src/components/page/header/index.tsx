import { FaAddressCard, FaHouseUser, FaGamepad } from 'react-icons/fa';
import { PiProjectorScreenChartFill } from 'react-icons/pi';
import { MdOutlineContactMail } from 'react-icons/md';
import { IoMdLogIn } from 'react-icons/io';
import { BiSolidGame } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const menuItems = [
    { path: '/', icon: <FaHouseUser />, text: 'Início' },
    { path: '/about', icon: <FaAddressCard />, text: 'Sobre' },
    { path: '/skills', icon: <FaGamepad />, text: 'Skills' },
    { path: '/projects', icon: <PiProjectorScreenChartFill />, text: 'Projetos' },
  ]

  return (
    <header className="w-full flex justify-between items-center bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-4 border-b border-slate-700 fixed top-0 z-50">
      <div
        className="flex flex-col justify-center items-center p-3 bg-default rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 relative overflow-hidden cursor-pointer"
        onClick={() => window.history.pushState(null, '', '/')}
      >
        <div className="absolute inset-0 bg-default opacity-20 hover:opacity-30 transition-opacity duration-300 blur-sm"></div>
        <BiSolidGame size={30} className="text-slate-900 animate-pulse" />
      </div>

      <nav className="flex gap-4">
        {menuItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `relative w-28 h-10 flex justify-center items-center gap-2 rounded-lg transition-all duration-300 cursor-pointer
               before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 before:bg-default before:rounded-lg before:transition-transform before:duration-300
               ${isActive
                ? 'text-default before:scale-x-100 before:origin-bottom-left'
                : 'text-gray-200 before:scale-x-0 before:origin-bottom-right hover:text-default hover:before:scale-x-100 hover:before:origin-bottom-left'
              }
              `
            }
          >
            <span className="text-default hover:scale-110 transition-transform">{item.icon}</span>
            <span className="font-medium tracking-wide">{item.text}</span>
          </NavLink>
        ))}
      </nav>

      <div className="flex gap-4">
        <div
          className="px-6 py-2 flex items-center gap-2 bg-slate-800/50 rounded-lg text-gray-200 border border-slate-600 hover:border-default hover:bg-default/10 transition-all duration-300 hover:shadow-[0_0_15px_3px_rgba(0,191,255,0.3)] cursor-pointer"
          onClick={() => window.history.pushState(null, '', '/contact')}
        >
          <MdOutlineContactMail className="text-default animate-pulse" />
          Contato
        </div>
        <div
          className="px-6 py-2 flex items-center gap-2 bg-default/10 rounded-lg text-gray-200 border border-default hover:bg-default/20 transition-all duration-300 group cursor-pointer"
          onClick={() => window.history.pushState(null, '', '/login')}
        >
          <IoMdLogIn className="text-default group-hover:translate-x-1 transition-transform" />
          Login
        </div>
      </div>
    </header>
  )
}