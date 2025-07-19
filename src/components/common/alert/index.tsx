import { useEffect, useState, useRef } from "react";
import { FaWindowClose } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { cn } from "@app/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@app/components/ui/alert";

type AlertType = "success" | "error" | "warning";

type AlertProps = {
	title: string;
	message: string;
	type: AlertType;
	duration?: number;
};

interface AlertConfig {
	borderColor: string;
	icon: JSX.Element;
	iconColor: string;
	titleColor: string;
	progressBarColor: string;
}

const ALERT_CONFIG: Record<AlertType, AlertConfig> = {
	success: {
		borderColor: "border-l-green-500",
		icon: <MdVerified size={20} />,
		iconColor: "text-green-500",
		titleColor: "text-green-700",
		progressBarColor: "bg-green-500",
	},
	error: {
		borderColor: "border-l-red-500",
		icon: <FaWindowClose size={20} />,
		iconColor: "text-red-500",
		titleColor: "text-red-700",
		progressBarColor: "bg-red-500",
	},
	warning: {
		borderColor: "border-l-yellow-500",
		icon: <MdVerified size={20} />,
		iconColor: "text-yellow-500",
		titleColor: "text-yellow-700",
		progressBarColor: "bg-yellow-500",
	},
};

const baseClasses = cn(
	"max-w-md fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg",
	"transform transition-all duration-300 ease-in-out",
	"bg-slate-950 border-l-4 border-t-default border-r-default border-b-default"
);

export default function CustomAlert({
	title,
	message,
	type,
	duration = 5000,
}: AlertProps) {
	const [visible, setVisible] = useState(false);
	const [progress, setProgress] = useState(100);
	const intervalRef = useRef<number>();
	const config = ALERT_CONFIG[type] ?? ALERT_CONFIG.success;

	useEffect(() => {
		setVisible(true);
		setProgress(100);

		const startTime = performance.now();

		intervalRef.current = window.setInterval(() => {
			const elapsed = performance.now() - startTime;
			const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
			setProgress(remaining);

			if (remaining <= 0 && intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		}, 16);

		const hideTimeout = window.setTimeout(() => {
			setVisible(false);
		}, duration);

		return () => {
			clearTimeout(hideTimeout);
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [title, message, type, duration]);

	if (!visible) return null;

	const visibilityClasses = visible
		? "translate-x-0 opacity-100"
		: "translate-x-full opacity-0";

	const alertClasses = cn(baseClasses, visibilityClasses, config.borderColor);

	return (
		<Alert className={alertClasses} role="alert" aria-live="assertive">
			<div className="flex items-start gap-3 relative">
				<div className={cn("flex-shrink-0 mt-0.5", config.iconColor)}>
					{config.icon}
				</div>

				<div className="flex-1">
					<AlertTitle className={cn("font-semibold mb-1", config.titleColor)}>
						{title}
					</AlertTitle>
					<AlertDescription className="text-white">
						{message}
					</AlertDescription>
				</div>

				<button
					onClick={() => setVisible(false)}
					className="text-white hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 flex-shrink-0"
					aria-label="Close alert"
				>
					<IoClose size={18} />
				</button>
			</div>

			<div className="h-1 w-full bg-gray-200 mt-3 rounded-full overflow-hidden">
				<div
					className={cn("h-full transition-all ease-linear", config.progressBarColor)}
					style={{ width: `${progress}%` }}
				/>
			</div>
		</Alert>
	);
}
