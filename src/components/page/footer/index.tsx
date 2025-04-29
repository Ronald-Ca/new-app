import { FaInstagramSquare, FaWhatsappSquare, FaLinkedin, FaGithub } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export default function Footer() {
	return (
		<footer className="w-full bg-gradient-to-r from-slate-900 to-slate-800 py-6 px-4 flex flex-col md:flex-row items-center justify-between shadow-inner">
			<span className="text-gray-300 text-sm md:text-base">© 2024 Ronald Camargo</span>

			<div className="flex gap-4 mt-4 md:mt-0">
				{[
					{ href: 'https://instagram.com/ronald_camargo_?igshid=YmMyMTA2M2Y=', icon: <FaInstagramSquare /> },
					{ href: 'https://api.whatsapp.com/send?phone=5566984043892&text=Ol%C3%A1%20sou%20Ronald%20Camargo%2C%20iniciante%20em%20Front%20End!', icon: <FaWhatsappSquare /> },
					{ href: 'https://www.linkedin.com/in/ronald-camargo-04b942238/', icon: <FaLinkedin /> },
					{ href: 'https://github.com/Ronald-Ca', icon: <FaGithub /> },
					{ href: 'mailto:ronaldcamargodev@gmail.com', icon: <MdEmail /> },
				].map(({ href, icon }, index) => (
					<a
						key={index}
						href={href}
						target="_blank"
						rel="noreferrer"
						className="text-default text-3xl transition-all duration-300 transform hover:scale-110 hover:text-white"
					>
						{icon}
					</a>
				))}
			</div>
		</footer>
	)
}
