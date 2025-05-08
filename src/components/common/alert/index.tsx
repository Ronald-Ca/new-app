import { useEffect, useState, useRef } from "react"
import { FaWindowClose } from "react-icons/fa"
import { MdVerified } from "react-icons/md"
import { IoClose } from "react-icons/io5"
import { cn } from "@app/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@app/components/ui/alert"

type AlertProps = {
	title: string
	message: string
	type: "success" | "error"
	duration?: number
}

export default function CustomAlert({ title, message, type, duration = 5000 }: AlertProps) {
	const [visible, setVisible] = useState(false)
	const [progress, setProgress] = useState(100)
	const progressInterval = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		setVisible(true)
		setProgress(100)

		const startTime = Date.now()
		progressInterval.current = setInterval(() => {
			const elapsed = Date.now() - startTime
			const remaining = Math.max(0, 100 - (elapsed / duration) * 100)
			setProgress(remaining)

			if (remaining <= 0) {
				clearInterval(progressInterval.current as NodeJS.Timeout)
			}
		}, 16)

		const timer = setTimeout(() => {
			setVisible(false)
		}, duration)

		return () => {
			clearTimeout(timer)
			if (progressInterval.current) {
				clearInterval(progressInterval.current)
			}
		}
	}, [title, message, type, duration])

	if (!visible) return null

	const alertClasses = cn(
		"max-w-md fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg",
		"transform transition-all duration-300 ease-in-out",
		visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
		type === "error" ? "bg-white border-l-4 border-l-red-500" : "bg-white border-l-4 border-l-green-500",
	)

	const iconColor = type === "error" ? "text-red-500" : "text-green-500"
	const titleColor = type === "error" ? "text-red-700" : "text-green-700"
	const messageColor = "text-gray-700"

	return (
		<Alert className={alertClasses} role="alert" aria-live="assertive">
			<div className="flex items-start gap-3 relative">
				<div className={cn("flex-shrink-0 mt-0.5", iconColor)}>
					{type === "error" ? <FaWindowClose size={20} /> : <MdVerified size={20} />}
				</div>

				<div className="flex-1">
					<AlertTitle className={cn("font-semibold mb-1", titleColor)}>{title}</AlertTitle>
					<AlertDescription className={messageColor}>{message}</AlertDescription>
				</div>

				<button
					onClick={() => setVisible(false)}
					className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 flex-shrink-0"
					aria-label="Close alert"
				>
					<IoClose size={18} />
				</button>
			</div>

			<div className="h-1 w-full bg-gray-200 mt-3 rounded-full overflow-hidden">
				<div
					className={cn("h-full transition-all ease-linear", type === "error" ? "bg-red-500" : "bg-green-500")}
					style={{ width: `${progress}%` }}
				/>
			</div>
		</Alert>
	)
}
