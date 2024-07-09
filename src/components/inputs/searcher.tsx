"use client"
import { useEffect, useRef, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { useAction } from '@/hooks/use-action'
import { getSearch } from '@/actions/shared/get-search'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '../ui/command'
import Loader from '../loader'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'


interface SearcherProps {
  isBusiness?: boolean
}

const Searcher = ({
  isBusiness = false
}: SearcherProps) => {
  const { data, execute, isLoading, resetValues } = useAction(getSearch, {
    onError: (error) => {
      console.error(error)
    },
    onSuccess: (data) => {
      console.log(data)
    }
  })
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [debouncedValue, setValue] = useDebounceValue('', 1000)

  useEffect(() => {
    if (!debouncedValue.trim()) {
      resetValues()
      return
    }
    execute({
      text: debouncedValue
    }).then(() => {
      setOpen(true)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  return (
    <Command className='relative overflow-visible'>
      <CommandInput
        className='w-full' placeholder='Buscar'
        onValueChange={(value) => setValue(value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
      />
      {
        open && (
          <CommandList className={cn(
            'absolute top-14 z-40 w-80 sm:w-[500px] md:w-80 lg:w-96 bg-popover p-4 text-popover-foreground rounded-md shadow-md outline-none',
            data && 'pt-0'
          )}>
            {isLoading && <div className='w-full flex justify-center'><Loader className='w-5 h-5' /></div>}
            {!isLoading && !data && <CommandEmpty className='p-0 text-center text-xs'>Busca una empresa o estudiante!</CommandEmpty>}
            {
              data && !isLoading && data.students.length > 0 && (
                <CommandGroup heading='Estudiantes'>
                  {
                    data.students.map((student) => (
                      <CommandItem key={student.id}
                        value={student.studentId}
                        onSelect={(value) => {
                          const startRoute = isBusiness ? '/b/profile/e' : '/e/profile'
                          router.push(`${startRoute}/${value}`)
                          setOpen(false)
                        }}
                        className='cursor-pointer text-xs'
                      >
                        <p className='overflow-hidden whitespace-nowrap text-ellipsis'>
                          <span className='text-sm text-black'>{student.name}</span>
                          {
                            student.shortPresentation && (
                              <>
                                <span className='font-bold text-sm'> · </span>
                                <span className='text-gray-800'>{student.shortPresentation}</span>
                              </>
                            )
                          }
                        </p>
                      </CommandItem>
                    ))
                  }
                </CommandGroup>
              )
            }
            {
              data && !isLoading && data.business.length > 0 && (
                <CommandGroup heading='Empresas'>
                  {
                    data.business.map((business) => {
                      console.log(business);
                      return (
                        <CommandItem key={business.id}
                          value={business.businessId}
                          onSelect={(value) => {
                            const startRoute = isBusiness ? '/b/profile' : '/e/profile/b'
                            router.push(`${startRoute}/${value}`)
                            setOpen(false)
                          }}
                          className='cursor-pointer text-xs'
                        >
                          <p className='overflow-hidden whitespace-nowrap text-ellipsis'>
                            <span className='text-sm text-black'>{business.name}</span>
                            {
                              business.shortPresentation && (
                                <>
                                  <span className='font-bold text-sm'> · </span>
                                  <span className='text-gray-800'>{business.shortPresentation}</span>
                                </>
                              )
                            }
                          </p>
                        </CommandItem>
                      )
                    })
                  }
                </CommandGroup>
              )
            }
          </CommandList>
        )
      }
    </Command>
  )
}

export default Searcher