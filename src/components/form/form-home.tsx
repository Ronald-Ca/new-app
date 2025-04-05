import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { FaSpinner } from 'react-icons/fa'

interface HomeData {
  image: File | null
  title: string
  role: string
  description: string
  colorBackground: string
  imageBackground: File | null
}

interface FormHomeProps {
  onSubmit: (data: HomeData) => void
  isSubmitting?: boolean
}

export function FormHome({ onSubmit, isSubmitting = false }: FormHomeProps) {
  const form = useFormContext<HomeData>()

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center gap-3'>
      <FormField
        control={form.control}
        name='title'
        render={({ field }) => (
          <FormItem className='w-full flex flex-col items-start'>
            <FormLabel className='text-gray-50'>Título:</FormLabel>
            <FormControl>
              <Input {...field} placeholder='Título' className='border-[1px] border-gray-50 bg-slate-950 text-gray-50' />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='role'
        render={({ field }) => (
          <FormItem className='w-full flex flex-col items-start'>
            <FormLabel className='text-gray-50'>Cargo:</FormLabel>
            <FormControl>
              <Input {...field} placeholder='Cargo' className='border-[1px] border-gray-50 bg-slate-950 text-gray-50' />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='description'
        render={({ field }) => (
          <FormItem className='w-full flex flex-col items-start'>
            <FormLabel className='text-gray-50'>Descrição:</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder='Descrição'
                className='border-[1px] border-gray-50 w-full bg-slate-950 text-gray-50'
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='colorBackground'
        render={({ field }) => (
          <FormItem className='w-full flex flex-col items-start'>
            <FormLabel className='text-gray-50'>Cor de Fundo:</FormLabel>
            <FormControl>
              <Input
                {...field}
                type='color'
                className='cursor-pointer border-[1px] border-gray-50 w-[100px] bg-slate-950 text-gray-50'
              />
            </FormControl>
          </FormItem>
        )}
      />

      <Button
        type='submit'
        disabled={isSubmitting}
        className={`flex items-center justify-center gap-2 bg-[#00BFFF] text-slate-950 border border-slate-950 py-2 px-4 rounded transition-colors ${
          !isSubmitting && 'hover:text-[#00BFFF] hover:bg-[#1c222b] hover:border-[#00BFFF]'
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
    </form>
  )
}
