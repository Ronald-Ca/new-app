import { useEffect, useState } from 'react'
import { FaWindowClose } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import { Alert, AlertDescription, AlertTitle } from '../../../components/ui/alert'

type AlertProps = {
	title: string
	message: string
	type: 'success' | 'error'
	duration?: number
}

export default function CustomAlert({ title, message, type, duration = 5000 }: AlertProps) {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		setVisible(true)
		const timer = setTimeout(() => {
			setVisible(false)
		}, duration)

		return () => clearTimeout(timer)
	}, [title, message, type, duration])

	if (!visible) return null

	return (
		<Alert
			className={`max-w-[400px] fixed top-5 right-[10px] z-50 p-2 rounded shadow bg-slate-900 ${type === 'error' ? 'border-red-500' : 'border-green-500'} border-[1px]`}
		>
			<div className='flex items-center gap-[10px] relative'>
				<IoClose className='cursor-pointer absolute top-[2px] right-[2px]' color='red' onClick={() => setVisible(false)} />
				{type === 'error' ? <FaWindowClose size={20} color='red' /> : <MdVerified size={20} color='green' />}
				<div>
					<AlertTitle className={'text-[#fff]'}>{title}</AlertTitle>
					<AlertDescription className={'text-[#fff]'}>{message}</AlertDescription>
				</div>
			</div>
		</Alert>
	)
}
