import { motion } from "framer-motion"
import {
	ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@app/components/ui/card"
import { FiLinkedin } from "react-icons/fi"
import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import { MdOutlineEmail } from "react-icons/md"
import { IoLocationOutline } from "react-icons/io5"
import FormContact from "@app/components/form/form-contact"

export default function Contact() {
	const socialLinks = [
		{ icon: <FiLinkedin className="h-5 w-5" />, name: "LinkedIn", url: "#", color: "bg-[#0077B5]" },
		{
			icon: <FaInstagram className="h-5 w-5" />,
			name: "Instagram",
			url: "#",
			color: "bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600",
		},
		{ icon: <FaWhatsapp className="h-5 w-5" />, name: "WhatsApp", url: "#", color: "bg-[#25D366]" },
		{ icon: <MdOutlineEmail className="h-5 w-5" />, name: "Email", url: "#", color: "bg-[#EA4335]" },
	]

	return (
		<div className="min-h-screen-header-footer px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
			<div className="max-w-7xl mx-auto pt-28 md:pt-24 sm:pt-2 w-full pb-24">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<h1
						className="font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent
						text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight md:leading-tight"
						style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
					>
						Vamos Conversar?
					</h1>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full">
					{/* Cartão de info social */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 overflow-hidden">
							<CardHeader className="pb-4">
								<CardTitle className="text-2xl font-bold text-white">Informações de Contato</CardTitle>
								<CardDescription className="text-slate-400">
									Escolha a melhor forma de entrar em contato comigo
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="grid grid-cols-1 gap-4">
									{socialLinks.map((link, index) => (
										<a
											key={index}
											href={link.url}
											className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition-all group"
										>
											<div className={`${link.color} p-2 rounded-md text-white`}>{link.icon}</div>
											<div className="flex-1">
												<p className="font-medium text-white">{link.name}</p>
											</div>
											<ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
										</a>
									))}
								</div>
								<div className="mt-8 pt-6 border-t border-slate-700">
									<div className="flex items-center gap-3">
										<div className="bg-slate-800 p-2 rounded-md">
											<IoLocationOutline className="h-5 w-5 text-cyan-400" />
										</div>
										<div>
											<h3 className="text-white font-medium">Localização</h3>
											<p className="text-slate-400 mt-1">Mato Grosso, Brasil</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>

					{/* Cartão de formulário */}
					<Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
						<CardHeader className="pb-4">
							<CardTitle className="text-2xl font-bold text-white">Envie uma Mensagem</CardTitle>
							<CardDescription className="text-slate-400">
								Preencha o formulário abaixo e entrarei em contato o mais breve possível
							</CardDescription>
						</CardHeader>
						<CardContent>
							<FormContact />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
