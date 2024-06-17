"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { ShortBusinessInformation } from "@/types/business"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Option extends ShortBusinessInformation {}

type SelectPopoverProps = {
  options: Option[]
  value: string
  setValue: (value: string) => void
  label: string
  emptyLabel?: string
  placeholderInput?: string
  withSearch?: boolean
  className?: string
  classNamePopover?: string
}

const SelectPopover = ({
  options,
  value,
  label,
  emptyLabel = undefined,
  placeholderInput = undefined,
  withSearch = false,
  className = undefined,
  classNamePopover = undefined,
  setValue
}: SelectPopoverProps) => {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          variant='ghost'
          className={cn("border-gray-300 border-2 rounded-md flex items-center gap-2", className)}
        >
          {
            value
            ? (
              <span className="text-sm">{options.find(option => option.id === value)?.name}</span>
            ) : label
          }
          <ChevronDown className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(
        "p-0",
        classNamePopover
      )}>
        <Command>
          {
            withSearch && (
              <CommandInput
                placeholder={placeholderInput ? placeholderInput : 'Busca una empresa...'}
              />
            )
          }
          <CommandList>
            <CommandEmpty>{emptyLabel ? emptyLabel : 'No se ha encontrado la empresa...'}</CommandEmpty>
            <CommandGroup>
              {
                options.map((option) => (
                  <CommandItem
                    key={option.id}
                    className="hover:cursor-pointer"
                    onSelect={() => {
                      setValue(option.id)
                      setOpen(false)
                    }}
                  >
                    {option.name}
                  </CommandItem>
                ))
              }
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SelectPopover