'use client'

import { CalendarIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useState } from "react"

interface PopoverCalendarProps {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
}

const PopoverCalendar = ({
  value,
  onChange
}: PopoverCalendarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOnSelect = (date: Date | undefined) => {
    if (!date) return
    onChange(date)
    setIsOpen(false)
  }
  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full pl-3 text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {value ? (
            format(value, "dd/MM/yyyy")
          ) : (
            <span>Seleccionar fecha:</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleOnSelect}
          disabled={(date) =>
            date > new Date("2030-01  -01") || date < new Date("2020-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default PopoverCalendar