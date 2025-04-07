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
    const [loading, setLoading] = useState(false)
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
    console.log(educations)

    const createEducation = useCreateEducationMutation({
        onSuccess: () => {
            setIsOpen(false)
            setLoading(false)
            queryClient.invalidateQueries(['get-educations'])
            setAlert({ title: 'Sucesso!', message: 'Formação criada com sucesso!', type: 'success' })
        },
        onError: () => {
            setLoading(false)
            setAlert({ title: 'Erro!', message: 'Erro ao criar a formação!', type: 'error' })
        },
    })

    const updateEducation = useUpdateEducationMutation({
        onSuccess: () => {
            setIsOpen(false)
            setLoading(false)
            queryClient.invalidateQueries(['get-educations'])
            setAlert({ title: 'Sucesso!', message: 'Formação atualizada com sucesso!', type: 'success' })
        },
        onError: () => {
            setLoading(false)
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

    return (
        <div className='flex flex-col justify-center items-center border-[1px] border-[#00BFFF] pt-[20px] pb-[20px] rounded-[10px] gap-[20px]'>
            <div className='flex gap-[20px]'>
                {educations &&
                    educations.map((education: EducationType, index: number) => (
                        <Card
                            key={index}
                            onClick={() => handleEditClick(education)}
                            className='bg-slate-950 w-[300px] h-[300px] border-[2px] rounded-[10px] border-[#00BFFF] p-[20px] flex justify-center items-center relative cursor-pointer transform hover:scale-105 transition-transform duration-300'
                        >
                            <FaEdit className='text-[30px] text-slate-950 absolute top-[-5px] right-[-5px] bg-[#00BFFF] p-[3px] rounded-[3px]' />
                            <CardTitle className='text-gray-300 text-2xl font-semibold'>{education.course}</CardTitle>
                        </Card>
                    ))}
                <Card
                    onClick={handleAddClick}
                    className='bg-slate-950 w-[300px] h-[300px] border-[2px] rounded-[10px] border-[#00BFFF] p-[20px] flex justify-center items-center relative cursor-pointer transform hover:scale-105 transition-transform duration-300'
                >
                    <IoIosAdd className='text-gray-300 text-[100px]' />
                </Card>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                    <div
                        className='bg-slate-900 rounded-lg p-6 min-w-[600px] mx-auto relative border-[2px] border-[#00BFFF]'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DialogClose asChild>
                            <IoIosClose size={35} className='text-[#00BFFF] absolute top-0 right-0 cursor-pointer' onClick={() => setIsOpen(false)} />
                        </DialogClose>
                        <DialogHeader>
                            <DialogTitle className='text-gray-100 text-center font-semibold text-[30px]'>
                                {selectedEducation ? 'Editar Formação' : 'Adicionar Formação'}
                            </DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                            <FormEducation selectedEducation={selectedEducation} handleSave={handleSave} loading={loading} />
                        </DialogDescription>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
