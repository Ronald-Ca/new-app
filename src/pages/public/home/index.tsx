import { IoIosArrowDroprightCircle, IoLogoWhatsapp } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { Avatar, AvatarImage } from "../../../components/ui/avatar"
import LoadingSpinner from "../../../components/common/loading"
import { useGetHomeQuery } from "../../../queries/home"
import ErrorComponent from "@app/components/common/error"
import { FaGithub, FaLinkedin, FaReact } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { TbBrandTypescript, TbBrandMongodb } from "react-icons/tb"
import { RiInstagramFill, RiJavascriptLine } from "react-icons/ri"
import { SiExpress } from "react-icons/si"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { TechIcon } from "@app/components/common/tooltip"
import { useGetSocialMediaQuery } from "@app/queries/social-media"

const techs = [
	{ label: "React", Icon: FaReact },
	{ label: "TypeScript", Icon: TbBrandTypescript },
	{ label: "MongoDB", Icon: TbBrandMongodb },
	{ label: "JavaScript", Icon: RiJavascriptLine },
	{ label: "Express", Icon: SiExpress },
]

export default function Home() {
	const navigate = useNavigate()

	// Query to fetch home data.
	const { data: home, isLoading, isError } = useGetHomeQuery()
	const { data: socialMedia } = useGetSocialMediaQuery()

	if (isLoading) return <LoadingSpinner />
	if (isError || !home) return <ErrorComponent />

	// Destructuring the properties of the home object for better readability.
	const { title, role, description, image, imageBackground } = home

	return (
		<div
			className="relative w-full min-h-screen-header-footer bg-cover bg-center flex items-center justify-center"
			style={{ backgroundImage: `url(${imageBackground})` }}
		>
			{/* Background opacity layer */}
			<div className="absolute inset-0 opacity-60 bg-bg_default" />

			{/* Main content */}
			<div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 py-12">
				<div className="flex flex-col justify-center max-w-xl">
					<div className="flex items-center gap-2 mb-2">
						<div className="h-1 w-12 bg-default rounded-full"></div>
						<span className="text-default font-medium">Portfólio</span>
					</div>

					<h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-gray-200 mb-2">{title}</h1>
					<span className="text-default text-lg md:text-xl font-medium mb-4">{role}</span>
					<p className="text-lg md:text-xl text-gray-300 mb-6">{description}</p>

					<div className="flex flex-wrap gap-4 mb-8">
						<Button
							onClick={() => navigate("/contact")}
							className="px-6 h-12 flex items-center justify-center gap-3 bg-default hover:bg-default/90 text-white border border-default hover:text-default hover:bg-white"
						>
							Entrar em contato
							<IoIosArrowDroprightCircle size={24} />
						</Button>

						<Button
							onClick={() => navigate("/projects")}
							className="px-6 h-12 flex items-center justify-center gap-3 border border-gray-600 hover:text-white hover:bg-bg_component hover:border-default"
							variant="outline"
						>
							Ver projetos
						</Button>
					</div>

					<div className="flex gap-4 items-center">
						<a href={socialMedia?.[1]?.link} target="_blank" className="text-gray-400 hover:text-default transition-colors">
							<IoLogoWhatsapp size={24} />
						</a>
						<a href={socialMedia?.[0].link} target="_blank" className="text-gray-400 hover:text-default transition-colors">
							<RiInstagramFill size={24} />
						</a>
						<a href={socialMedia?.[3].link} target="_blank" className="text-gray-400 hover:text-default transition-colors">
							<FaGithub size={24} />
						</a>
						<a href={socialMedia?.[2].link} target="_blank" className="text-gray-400 hover:text-default transition-colors">
							<FaLinkedin size={24} />
						</a>
						<a href={socialMedia?.[4].link} target="_blank" className="text-gray-400 hover:text-default transition-colors">
							<MdEmail size={26} />
						</a>
					</div>
				</div>

				<div className="flex justify-center items-center">
					<div className="relative">
						<div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-default opacity-70 blur-md"></div>
						<div className="p-1.5 rounded-full shadow-lg animate-rotateBorder border-4 border-default border-solid relative">
							<Avatar className="w-64 h-64 md:w-80 md:h-80">
								<AvatarImage src={image?.toString() ?? ""} alt="Foto de perfil" className="rounded-full" />
							</Avatar>
						</div>
					</div>
				</div>
			</div>

			{/* Tech stack icons */}
			<TooltipProvider>
				<div className="absolute bottom-8 left-0 right-0 z-10">
					<div
						className="
            flex justify-center gap-6 flex-wrap 
            max-w-3xl mx-auto px-4
            py-4 
          "
					>
						{techs.map(({ label, Icon }) => (
							<TechIcon key={label} label={label} Icon={Icon} />
						))}
					</div>
				</div>
			</TooltipProvider>
		</div>
	)
}
