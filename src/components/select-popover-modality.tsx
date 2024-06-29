"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


type SelectPopoverModalityProps = {
  options: any[]
  value: string
  setValue: (value: string) => void
  label: string
  withSearch?: boolean
  className?: string
  classNamePopover?: string
}

function SelectPopoverModality({
  options,
  value,
  label,
  withSearch = false,
  className = undefined,
  classNamePopover = undefined,
  setValue,
}: SelectPopoverModalityProps) {
  const [open, setOpen] = React.useState(false)
  console.log(options);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("border-gray-300 border-2 rounded-md flex justify-between gap-2", className)}
        >
          {value
            ? options.find((option) => option === value)
            : label}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {withSearch && (
            <CommandInput placeholder="Buscar modalidad..." />
          )}
          <CommandList>
            <CommandEmpty>Modalidad no encontrada</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  className="hover:cursor-pointer"
                  onSelect={() => setValue(option)}
                >
                  <span>{option}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SelectPopoverModality