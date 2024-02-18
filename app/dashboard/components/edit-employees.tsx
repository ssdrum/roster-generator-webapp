'use client';

import { useContext } from 'react';
import { DashboardContext } from '@/app/dashboard/dashboard-context';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { Input } from '@/app/ui/shadcn/input';
import { Button } from '@/app/ui/shadcn/button';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/ui/shadcn/form';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@/app/ui/shadcn/hover-card';

import { editEmployeeSchema } from '@/app/lib/formSchemas';
import { PlusIcon, QuestionIcon, DeleteIcon } from '@/app/lib/icons';

export default function EditEmployees() {
  const { employees } = useContext(DashboardContext)!;
  console.log(employees);
  
  // here we would load the shift data from the db into this component,
  // but for now we have dummy data
  const tempEmployees = [
    {
      employeeName: 'John Doe',
      employeeEmail: 'john.doe@example.com',
      workingDays: 1,
    },
    {
      employeeName: 'Jane Doe',
      employeeEmail: 'jane.doe@example.com',
      workingDays: 2,
    },
    {
      employeeName: 'John Smith',
      employeeEmail: 'john.smith@example.com',
      workingDays: 3,
    },
    {
      employeeName: 'Jane Smith',
      employeeEmail: 'jane.smith@example.com',
      workingDays: 4,
    },
    {
      employeeName: 'Bob Bobson',
      employeeEmail: 'bob.bobson@example.com',
      workingDays: 5,
    },
    {
      employeeName: 'Alice Allison',
      employeeEmail: 'alice.allison@example.com',
      workingDays: 6,
    },
  ];

  // give the form default values
  const form = useForm<z.infer<typeof editEmployeeSchema>>({
    resolver: zodResolver(editEmployeeSchema),
    defaultValues: {
      employees: tempEmployees,
    },
  });

  // when we submit the form, edit the db values
  function onSubmit(values: z.infer<typeof editEmployeeSchema>) {
    console.log(values);
  }

  // methods for modifying the shifts
  const {
    // definining the methods that this accepts
    fields: employeeFields,
    append: appendEmployee,
    remove: removeEmployee,
  } = useFieldArray({
    control: form.control,
    name: 'employees',
  });

  const addEmployee = (index: number) => {
    appendEmployee({
      employeeId: index,
      employeeName: '',
      employeeEmail: '',
      workingDays: 1,
    }); // create a new shift object with our default values
  };

  const deleteEmployee = (index: number) => {
    removeEmployee(index);
  };

  return (
    <div className='flex min-h-screen items-start justify-center'>
      {/* shadcn form wrapper */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* loop over and render the shift fields */}
          {employeeFields.map((field, index) => (
            <div // grid container for the row
              key={field.id}
              className='grid w-full max-w-screen-xl grid-cols-12 py-2'
            >
              {/* name */}
              <div className='col-span-5 pr-4'>
                <FormField
                  control={form.control}
                  name={`employees.${index}.employeeName`}
                  render={({ field }) => (
                    <FormItem>
                      {/* only render the label for the first one */}
                      {index === 0 && (
                        <HoverCard openDelay={1} closeDelay={1}>
                          <HoverCardTrigger>
                            <FormLabel className='inline-flex items-center hover:underline'>
                              Employee Name
                              <QuestionIcon className='pl-1 text-gray-500' />
                            </FormLabel>
                          </HoverCardTrigger>
                          <HoverCardContent
                            side={'top'}
                            className='text-sm text-gray-500'
                          >
                            List the employees that you want to work this week.
                            Enter their details, and use the + button to add
                            more shifts, or the delete button to remove extras.
                          </HoverCardContent>
                        </HoverCard>
                      )}
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
                      {index === 0 && <FormLabel className=''>Email</FormLabel>}
                      <FormControl>
                        <Input type='email' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Working days */}
              <div className='col-span-2 pr-4'>
                <FormField
                  control={form.control}
                  name={`employees.${index}.workingDays`}
                  render={({ field }) => (
                    <FormItem>
                      {index === 0 && <FormLabel>Days Working</FormLabel>}
                      <FormControl>
                        <Input
                          type='number'
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          } // convert the string to a number
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* delete icon for all but the first shift */}
              {index !== 0 && (
                <div className='col-span-1'>
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

              {/* plus button to add a new shift and a submit button but only under the last element */}
              {index === employeeFields.length - 1 && (
                <>
                  <div className='col-span-11 pr-4 pt-4'>
                    <Button
                      type='button'
                      variant='outline'
                      className='w-full'
                      onClick={() => addEmployee(index)}
                    >
                      <PlusIcon className='h-6 w-6' />
                    </Button>
                  </div>

                  <div className='col-span-11 pr-4 pt-4'>
                    <Button className='w-full' type='submit'>
                      {' '}
                      Update{' '}
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </form>
      </Form>
    </div>
  );
}
