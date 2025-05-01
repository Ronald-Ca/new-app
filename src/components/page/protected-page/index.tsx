import { Outlet } from 'react-router-dom'
import Header from '../header'
import Footer from '../footer'

export default function ProtectedPage() {
	return (
		<div className="h-screen flex flex-col">
			<Header />
			<main className="flex-grow">
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}
