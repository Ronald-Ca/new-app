import { FormProvider, useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { states } from '@app/utils/states'
import { useEffect } from 'react'
import { EducationType } from '@app/services/education-service'

interface FormEducationProps {
    selectedEducation?: EducationType
    handleSave: (data: EducationType) => void
    loading: boolean
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

export default function FormEducation({ selectedEducation, handleSave, loading }: FormEducationProps) {
    const form = useForm<EducationFormValues>({
        defaultValues: {
            course: '',
            institution: '',
            yearInit: '',
            yearFinal: '',
            city: '',
            state: '',
            modality: '',
        },
    })

    const { reset, handleSubmit } = form

    useEffect(() => {
        if (selectedEducation) {
            reset({
                course: selectedEducation.course,
                institution: selectedEducation.institution,
                yearInit: selectedEducation.yearInit,
                yearFinal: selectedEducation.yearFinal || '',
                city: selectedEducation.city || '',
                state: selectedEducation.state || '',
                modality: selectedEducation.modality || '',
                id: selectedEducation.id,
            })
        } else {
            reset({
                course: '',
                institution: '',
                yearInit: '',
                yearFinal: '',
                city: '',
                state: '',
                modality: '',
            })
        }
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
                                    <Input {...field} placeholder="Ano de início" className="bg-slate-950 text-gray-50" />
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
                                    <Input {...field} placeholder="Ano de conclusão" className="bg-slate-950 text-gray-50" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-3">
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
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormLabel>Estado:</FormLabel>
                                <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="UF" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {states.map((estado) => (
                                                <SelectItem key={estado.id} value={estado.sigla}>
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
                    name="modality"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Modalidade:</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Modalidade" className="bg-slate-950 text-gray-50" />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="flex justify-center mt-4">
                    <Button
                        type="submit"
                        className="bg-[#00BFFF] text-slate-950 border border-slate-950 hover:text-[#00BFFF] hover:bg-[#1c222b] hover:border-[#00BFFF]"
                    >
                        {loading ? 'Salvando...' : 'Salvar'}
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}
