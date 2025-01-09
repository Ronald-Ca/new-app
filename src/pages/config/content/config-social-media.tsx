
import FormSocialMedia from '../../../components/form/form-social-media'
import { Card, CardTitle } from '../../../components/ui/card'
import { DialogHeader } from '../../../components/ui/dialog'
import { useAlert } from '../../../contexts/alertContext'
import { useCreateSocialMediaMutation, useGetSocialMediaQuery, useUpdateSocialMediaMutation } from '../../../queries/social-media'
import { SocialMediaType } from '../../../services/social-media-service'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { IoIosAdd, IoIosClose } from 'react-icons/io'
import { useQueryClient } from '@tanstack/react-query'

export default function ConfigSocialMedia() {
	const { setAlert } = useAlert()
	const queryClient = useQueryClient()
	const [loading, setLoading] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [selectedMedia, setSelectedMedia] = useState<SocialMediaType | null>(null)

	const handleEditClick = (media: SocialMediaType) => {
		setSelectedMedia(media)
		setIsOpen(true)
	}

	const handleAddClick = () => {
		setSelectedMedia(null)
		setIsOpen(true)
	}

	const { data: socialMedia } = useGetSocialMediaQuery()

	const createSocialMedia = useCreateSocialMediaMutation({
		onSuccess: () => {
			setIsOpen(false)
			setLoading(false)
			queryClient.invalidateQueries(['get-social-media'])
			setAlert({ title: 'Sucesso!', message: 'Rede social cadastrada com sucesso!', type: 'success' })
		},
		onError: () => {
			setLoading(false)
			setAlert({ title: 'Erro', message: 'Erro ao cadastrar rede social!', type: 'error' })
		},
	})

	const updateSocialMedia = useUpdateSocialMediaMutation({
		onSuccess: () => {
			setIsOpen(false)
			setLoading(false)
			queryClient.invalidateQueries(['get-social-media'])
			setAlert({ title: 'Sucesso!', message: 'Rede social atualizada com sucesso!', type: 'success' })
		},
		onError: () => {
			setLoading(false)
			setAlert({ title: 'Erro', message: 'Erro ao atualizar rede social!', type: 'error' })
		},
	})

	const handleSave = (newMedia: SocialMediaType) => {
		if (selectedMedia) {
			updateSocialMedia.mutate(newMedia)
		} else {
			createSocialMedia.mutate(newMedia)
		}
	}

	return (
		<div className='flex flex-col justify-center items-center border-[1px] border-[#00BFFF] pt-[20px] pb-[20px] rounded-[10px] gap-[20px]'>
			<div className='flex flex-wrap justify-center items-center gap-[20px]'>
				{socialMedia &&
					socialMedia.map((media: SocialMediaType, index: number) => (
						<Card
							key={index}
							onClick={() => handleEditClick(media)}
							className='bg-slate-950 w-[200px] h-[200px] border-[2px] rounded-[10px] border-[#00BFFF] p-[20px] flex flex-col justify-center items-center relative cursor-pointer transform hover:scale-105 transition-transform duration-300'
						>
							<FaEdit className='text-[30px] text-slate-950 absolute top-[-5px] right-[-5px] bg-[#00BFFF] p-[3px] rounded-[3px]' />
							<CardTitle className='text-gray-300 text-2xl font-semibold mb-4'>{media.name}</CardTitle>
						</Card>
					))}
				<Card
					onClick={handleAddClick}
					className='bg-slate-950 w-[200px] h-[200px] border-[2px] rounded-[10px] border-[#00BFFF] p-[20px] flex justify-center items-center relative cursor-pointer transform hover:scale-105 transition-transform duration-300'
				>
					<IoIosAdd className='text-gray-300 text-[100px]' />
				</Card>
			</div>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
					<div
						className='bg-slate-900 rounded-lg p-6 min-w-[400px] mx-auto relative border-[2px] border-[#00BFFF]'
						onClick={(e) => e.stopPropagation()}
					>
						<DialogClose asChild>
							<IoIosClose size={35} className='text-[#00BFFF] absolute top-0 right-0 cursor-pointer' onClick={() => setIsOpen(false)} />
						</DialogClose>
						<DialogHeader>
							<DialogTitle className='text-gray-100 text-center font-semibold text-[30px]'>
								{selectedMedia ? 'Editar Habilidade' : 'Adicionar Habilidade'}
							</DialogTitle>
						</DialogHeader>
						<FormSocialMedia selectedMedia={selectedMedia} handleSave={handleSave} loading={loading} />
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
