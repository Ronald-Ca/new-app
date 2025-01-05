
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
	const { setAlert } = useAlert()
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [, setSelectedFile] = useState<File | null>(null)

	const { data: home, isSuccess } = useGetHomeQuery()

	const formMethods = useForm<HomeType>({
		defaultValues: {
			image: null,
			title: '',
			role: '',
			description: '',
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
		fileInputRef?.current?.click()
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
			return
		} else {
			createHome.mutate(data)
		}
	}

	useEffect(() => {
		if (isSuccess && home) {
			if (home.image) {
				if (typeof home.image === 'string') {
					setImagePreview(home.image)
				}
			}

			formMethods.reset({
				image: null,
				title: home.title,
				role: home.role,
				description: home.description,
			})
		}
	}, [isSuccess, home, formMethods])

	return (
		<FormProvider {...formMethods}>
			<div className='min-h-full flex flex-col justify-center items-center'>
				<div className='flex flex-col justify-center items-center border-[1px] border-[#00BFFF] pt-[20px] pb-[20px] rounded-[10px] w-[600px]'>
					<div className='flex flex-col items-center gap-[10px] relative'>
						{imagePreview && <img src={imagePreview} alt='Preview' className='w-[250px] h-[250px] object-cover rounded-full' />}
						<div className='cursor-pointer absolute bottom-[10px] right-[50px] transform translate-x-1/2 translate-y-1/2 hover:scale-110 transition-transform duration-300 bg-slate-950 p-[10px] rounded-full'>
							<FaCamera className='text-[#00BFFF] text-[30px]' onClick={handleCameraClick} />
						</div>
						<Input type='file' className='hidden' onChange={handleImageChange} ref={fileInputRef} />
					</div>
					<div className='flex flex-col gap-[10px]'>
						<FormHome onSubmit={onSubmit} />
					</div>
				</div>
			</div>
		</FormProvider>
	)
}
