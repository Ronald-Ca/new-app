import { useAlert } from '../../../contexts/alertContext'
import { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FaCamera } from 'react-icons/fa'
import { Input } from '../../../components/ui/input'
import { FormAbout } from '../../../components/form/form-about'
import { useCreateAboutMutation, useGetAboutQuery, useUpdateAboutMutation } from '../../../queries/about'

interface About {
	image: File | null
	name: string
	age: number
	city: string
	state: string
}

export default function ConfigAbout() {
	const { setAlert } = useAlert()
	const [imagePreview, setImagePreview] = useState('')
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [, setSelectedFile] = useState<File | null>(null)

	const { data: about, isSuccess } = useGetAboutQuery()

	const formMethods = useForm<About>({
		defaultValues: {
			image: null,
			name: '',
			age: 0,
			city: '',
			state: '',
		},
	})

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const imageURL = URL.createObjectURL(file)
			setImagePreview(imageURL)
			setSelectedFile(file)
			formMethods.setValue('image', file)
		}
	}

	const handleCameraClick = () => {
		fileInputRef.current?.click()
	}

	const createAbout = useCreateAboutMutation({
		onSuccess: () => {
			setAlert({ title: 'Sucesso!', message: 'Dados da About Page criados com sucesso!', type: 'success' })
		},
		onError: () => {
			setAlert({ title: 'Erro ao criar About!', message: 'Erro ao criar os dados da About Page!', type: 'error' })
		},
	})

	const updateAbout = useUpdateAboutMutation({
		onSuccess: () => {
			setAlert({ title: 'Sucesso!', message: 'Dados da About Page atualizados com sucesso!', type: 'success' })
		},
		onError: () => {
			setAlert({ title: 'Erro ao atualizar About!', message: 'Erro ao atualizar os dados da About Page!', type: 'error' })
		},
	})

	const onSubmit = (data: About) => {
		if (about) {
			const newData = { ...data, id: about.id }
			updateAbout.mutate(newData)
		} else {
			createAbout.mutate(data)
		}
	}

	useEffect(() => {
		if (isSuccess && about) {
			if (about.image && typeof about.image === 'string') {
				setImagePreview(about.image)
			} else {
				setImagePreview('')
			}

			formMethods.reset({
				image: null,
				name: about.name,
				age: about.age,
				city: about.city,
				state: about.state,
			})
		}
	}, [isSuccess, about, formMethods])

	const isMutating = createAbout.isLoading || updateAbout.isLoading

	return (
		<FormProvider {...formMethods}>
			<div className='flex flex-col justify-center items-center h-screen'>
				<div className='flex flex-col justify-center items-center border-2 border-default pt-5 pb-5 rounded-xl gap-5 w-6w'>
					<div className='flex flex-col gap-10 items-center'>

						{/* Seção de Imagem */}
						<div className='flex flex-col items-center gap-3 relative'>
							{imagePreview ? (
								<img
									src={imagePreview}
									alt='Preview'
									className='w-64 h-64 object-cover rounded-full'
								/>
							) : (
								<div className='w-64 h-64 flex items-center justify-center bg-gray-200 rounded-full'>
									<span className='text-gray-500'>Sem foto</span>
								</div>
							)}
							<div
								className='bg-slate-950 cursor-pointer absolute bottom-3 right-14 p-3 transform translate-x-1/2 translate-y-1/2 hover:scale-110 transition-transform duration-300 rounded-full'
								onClick={handleCameraClick}
							>
								<FaCamera className='text-default' size={30} />
							</div>
							<Input type='file' className='hidden' onChange={handleImageChange} ref={fileInputRef} />
						</div>
						
						{/* Formulário de Dados */}
						<FormAbout onSubmit={onSubmit} isSubmitting={isMutating} />
					</div>
				</div>
			</div>
		</FormProvider>
	)
}
