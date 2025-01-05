export default function LoadingSpinner() {
	return (
		<div className='flex items-center justify-center min-h-screen bg-slate-800'>
			<div className='w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin'></div>
		</div>
	)
}
