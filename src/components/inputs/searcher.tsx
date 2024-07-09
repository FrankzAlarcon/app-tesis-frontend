"use client"
import { useEffect, useRef, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { useAction } from '@/hooks/use-action'
import { getSearch } from '@/actions/shared/get-search'
import Loader from '../loader'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Input } from '../ui/input'


interface SearcherProps {
  isBusiness?: boolean
}

const ResultGroup = ({
  heading,
  children
}: {
  heading: string,
  children: React.ReactNode
}) => {
  return (
    <div className=''>
      <h4 className='text-xs text-gray-700 py-1'>{heading}</h4>
      <div className='pl-1'>
        {children}
      </div>
    </div>
  )
}

const ResultItem = ({
  onClick,
  children,
  className
}: {
  onClick: () => void,
  children: React.ReactNode,
  className?: string
}) => {
  return (
    <div role='button' onClick={onClick} className={cn('cursor-pointer text-xs py-1 hover:bg-gray-100 duration-200', className)}>
      {children}
    </div>
  )
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
    <div className='relative overflow-visible'>
      <Input
        className='w-full' placeholder='Buscar'
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
      />
      {
        open && (
          <div className={cn(
            'absolute top-14 z-40 w-80 sm:w-[500px] md:w-80 lg:w-96 bg-popover p-4 text-popover-foreground rounded-md shadow-md outline-none',
            data && 'pt-0'
          )}>
            {isLoading && <div className='w-full flex justify-center'><Loader className='w-5 h-5' /></div>}
            {!isLoading && !data && <div className='p-0 text-center text-xs'>Busca una empresa o estudiante!</div>}
            {
              data && !isLoading && data.students.length > 0 && (
                <ResultGroup heading='Estudiantes' >
                  {
                    data.students.map((student) => (
                      <ResultItem key={student.id}
                        onClick={() => {
                          const startRoute = isBusiness ? '/b/profile/e' : '/e/profile'
                          router.push(`${startRoute}/${student.studentId}`)
                          setOpen(false)
                        }}
                        className=''
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
                      </ResultItem>
                    ))
                  }
                </ResultGroup>
              )
            }
            {
              data && !isLoading && data.business.length > 0 && (
                <ResultGroup heading='Empresas' >
                  {
                    data.business.map((business) => {
                      console.log(business);
                      return (
                        <ResultItem key={business.id}
                          onClick={() => {
                            const startRoute = isBusiness ? '/b/profile' : '/e/profile/b'
                            router.push(`${startRoute}/${business.businessId}`)
                            setOpen(false)
                          }}
                          className=''
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
                        </ResultItem>
                      )
                    })
                  }
                </ResultGroup>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default Searcher