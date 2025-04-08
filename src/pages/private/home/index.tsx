import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Avatar, AvatarImage } from '../../../components/ui/avatar';
import LoadingSpinner from '../../../components/common/loading';
import { useGetHomeQuery } from '../../../queries/home';
import ErrorComponent from '@app/components/common/error';

export default function Home() {
	const navigate = useNavigate();

	// Query to fetch home data.
	const { data: home, isLoading, isError } = useGetHomeQuery();

	if (isLoading) return <LoadingSpinner />;
	if (isError || !home) return <ErrorComponent />;

	// Destructuring the properties of the home object for better readability.
	const { title, role, description, image, imageBackground } = home;

	return (
		<div
			className="relative w-full min-h-full bg-cover bg-center flex items-center justify-center"
			style={{ backgroundImage: `url(${imageBackground})` }}
		>
			{/* Background opacity layer */}
			<div className="absolute inset-0 opacity-50 bg-bg_default" />
			{/* Main content */}
			<div className="relative z-10 flex items-center gap-80">
				<div className="flex flex-col justify-center ml-12">
					<h1 className="font-medium text-5xl text-gray-200">{title}</h1>
					<span className="text-default text-lg">{role}</span>
					<p className="text-xl text-gray-200 w-xch mt-5">{description}</p>
					<Button
						onClick={() => navigate('/contact')}
						className="w-52 h-12 mt-5 flex items-center justify-center gap-3 border border-gray-600 hover:text-default hover:bg-bg_component hover:border-default"
					>
						Entrar em contato
						<IoIosArrowDroprightCircle size={30} />
					</Button>
				</div>
				<div className="w-full flex justify-center items-center p-6">
					<div className="p-2 rounded-full shadow-lg animate-rotateBorder border-4 border-default border-solid">
						<Avatar className="w-5w h-5h">
							<AvatarImage src={image?.toString() ?? ''} alt="Foto de perfil" className="rounded-full" />
						</Avatar>
					</div>
				</div>
			</div>
		</div>
	);
}
