"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { ShortBusinessInformation } from "@/types/business"
import { ChevronDown } from "lucide-react"

type SelectPopoverProps = {
  options: ShortBusinessInformation[]
  value: string
  setValue: (value: string) => void
  label: string
}

const SelectPopover = ({
  options,
  value,
  label,
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
          className="border-gray-300 border-2 rounded-md flex items-center gap-2"
        >
          {
            value
            ? options.find(option => option.id === value)?.name
            : label
          }
          <ChevronDown className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Busca una empresa..." />
          <CommandList>
            <CommandEmpty>No se ha encontrado la empresa...</CommandEmpty>
            <CommandGroup>
              {
                options.map((option) => (
                  <CommandItem
                    key={option.id}
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