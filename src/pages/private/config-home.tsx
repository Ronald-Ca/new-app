import { FormHome } from '@app/components/form/form-home'
import { Input } from '@app/components/ui/input'
import { useAlert } from '@app/contexts/alert-context'
import { useCreateHomeMutation, useGetHomeQuery, useUpdateHomeMutation } from '@app/queries/home'
import { HomeType } from '@app/services/home-service'
import { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FaCamera } from 'react-icons/fa'
import { IoMdColorPalette } from 'react-icons/io'
import { Card, CardContent } from '@app/components/ui/card'
import { ConfigHomeSkeleton } from '@app/components/common/skeleton/config-home-skeleton'

export default function ConfigHome() {
	const [imagePreview, setImagePreview] = useState("")
	const [bgImagePreview, setBgImagePreview] = useState("")
	const { setAlert } = useAlert()
	const fileInputRef = useRef<HTMLInputElement>(null)
	const bgFileInputRef = useRef<HTMLInputElement>(null)
	const [, setSelectedFile] = useState<File | null>(null)
	const [, setSelectedBgFile] = useState<File | null>(null)

	const { data: home, isSuccess, isLoading } = useGetHomeQuery()

	const formMethods = useForm<HomeType>({
		defaultValues: {
			image: null,
			title: "",
			role: "",
			description: "",
			colorBackground: "#0f172a",
			imageBackground: null,
		},
	})

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const imageURL = URL.createObjectURL(file)
			setImagePreview(imageURL)
			setSelectedFile(file)
			formMethods.setValue("image", file)
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
			formMethods.setValue("imageBackground", file)
		}
	}

	const handleBgImageClick = () => {
		bgFileInputRef.current?.click()
	}

	const createHome = useCreateHomeMutation({
		onSuccess: () => {
			setAlert({ title: "Sucesso!", message: "Dados da Home Page criados com sucesso!", type: "success" })
		},
		onError: () => {
			setAlert({ title: "Erro ao criar Home!", message: "Erro ao criar os dados da Home Page!", type: "error" })
		},
	})

	const updateHome = useUpdateHomeMutation({
		onSuccess: () => {
			setAlert({ title: "Sucesso!", message: "Dados da Home Page atualizados com sucesso!", type: "success" })
		},
		onError: () => {
			setAlert({ title: "Erro ao atualizar Home!", message: "Erro ao atualizar os dados da Home Page!", type: "error" })
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
			if (home.image && typeof home.image === "string") {
				setImagePreview(home.image)
			}
			if (home.imageBackground && typeof home.imageBackground === "string") {
				setBgImagePreview(home.imageBackground)
			}
			formMethods.reset({
				image: null,
				title: home.title,
				role: home.role,
				description: home.description,
				colorBackground: home.colorBackground || "#0f172a",
				imageBackground: null,
			})
		}
	}, [isSuccess, home, formMethods])

	const isMutating = createHome.isLoading || updateHome.isLoading

	if (isLoading) return <ConfigHomeSkeleton />

	return (
		<FormProvider {...formMethods}>
			<div className="min-h-full flex flex-col items-center">
				<div className="w-full max-w-3xl">
					<h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
						<span className="bg-cyan-500/10 p-2 rounded-md">
							<IoMdColorPalette className="text-cyan-400" size={24} />
						</span>
						Configuração da Página Inicial
					</h2>

					<Card className="bg-[#070b14] border border-[#1e2a4a] shadow-lg overflow-hidden">
						<CardContent className="p-6">
							<div className="flex flex-col gap-8">
								<div className="flex flex-col items-center">
									<div className="relative group">
										{imagePreview ? (
											<div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-lg shadow-cyan-500/20">
												<img
													src={imagePreview || "/placeholder.svg"}
													alt="Preview"
													className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
												/>
											</div>
										) : (
											<div className="w-48 h-48 flex items-center justify-center bg-gradient-to-br from-[#111827] to-[#0c1a2c] rounded-full border-4 border-dashed border-[#1e2a4a]">
												<span className="text-gray-400 text-sm">Sem imagem de perfil</span>
											</div>
										)}
										<button
											onClick={handleCameraClick}
											className="absolute bottom-2 right-2 bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#070b14]"
										>
											<FaCamera size={18} />
										</button>
										<Input
											type="file"
											className="hidden"
											onChange={handleImageChange}
											ref={fileInputRef}
											accept="image/*"
										/>
									</div>
									<p className="mt-3 text-gray-400 text-sm">
										Clique no ícone da câmera para alterar sua foto de perfil
									</p>
								</div>

								<div className="w-full">
									<h3 className="text-gray-300 font-medium mb-2 flex items-center gap-2">
										<span className="h-1 w-1 rounded-full bg-cyan-400"></span>
										Imagem de Fundo
									</h3>
									<div
										className="relative w-full h-56 rounded-lg overflow-hidden cursor-pointer group border border-[#1e2a4a] shadow-md"
										onClick={handleBgImageClick}
									>
										{bgImagePreview ? (
											<div className="relative w-full h-full">
												<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
												<img
													src={bgImagePreview || "/placeholder.svg"}
													alt="Background Preview"
													className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
												/>
											</div>
										) : (
											<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#111827] to-[#0c1a2c]">
												<span className="text-gray-400 text-sm">Clique para adicionar uma imagem de fundo</span>
											</div>
										)}
										<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 z-20">
											<div className="bg-cyan-500 text-white p-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110">
												<FaCamera size={20} />
											</div>
										</div>
										<Input
											type="file"
											className="hidden"
											onChange={handleBgImageChange}
											ref={bgFileInputRef}
											accept="image/*"
										/>
									</div>
									<p className="mt-2 text-gray-400 text-sm">
										Recomendação: use uma imagem com boa resolução (1920x1080 ou maior)
									</p>
								</div>

								<div className="w-full">
									<h3 className="text-gray-300 font-medium mb-4 flex items-center gap-2">
										<span className="h-1 w-1 rounded-full bg-cyan-400"></span>
										Informações Pessoais
									</h3>
									<div className="bg-[#0c1220] rounded-lg p-5 border border-[#1e2a4a]">
										<FormHome onSubmit={onSubmit} isSubmitting={isMutating} />
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</FormProvider>
	)
}