import { FormProvider, useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { states } from '@app/utils/states'
import { useEffect } from 'react'
import { EducationType } from '@app/services/education-service'
import { FaSpinner } from 'react-icons/fa'
import { years } from '@app/utils/moths-and-years'
import { modality } from '@app/utils/modality'

interface FormEducationProps {
    selectedEducation?: EducationType
    handleSave: (data: EducationType) => void
    isSubmitting?: boolean
}

interface EducationFormValues {
    course: string
    institution: string
    yearInit: string
    yearFinal?: string
    city?: string
    state?: string
    modality?: string
    id?: string
}

export default function FormEducation({ selectedEducation, handleSave, isSubmitting }: FormEducationProps) {
    const form = useForm<EducationFormValues>({
        defaultValues: {
            course: '',
            institution: '',
            yearInit: '',
            yearFinal: '',
            city: '',
            state: '',
            modality: '',
            id: '',
        },
    })

    const { reset, handleSubmit } = form

    useEffect(() => {
        const defaultFormValues: EducationFormValues = {
            course: selectedEducation?.course || '',
            institution: selectedEducation?.institution || '',
            yearInit: selectedEducation?.yearInit || '',
            yearFinal: selectedEducation?.yearFinal || '',
            city: selectedEducation?.city || '',
            state: selectedEducation?.state || '',
            modality: selectedEducation?.modality || '',
            id: selectedEducation?.id,
        }

        reset(defaultFormValues)
    }, [selectedEducation, reset])

    const onSubmit = (data: EducationFormValues) => {
        handleSave(data)
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-white">
                <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Curso:</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Nome do curso" className="bg-slate-950 text-gray-50" />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="institution"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instituição:</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Nome da instituição" className="bg-slate-950 text-gray-50" />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="flex gap-3">
                    <FormField
                        control={form.control}
                        name="yearInit"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Ano de Início:</FormLabel>
                                <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full text-white bg-slate-950">
                                            <SelectValue placeholder="Selecione o Ano" />
                                        </SelectTrigger>
                                        <SelectContent className='bg-slate-950'>
                                            {years.map((year) => (
                                                <SelectItem className='bg-slate-950 text-white' key={year.year} value={year.year.toString()}>
                                                    {year.year}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="yearFinal"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Ano de Conclusão:</FormLabel>
                                <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full text-white bg-slate-950">
                                            <SelectValue placeholder="Selecione o Ano" />
                                        </SelectTrigger>
                                        <SelectContent className='bg-slate-950'>
                                            {years.map((year) => (
                                                <SelectItem className='bg-slate-950 text-white' key={year.year} value={year.year.toString()}>
                                                    {year.year}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-3">
                    <FormField
                        control={form.control}
                        name="modality"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Modalidade:</FormLabel>
                                <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full text-white bg-slate-950">
                                            <SelectValue placeholder="Selecione a modalidade" />
                                        </SelectTrigger>
                                        <SelectContent className='bg-slate-950'>
                                            {modality.map((modality) => (
                                                <SelectItem className='bg-slate-950 text-white' key={modality.id} value={modality.id}>
                                                    {modality.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Estado:</FormLabel>
                                <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full text-white bg-slate-950">
                                            <SelectValue placeholder="UF" />
                                        </SelectTrigger>
                                        <SelectContent className='bg-slate-950'>
                                            {states.map((estado) => (
                                                <SelectItem className='bg-slate-950 text-white' key={estado.id} value={estado.sigla}>
                                                    {estado.sigla}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Cidade:</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Cidade" className="bg-slate-950 text-gray-50" />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="flex justify-center mt-4">
                    <Button
                        type='submit'
                        disabled={isSubmitting}
                        className={`flex items-center justify-center gap-2 bg-default text-slate-950 border border-slate-950 py-2 px-4 rounded transition-colors ${!isSubmitting && 'hover:text-default hover:bg-slate-950 hover:border-default'
                            }`}
                    >
                        {isSubmitting ? (
                            <>
                                <FaSpinner className='animate-spin' />
                            </>
                        ) : (
                            'Salvar'
                        )}
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}
