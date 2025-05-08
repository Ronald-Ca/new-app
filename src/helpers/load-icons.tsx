import { ReactElement } from 'react'
import * as faIcons from 'react-icons/fa'
import * as ioIcons from 'react-icons/io5'
import * as siIcons from 'react-icons/si'
import * as diIcons from 'react-icons/di'
import * as bsIcons from 'react-icons/bs'
import * as riIcons from 'react-icons/ri'
import * as mdIcons from 'react-icons/md'
import * as aiIcons from 'react-icons/ai'
import * as biIcons from 'react-icons/bi'
import * as ciIcons from 'react-icons/ci'
import * as cgIcons from 'react-icons/cg'
import * as fiIcons from 'react-icons/fi'
import * as fcIcons from 'react-icons/fc'
import * as fa6Icons from 'react-icons/fa6'
import * as giIcons from 'react-icons/gi'
import * as goIcons from 'react-icons/go'
import * as grIcons from 'react-icons/gr'
import * as hiIcons from 'react-icons/hi'
import * as hi2Icons from 'react-icons/hi2'
import * as imIcons from 'react-icons/im'
import * as liaIcons from 'react-icons/lia'
import * as io5Icons from 'react-icons/io5'
import * as luIcons from 'react-icons/lu'
import * as piIcons from 'react-icons/pi'
import * as rxIcons from 'react-icons/rx'
import * as slIcons from 'react-icons/sl'
import * as tbIcons from 'react-icons/tb'
import * as tfiIcons from 'react-icons/tfi'
import * as tiIcons from 'react-icons/ti'
import * as vscIcons from 'react-icons/vsc'
import * as wiIcons from 'react-icons/wi'

const iconSets = {
	...faIcons,
	...ioIcons,
	...siIcons,
	...diIcons,
	...bsIcons,
	...riIcons,
	...mdIcons,
	...aiIcons,
	...biIcons,
	...ciIcons,
	...cgIcons,
	...fiIcons,
	...fcIcons,
	...fa6Icons,
	...giIcons,
	...goIcons,
	...grIcons,
	...hiIcons,
	...hi2Icons,
	...imIcons,
	...liaIcons,
	...io5Icons,
	...luIcons,
	...piIcons,
	...rxIcons,
	...slIcons,
	...tbIcons,
	...tfiIcons,
	...tiIcons,
	...vscIcons,
	...wiIcons,
}

export async function loadIcons(iconName: string, color: string): Promise<ReactElement> {
	const Icon = iconSets[iconName as keyof typeof iconSets]

	if (!Icon) {
		throw new Error(`Icon ${iconName} not found`)
	}

	return <Icon size={60} style={{ color }} />
}
