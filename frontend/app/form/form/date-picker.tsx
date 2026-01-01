"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Field, FieldLabel } from "@/components/ui/field"
import { formatDateForUI } from "@/lib/date";

export function DatePicker({value, onChange}: {value?: Date; onChange: (date: Date) => void}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Field className="flex flex-col gap-3">
      <FieldLabel className="text-md lg:text-xl" htmlFor="date">Work Date</FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="lg:text-lg lg:p-5 w-48 justify-between font-normal text-muted-foreground"
          >
            {value ? formatDateForUI(value) : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={(value) => {
              onChange(value || new Date())
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
