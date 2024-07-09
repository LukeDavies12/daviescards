'use client'

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import React from "react"

export default function DatePicker({ name, onDateChange, required }: { name: string, onDateChange: (date: Date | undefined) => void, required?: boolean }) {
  const [date, setDate] = React.useState<Date | undefined>()

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    onDateChange(selectedDate)
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("w-[240px] justify-start text-left font-normal")}
          >
            {date ? date.toLocaleDateString() : "Select Date"}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
        </PopoverContent>
      </Popover>
      <input type="hidden" name={name} id={name} value={date ? date.toISOString() : ''} required={required} />
    </>
  )
}
