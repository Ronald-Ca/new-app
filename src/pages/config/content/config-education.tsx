import { Card, CardTitle } from '../../../components/ui/card'
import { DialogHeader } from '../../../components/ui/dialog'
import { useAlert } from '../../../contexts/alertContext'
import { useCreateEducationMutation, useGetEducationQuery, useUpdateEducationMutation } from '../../../queries/education'
import { EducationType } from '../../../services/education-service'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { IoIosAdd, IoIosClose } from 'react-icons/io'
import { useQueryClient } from '@tanstack/react-query'
import FormEducation from '@app/components/form/form-education'

export default function ConfigEducation() {
    const { setAlert } = useAlert()
    const queryClient = useQueryClient()
    const [isOpen, setIsOpen] = useState(false)
    const [selectedEducation, setSelectedEducation] = useState<EducationType | undefined>(undefined)

    const handleEditClick = (education: EducationType) => {
        setSelectedEducation(education)
        setIsOpen(true)
    }

    const handleAddClick = () => {
        setSelectedEducation(undefined)
        setIsOpen(true)
    }

    const { data: educations } = useGetEducationQuery()

    const createEducation = useCreateEducationMutation({
        onSuccess: () => {
            setIsOpen(false)
            queryClient.invalidateQueries(['get-education'])
            setAlert({ title: 'Sucesso!', message: 'Formação criada com sucesso!', type: 'success' })
        },
        onError: () => {
            setAlert({ title: 'Erro!', message: 'Erro ao criar a formação!', type: 'error' })
        },
    })

    const updateEducation = useUpdateEducationMutation({
        onSuccess: () => {
            setIsOpen(false)
            queryClient.invalidateQueries(['get-education'])
            setAlert({ title: 'Sucesso!', message: 'Formação atualizada com sucesso!', type: 'success' })
        },
        onError: () => {
            setAlert({ title: 'Erro!', message: 'Erro ao atualizar a formação!', type: 'error' })
        },
    })

    const handleSave = (newEducation: EducationType) => {
        if (selectedEducation) {
            updateEducation.mutate(newEducation)
        } else {
            createEducation.mutate(newEducation)
        }
        setIsOpen(false)
    }

    const isMutating = createEducation.isLoading || updateEducation.isLoading

    return (
        <div className='flex flex-col justify-center items-center border-2 border-default pt-5 pb-5 rounded-md gap-5'>
            <div className='flex gap-5'>
                {educations &&
                    educations.map((education: EducationType, index: number) => (
                        <Card
                            key={index}
                            onClick={() => handleEditClick(education)}
                            className='bg-slate-950 w-3w h-3h border-2 rounded-md border-default p-5 flex justify-center items-center relative cursor-pointer transform hover:scale-105 transition-transform duration-300'
                        >
                            <FaEdit size={30} className='text-slate-950 absolute -top-1 -right-1 bg-default p-1 rounded-sm' />
                            <CardTitle className='text-gray-300 text-2xl font-semibold'>{education.course}</CardTitle>
                        </Card>
                    ))}
                <Card
                    onClick={handleAddClick}
                    className='bg-slate-950 w-3w h-3h border-2 rounded-md border-default p-5 flex justify-center items-center relative cursor-pointer transform hover:scale-105 transition-transform duration-300'
                >
                    <IoIosAdd size={100} className='text-gray-300' />
                </Card>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                    <div
                        className='bg-slate-900 rounded-lg p-6 min-w-w6 mx-auto relative border-2 border-default w-5w'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DialogClose asChild>
                            <IoIosClose size={35} className='text-default absolute top-0 right-0 cursor-pointer' onClick={() => setIsOpen(false)} />
                        </DialogClose>
                        <DialogHeader>
                            <DialogTitle className='text-gray-100 text-center font-semibold text-2xl'>
                                {selectedEducation ? 'Editar Formação' : 'Adicionar Formação'}
                            </DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                            <FormEducation selectedEducation={selectedEducation} handleSave={handleSave} isSubmitting={isMutating} />
                        </DialogDescription>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
