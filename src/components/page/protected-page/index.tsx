import { useState } from 'react'
import Header from '../header'
import Footer from '../footer'
import Home from '../../../pages/private/home'
import About from '../../../pages/private/about'
import Contact from '../../../pages/private/contact'
import Skills from '../../../pages/private/skill'
import Projects from '../../../pages/private/project'

export default function ProtectedPage() {
	const [section, setSection] = useState('body')

	const renderSection = () => {
		switch (section) {
			case 'projects':
				return <Projects />
			case 'skills':
				return <Skills />
			case 'contact':
				return <Contact />
			case 'about':
				return <About />
			default:
				return <Home />
		}
	}

	return (
		<div className='h-screen flex flex-col'>
			<Header setSection={setSection} />
			<div className='flex-grow'>{renderSection()}</div>
			<Footer />
		</div>
	)
}
