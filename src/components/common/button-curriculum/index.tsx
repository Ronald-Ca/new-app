import { Button } from '../../../components/ui/button'
import CurriculumService from '../../../services/curriculum-service'
import { IoMdCodeDownload } from 'react-icons/io'

interface ButtonCurriculumProps {
	id?: string
}

export function ButtonCurriculum({ id }: ButtonCurriculumProps) {
	const curriculumService = new CurriculumService()

	const downloadCurriculum = async () => {
		if (id) {
			const base64 = await curriculumService.downloadCurriculum(id)
			const link = document.createElement('a')
			link.href = base64
			link.download = 'curriculo.pdf'
			link.click()
		}
	}

	return (
		<Button onClick={downloadCurriculum} className='w-[200px] hover:bg-[#00BFFF] hover:text-slate-900 flex gap-[5px] font-bold'>
			DOWNLOAD CV <IoMdCodeDownload size={25} />
		</Button>
	)
}
