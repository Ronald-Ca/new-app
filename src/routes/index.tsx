import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

const ProtectedPage = lazy(() => import('../components/page/protected-page'))
const Login = lazy(() => import('../pages/login'))
const Thanks = lazy(() => import('../pages/thanks'))
const NotFound = lazy(() => import('../pages/not-found'))
const Home = lazy(() => import('@app/pages/public/home'))
const Config = lazy(() => import('@app/pages/private'))
const About = lazy(() => import('@app/pages/public/about'))
const Skills = lazy(() => import('@app/pages/public/skill'))
const Projects = lazy(() => import('@app/pages/public/project'))
const Contact = lazy(() => import('@app/pages/public/contact'))

const LoadingFallback = lazy(() => import('../components/common/loading'))

export default function App() {
	return (
		<Suspense fallback={<LoadingFallback />}>
			<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/config" element={<Config />} />
			<Route path="/thanks" element={<Thanks />} />
			<Route path="/not-found" element={<NotFound />} />
			<Route path="*" element={<NotFound />} />

			<Route path="/" element={<ProtectedPage />}>
				<Route index element={<Home />} />
				<Route path="about" element={<About />} />
				<Route path="skills" element={<Skills />} />
				<Route path="projects" element={<Projects />} />
				<Route path="contact" element={<Contact />} />
			</Route>
			</Routes>
		</Suspense>
	)
}
