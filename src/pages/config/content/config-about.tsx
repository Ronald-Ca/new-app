import { useAlert } from '../../../contexts/alertContext'
import { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FaCamera } from 'react-icons/fa'
import { Input } from '../../../components/ui/input'
import { FormAbout } from '../../../components/form/form-about'
import { useCreateAboutMutation, useGetAboutQuery, useUpdateAboutMutation } from '../../../queries/about'

interface About {
	image: File | null
	person: string
	address: string
	education: string
}

export default function ConfigAbout() {
	const { setAlert } = useAlert()
	const [imagePreview, setImagePreview] = useState('https://avatars.githubusercontent.com/u/104284345?v=4')
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [, setSelectedFile] = useState<File | null>(null)

	const { data: about, isSuccess } = useGetAboutQuery()

	const formMethods = useForm<About>({
		defaultValues: {
			image: null,
			person: '',
			address: '',
			education: '',
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
			setAlert({ title: 'Sucesso!', message: 'Dados da Home Page atualizados com sucesso!', type: 'success' })
		},
		onError: () => {
			setAlert({ title: 'Erro ao atualizar Home!', message: 'Erro ao atualizar os dados da Home Page!', type: 'error' })
		},
	})

	const onSubmit = (data: About) => {
		if (about) {
			const newData = { ...data, id: about.id }
			updateAbout.mutate(newData)
			return
		} else {
			createAbout.mutate(data)
		}
	}

	useEffect(() => {
		if (isSuccess && about) {
			if (about.image) {
				if (typeof about.image === 'string') {
					setImagePreview(about.image)
				}
			}

			formMethods.reset({
				image: null,
				person: about.person,
				address: about.address,
				education: about.education,
			})
		}
	}, [isSuccess, about, formMethods])

	return (
		<FormProvider {...formMethods}>
			<div className='flex flex-col justify-center items-center border-[1px] border-[#00BFFF] pt-[20px] pb-[20px] rounded-[10px] gap-[20px]'>
				<div className='flex gap-[50px] items-center'>
					<div className='flex flex-col items-center gap-[10px] relative'>
						{imagePreview && <img src={imagePreview} alt='Preview' className='w-[250px] h-[250px] object-cover rounded-full' />}
						<div className='cursor-pointer absolute bottom-[10px] right-[50px] transform translate-x-1/2 translate-y-1/2 hover:scale-110 transition-transform duration-300 bg-slate-950 p-[10px] rounded-full'>
							<FaCamera className='text-[#00BFFF] text-[30px]' onClick={handleCameraClick} />
						</div>
						<Input type='file' className='hidden' onChange={handleImageChange} ref={fileInputRef} />
					</div>
					<div className='flex flex-col gap-[10px]'>
						<FormAbout onSubmit={onSubmit} />
					</div>
				</div>
			</div>
		</FormProvider>
	)
}
