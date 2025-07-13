import ProtectedPage from '../components/page/protected-page'
import Login from '../pages/login'
import { Routes, Route } from 'react-router-dom'
import Thanks from '../pages/thanks'
import NotFound from '../pages/not-found';
import Home from '@app/pages/public/home'
import Config from '@app/pages/private'
import About from '@app/pages/public/about'
import Skills from '@app/pages/public/skill';
import Projects from '@app/pages/public/project';
import Contact from '@app/pages/public/contact';

export default function App() {
	return (
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
	)
}
