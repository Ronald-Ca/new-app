import ProtectedPage from '../components/page/protected-page'
import Config from '../pages/config'
import Login from '../pages/login'
import About from '../pages/private/about'
import Contact from '../pages/private/contact'
import Projects from '../pages/private/project'
import Skills from '../pages/private/skill'
import { Routes, Route } from 'react-router-dom'


export default function App() {
	return (
		<Routes>
			<Route path='/' element={<ProtectedPage />} />
			<Route path='/about' element={<About />} />
			<Route path='/skills' element={<Skills />} />
			<Route path='/projects' element={<Projects />} />
			<Route path='/contact' element={<Contact />} />
			<Route path='/login' element={<Login />} />
			<Route path='/config' element={<Config />} />
		</Routes>
	)
}
