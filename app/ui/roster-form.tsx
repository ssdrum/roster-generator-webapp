// File: roster-form.tsx
// Description: the multi-page drawer form where the user enters the details to create a roster
// Created  by: osh
//          at: 16:06 on Thursday, the 01st of February, 2024.
// Last edited: 16:31 on Saturday, the 03rd of February, 2024.

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';

// the schema for the shift
const shiftSchema = z.object({
  shiftName: z.string().min(1, {
    message: 'Please give the shift a name.',
  }),
  shiftStartTime: z.string(),
  shiftEndTime: z.string(),
});

const employeeSchema = z.object({
  employeeName: z.string()
    .min(2, {
      message: "Please enter a name longer than two characters."
    }),
  employeeEmail: z.string()
    .email({ message: "Please enter a valid email." }),
  workingDays: z.number()
  .min(1, {
    message: "Employees must work at least one day a week."
  })
  .max(7, {
    message: "Employees cannot work more days than exists in a week."
  })
})

// create the form schema
const formSchema = z.object({
  workDays: z.array(z.number()).min(1, {
    message: "Please select at least one day that you're open.",
  }),
  shifts: z.array(shiftSchema), // an array of shifts
  employees: z.array(employeeSchema), // an array of employee details
});

export default function RosterForm() {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]; // the list for the day selection

  // define the form as it renders
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // link the react form and the resolver together for validation
    defaultValues: {
      // to stop the values from changing from undefined to a type, we have to initialise them with an empty value matching their type
      workDays: [],
      shifts: [
        {
          shiftName: '',
          shiftStartTime: '00:00',
          shiftEndTime: '00:00',
        },
      ],
      employees: [
        {
          employeeName: '',
          employeeEmail: '',
          workingDays: 1,
        },
      ],
    },
  });

  /// fieldarray lets us manage a changing number of shifts ( an array of fields [duh])
  // shifts
  const { fields: shiftFields, append: appendShift, remove: removeShift } = useFieldArray({
    control: form.control,
    name: 'shifts',
  });

  // employees
  const { fields: employeeFields, append: appendEmployee, remove: removeEmployee } = useFieldArray({
    control: form.control,
    name: 'employees',
  });

  // defining the methods to add and delete shifts and employees
  const addShift = () => {
    appendShift({ shiftName: '', shiftStartTime: '00:00', shiftEndTime: '00:00' }); // create a new shift object with our default values
  };

  const deleteShift = (index: number) => {
    removeShift(index);
  };

  const addEmployee = () => {
    appendEmployee({ employeeName: '', employeeEmail: '', workingDays: 1 })
  }

  const deleteEmployee = (index: number) => {
    removeEmployee(index);
  }

  // submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // yeah we console logging for now woo
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {/* work day selection */}
        <FormField
          control={form.control}
          name='workDays'
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel>Select the days your company works</FormLabel>
              <FormControl>
                <ToggleGroup
                  className='justify-start'
                  type='multiple'
                  value={value.map(String)} // the output is a number, but we need to display it in a string format
                  onValueChange={(newValue) => {
                    // save the strings as numbers
                    const numberValue = newValue.map((val) =>
                      parseInt(val, 10)
                    );
                    onChange(numberValue);
                  }}
                >
                  {/* create a toggle for each of the days we defined above */}
                  {days.map((day, index) => (
                    <ToggleGroupItem
                      key={day}
                      value={String(index)}
                      variant='outline'
                      className='flex h-10 w-32 items-center justify-center'
                    >
                      <DayIcon className='mr-2 h-4 w-4' />
                      {day}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FormControl>
              <FormMessage /> {/* the error message rendering */}
            </FormItem>
          )}
        />

        {/* generate shift entry rows depending on how many we've created */}
        {/* shift details */}
        {shiftFields.map((field, index) => (
          <div // gird container for the row
            key={field.id}
            className='grid grid-cols-9'
          >
            {/* name */}
            <div className='col-span-4 pr-4'>
              <FormField
                control={form.control}
                name={`shifts.${index}.shiftName`}
                render={({ field }) => (
                  <FormItem>
                    {/* only render the label for the first one */}
                    {index === 0 && <FormLabel>Shift Name</FormLabel>}
                    <FormControl>
                      <Input type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* start time */}
            <div className='col-span-2 pr-4'>
              <FormField
                control={form.control}
                name={`shifts.${index}.shiftStartTime`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && <FormLabel>Start Time</FormLabel>}
                    <FormControl>
                      <Input type='time' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* end time */}
            <div className='col-span-2 pr-4'>
              <FormField
                control={form.control}
                name={`shifts.${index}.shiftEndTime`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && <FormLabel>End Time</FormLabel>}
                    <FormControl>
                      <Input type='time' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* delete icon for all but the first shift */}
            {index !== 0 && (
              <div className='col-span-1 flex items-start justify-start'>
                <Button
                  type='button'
                  size='icon'
                  variant='destructive'
                  onClick={() => deleteShift(index)}
                >
                  <DeleteIcon className='h-6 w-6' />
                </Button>
              </div>
            )}

            {/* plus button to add a new shift but only under the last element */}
            {index === shiftFields.length - 1 && (
              <div className='col-span-8 flex items-center justify-start pr-4 pt-4'>
                <Button
                  type='button'
                  variant='outline'
                  className='w-full'
                  onClick={addShift}
                >
                  <PlusIcon className='h-6 w-6' />
                </Button>
              </div>
            )}
          </div>
        ))}

        {/* employee details */}
        {employeeFields.map((field, index) => (
          <div // gird container for the row
            key={field.id}
            className='grid grid-cols-9'
          >
            {/* name */}
            <div className='col-span-3 pr-4'>
              <FormField
                control={form.control}
                name={`employees.${index}.employeeName`}
                render={({ field }) => (
                  <FormItem>
                    {/* only render the label for the first one */}
                    {index === 0 && <FormLabel>Employee Name</FormLabel>}
                    <FormControl>
                      <Input type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* email */}
            <div className='col-span-4 pr-4'>
              <FormField
                control={form.control}
                name={`employees.${index}.employeeEmail`}
                render={({ field }) => (
                  <FormItem>
                    {/* only render the label for the first one */}
                    {index === 0 && <FormLabel>Employee Email</FormLabel>}
                    <FormControl>
                      <Input type='email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* working days */}
            <div className='col-span-1 pr-4'>
              <FormField
                control={form.control}
                name={`employees.${index}.workingDays`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && <FormLabel>Days Working</FormLabel>}
                    <FormControl>
                      <Input 
                        type='number' {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))} // convert the string to a number
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* delete icon */}
            {index !== 0 && (
              <div className='col-span-1 flex items-start justify-start'>
                <Button
                  type='button'
                  size='icon'
                  variant='destructive'
                  onClick={() => deleteEmployee(index)}
                >
                  <DeleteIcon className='h-6 w-6' />
                </Button>
              </div>
            )}

            {/* plus button */}
            {index === employeeFields.length - 1 && (
              <div className='col-span-8 flex items-center justify-start pr-4 pt-4'>
                <Button
                  type='button'
                  variant='outline'
                  className='w-full'
                  onClick={addEmployee}
                >
                  <PlusIcon className='h-6 w-6' />
                </Button>
              </div>
            )}
          </div>
        ))}

        <Button type='submit' className='fixed bottom-10 right-36 m-8'>
          Submit
        </Button>
      </form>
    </Form>
  );
}

/// icons
// icons for the days open selection
function DayIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect width='18' height='18' x='3' y='4' rx='2' ry='2' />
      <line x1='16' x2='16' y1='2' y2='6' />
      <line x1='8' x2='8' y1='2' y2='6' />
      <line x1='3' x2='21' y1='10' y2='10' />
      <path d='M8 14h.01' />
      <path d='M12 14h.01' />
      <path d='M16 14h.01' />
      <path d='M8 18h.01' />
      <path d='M12 18h.01' />
      <path d='M16 18h.01' />
    </svg>
  );
}

// delete icon
function DeleteIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M3 6h18' />
      <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
      <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
    </svg>
  );
}

// plus icon
function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M5 12h14' />
      <path d='M12 5v14' />
    </svg>
  );
}
