import { useState, Suspense, lazy, useMemo } from "react"
import { FaHouseUser, FaAddressCard, FaGraduationCap, FaGamepad, FaEdit } from "react-icons/fa"
import { SiLevelsdotfyi } from "react-icons/si"
import { PiProjectorScreenChartFill } from "react-icons/pi"
import { IoShareSocial, IoDocumentAttach } from "react-icons/io5"
import { Button } from "@app/components/ui/button"
import { ImExit } from "react-icons/im"
import { cn } from "@app/lib/utils"
import { SidebarMenu, SidebarMenuItem } from "@app/components/ui/sidebar"

const configTabs = [
	{
		key: "home",
		label: "Início",
		icon: FaHouseUser,
		component: lazy(() => import("./config-home")),
	},
	{
		key: "about",
		label: "Sobre",
		icon: FaAddressCard,
		component: lazy(() => import("./config-about")),
	},
	{
		key: "education",
		label: "Formação",
		icon: FaGraduationCap,
		component: lazy(() => import("./config-education")),
	},
	{
		key: "experience",
		label: "Experiência",
		icon: SiLevelsdotfyi,
		component: lazy(() => import("./config-experience")),
	},
	{
		key: "skills",
		label: "Skills",
		icon: FaGamepad,
		component: lazy(() => import("./config-skill")),
	},
	{
		key: "projects",
		label: "Projetos",
		icon: PiProjectorScreenChartFill,
		component: lazy(() => import("./config-project")),
	},
	{
		key: "social-media",
		label: "Redes",
		icon: IoShareSocial,
		component: lazy(() => import("./config-social-media")),
	},
	{
		key: "curriculum",
		label: "Currículo",
		icon: IoDocumentAttach,
		component: lazy(() => import("./config-curriculum")),
	},
] as const

type TabKey = (typeof configTabs)[number]["key"]

export default function Config() {
	const [active, setActive] = useState<TabKey>("home")

	const ActiveComponent = useMemo(() => configTabs.find((tab) => tab.key === active)?.component, [active])

	return (
		<div className="flex flex-col min-h-screen bg-[#0a0e17]">
			<header className="flex items-center justify-between p-4 bg-[#070b14] border-b border-[#1e2a4a] shadow-md">
				<h1 className="text-cyan-400 text-2xl font-bold flex items-center gap-3">
					<FaEdit className="text-cyan-500" />
					<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Modo Editor</span>
				</h1>
				<Button
					variant="outline"
					className="border-cyan-700 hover:bg-cyan-950 hover:text-cyan-300 transition-all duration-300"
				>
					<a href="/" className="flex items-center gap-2">
						<ImExit /> Sair
					</a>
				</Button>
			</header>

			<main className="flex flex-1">
				<aside className="w-64 bg-[#070b14] border-r border-[#1e2a4a] shadow-lg">
					<div className="px-3 py-2">
						<SidebarMenu>
							{configTabs.map(({ key, label, icon: Icon }) => (
								<SidebarMenuItem key={key}>
									<button
										onClick={() => setActive(key)}
										className={cn(
											"w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
											"hover:bg-[#111827] group relative overflow-hidden",
											active === key
												? "bg-gradient-to-r from-[#0c1a2c] to-[#111827] text-cyan-400 font-medium border-l-2 border-cyan-500"
												: "text-gray-400",
										)}
									>
										{active === key && <div className="absolute inset-0 bg-cyan-500/5 rounded-lg" />}
										<span
											className={cn(
												"text-lg transition-all duration-200",
												active === key ? "text-cyan-400" : "text-gray-500 group-hover:text-gray-300",
											)}
										>
											<Icon />
										</span>
										<span className="relative z-10">{label}</span>

										{active === key && <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-cyan-500"></div>}
									</button>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</div>
				</aside>

				<section className="flex-1 p-6 overflow-auto bg-gradient-to-b from-[#0a0e17] to-[#0c1220]">
					<div className="bg-[#070b14] rounded-xl border border-[#1e2a4a] shadow-xl p-6 h-full">
						<Suspense
							fallback={
								<div className="flex items-center justify-center h-full">
									<div className="animate-pulse flex flex-col items-center">
										<div className="h-2 w-20 bg-gray-700 rounded mb-3"></div>
										<div className="h-2 w-28 bg-gray-800 rounded"></div>
									</div>
								</div>
							}
						>
							{ActiveComponent && <ActiveComponent />}
						</Suspense>
					</div>
				</section>
			</main>
		</div>
	)
}
