import { FormHome } from '../../../components/form/form-home'
import { Input } from '../../../components/ui/input'
import { useAlert } from '../../../contexts/alertContext'
import { useCreateHomeMutation, useGetHomeQuery, useUpdateHomeMutation } from '../../../queries/home'
import { HomeType } from '../../../services/home-service'
import { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FaCamera } from 'react-icons/fa'

export default function ConfigHome() {
	const [imagePreview, setImagePreview] = useState('')
	const [bgImagePreview, setBgImagePreview] = useState('')
	const { setAlert } = useAlert()
	const fileInputRef = useRef<HTMLInputElement>(null)
	const bgFileInputRef = useRef<HTMLInputElement>(null)
	const [, setSelectedFile] = useState<File | null>(null)
	const [, setSelectedBgFile] = useState<File | null>(null)

	const { data: home, isSuccess } = useGetHomeQuery()

	const formMethods = useForm<HomeType>({
		defaultValues: {
			image: null,
			title: '',
			role: '',
			description: '',
			colorBackground: '',
			imageBackground: null,
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

	const handleBgImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const imageURL = URL.createObjectURL(file)
			setBgImagePreview(imageURL)
			setSelectedBgFile(file)
			formMethods.setValue('imageBackground', file)
		}
	}

	const handleBgImageClick = () => {
		bgFileInputRef.current?.click()
	}

	const createHome = useCreateHomeMutation({
		onSuccess: () => {
			setAlert({ title: 'Sucesso!', message: 'Dados da Home Page criados com sucesso!', type: 'success' })
		},
		onError: () => {
			setAlert({ title: 'Erro ao criar Home!', message: 'Erro ao criar os dados da Home Page!', type: 'error' })
		},
	})

	const updateHome = useUpdateHomeMutation({
		onSuccess: () => {
			setAlert({ title: 'Sucesso!', message: 'Dados da Home Page atualizados com sucesso!', type: 'success' })
		},
		onError: () => {
			setAlert({ title: 'Erro ao atualizar Home!', message: 'Erro ao atualizar os dados da Home Page!', type: 'error' })
		},
	})

	const onSubmit = (data: HomeType) => {
		if (home) {
			const newData = { ...data, id: home.id }
			updateHome.mutate(newData)
		} else {
			createHome.mutate(data)
		}
	}

	useEffect(() => {
		if (isSuccess && home) {
			if (home.image && typeof home.image === 'string') {
				setImagePreview(home.image)
			}
			if (home.imageBackground && typeof home.imageBackground === 'string') {
				setBgImagePreview(home.imageBackground)
			}
			formMethods.reset({
				image: null,
				title: home.title,
				role: home.role,
				description: home.description,
				colorBackground: home.colorBackground || '',
				imageBackground: null,
			})
		}
	}, [isSuccess, home, formMethods])

	const isMutating = createHome.isLoading || updateHome.isLoading

	return (
		<FormProvider {...formMethods}>
			<div className='min-h-full flex flex-col justify-center items-center'>
				<div className='flex flex-col justify-center items-center border-[1px] border-[#00BFFF] pt-5 pb-5 pr-10 pl-10 rounded-[10px] w-[600px]'>

					{/* Imagem principal */}
					<div className='flex flex-col items-center gap-[10px] relative'>
						{imagePreview ? (
							<img src={imagePreview} alt='Preview' className='w-[250px] h-[250px] object-cover rounded-full' />
						) : (
							<div className='w-[250px] h-[250px] flex items-center justify-center bg-gray-700 rounded-full'>
								<span className='text-gray-50'>Sem imagem</span>
							</div>
						)}
						<div className='cursor-pointer absolute bottom-[10px] right-[50px] transform translate-x-1/2 translate-y-1/2 hover:scale-110 transition-transform duration-300 bg-slate-950 p-[10px] rounded-full'>
							<FaCamera className='text-[#00BFFF] text-[30px]' onClick={handleCameraClick} />
						</div>
						<Input type='file' className='hidden' onChange={handleImageChange} ref={fileInputRef} />
					</div>

					{/* Seção de background */}
					<div className='mt-4 w-full'>
						<div
							className='relative w-full h-[250px] border border-[#00BFFF] rounded-[8px] flex justify-center items-center cursor-pointer'
							onClick={handleBgImageClick}
						>
							{bgImagePreview ? (
								<img
									src={bgImagePreview}
									alt='Background Preview'
									className='w-full h-full object-cover rounded-[8px]'
								/>
							) : (
								<span className='text-gray-50'>Pré-visualização do background</span>
							)}
							<div className='absolute top-2 right-2 cursor-pointer hover:scale-110 transition-transform duration-300 bg-slate-950 p-[5px] rounded-full'>
								<FaCamera className='text-[#00BFFF] text-[20px]' />
							</div>
							<Input type='file' className='hidden' onChange={handleBgImageChange} ref={bgFileInputRef} />
						</div>
					</div>

					{/* Formulário */}
					<div className='flex flex-col gap-[10px] mt-4 w-full'>
						<FormHome onSubmit={onSubmit} isSubmitting={isMutating} />
					</div>
				</div>
			</div>
		</FormProvider>
	)
}
