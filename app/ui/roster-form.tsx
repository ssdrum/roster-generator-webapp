// File: roster-form.tsx
// Description: the multi-page drawer form where the user enters the details to create a roster
// Created  by: osh
//          at: 16:06 on Thursday, the 01st of February, 2024.
// Last edited: 15:36 on Friday, the 02nd of February, 2024.

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"

// create the form schema
const formSchema = z.object({
  workDays: z.array(z.number())
  .min(1, {
    message: "Please select at least one day that you're open."
  })
})

export default function RosterForm()
{
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] // the list for the day selection

  // define the form as it renders
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workDays: [],
    },
  })

  // submit handler 
  function onSubmit(values: z.infer<typeof formSchema>){
    console.log(values) // yeah we console logging for now woo
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField 
          control={form.control}
          name="workDays"
          render={({ field: { onChange, value }}) => (
            <FormItem>
              <FormLabel>Select the days your company works</FormLabel>
              <FormControl>
                <ToggleGroup 
                type="multiple"
                value={ value.map(String) } // the output is a number, but we need to display it in a string format
                onValueChange={(newValue) => {
                  // save the strings as numbers
                  const numberValue = newValue.map((val) => parseInt(val, 10)); 
                  onChange(numberValue);
                }}
              >
                {days.map((day, index) => (
                  <ToggleGroupItem 
                    key={day} 
                    value={String(index)} 
                    className="w-32 h-10 flex items-center justify-center"
                  >
                    <WorkDayIcon className="mr-2 h-4 w-4" />
                    {day}
                  </ToggleGroupItem>
                ))}

                </ToggleGroup>

              </FormControl>

              <FormMessage/> {/* the error message rendering */}
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>

      </form>
    </Form>
  )
}

/// Icons 
// workday icons
function WorkDayIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}