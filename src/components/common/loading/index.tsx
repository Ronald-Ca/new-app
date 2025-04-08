export default function LoadingSpinner() {
	return (
		<div
			className="flex items-center justify-center bg-slate-800"
			style={{ minHeight: 'calc(100vh - 78px)' }}
		>
			<div className="w-16 h-16 border-4 border-default border-dotted rounded-full animate-spin"></div>
		</div>
	)
}
