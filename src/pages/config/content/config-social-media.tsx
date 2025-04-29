
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
			queryClient.invalidateQueries(['get-social-media'])
			setAlert({ title: 'Sucesso!', message: 'Rede social cadastrada com sucesso!', type: 'success' })
		},
		onError: () => {
			setAlert({ title: 'Erro', message: 'Erro ao cadastrar rede social!', type: 'error' })
		},
	})

	const updateSocialMedia = useUpdateSocialMediaMutation({
		onSuccess: () => {
			setIsOpen(false)
			queryClient.invalidateQueries(['get-social-media'])
			setAlert({ title: 'Sucesso!', message: 'Rede social atualizada com sucesso!', type: 'success' })
		},
		onError: () => {
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

	const isMutating = createSocialMedia.isLoading || updateSocialMedia.isLoading

	return (
		<div className='flex flex-col justify-center items-center border-2 border-default pt-5 pb-5 rounded-xl gap-5'>
			<div className='flex flex-wrap justify-center items-center gap-5'>
				{socialMedia &&
					socialMedia.map((media: SocialMediaType, index: number) => (
						<Card
							key={index}
							onClick={() => handleEditClick(media)}
							className='bg-slate-950 w-2w h-2h border-2 rounded-xl border-default p-5 flex flex-col justify-center items-center relative cursor-pointer transform hover:scale-105 transition-transform duration-300'
						>
							<FaEdit className='text-3xl text-slate-950 absolute -top-1 -right-1 bg-default p-1 rounded-sm' />
							<CardTitle className='text-gray-300 text-2xl font-semibold mb-4'>{media.name}</CardTitle>
						</Card>
					))}
				<Card
					onClick={handleAddClick}
					className='bg-slate-950 w-2w h-2h border-2 rounded-xl border-default p-5 flex justify-center items-center relative cursor-pointer transform hover:scale-105 transition-transform duration-300'
				>
					<IoIosAdd className='text-gray-300 text-8xl' />
				</Card>
			</div>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
					<div
						className='bg-slate-900 rounded-lg p-6 w-4w mx-auto relative border-2 border-default'
						onClick={(e) => e.stopPropagation()}
					>
						<DialogClose asChild>
							<IoIosClose size={35} className='text-default absolute top-0 right-0 cursor-pointer' onClick={() => setIsOpen(false)} />
						</DialogClose>
						<DialogHeader>
							<DialogTitle className='text-gray-100 text-center font-semibold text-3xl mb-3'>
								{selectedMedia ? 'Editar Rede Social' : 'Adicionar Rede Social'}
							</DialogTitle>
						</DialogHeader>
						<FormSocialMedia selectedMedia={selectedMedia} handleSave={handleSave} isSubmitting={isMutating} />
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
