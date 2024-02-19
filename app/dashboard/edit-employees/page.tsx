'use client';

import { useContext } from 'react';
import { DashboardContext } from '@/app/dashboard/dashboard-context';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { Input } from '@/app/ui/shadcn/input';
import { Button } from '@/app/ui/shadcn/button';
import Title from '@/app/ui/title';
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
const { v4: uuidv4 } = require('uuid');

const EditEmployees = () => {
  const { employees } = useContext(DashboardContext)!;

  // give the form default values
  const form = useForm<z.infer<typeof editEmployeeSchema>>({
    resolver: zodResolver(editEmployeeSchema),
    defaultValues: {
      employees: employees,
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

  const addEmployee = () => {
    appendEmployee({
      id: uuidv4(),
      name: '',
      email: '',
      createdBy: '',
    });
  };

  const deleteEmployee = (index: number) => {
    removeEmployee(index);
  };

  return (
    <>
      <Title title={'Employees'} />
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
                    name={`employees.${index}.name`}
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
                              List the employees that you want to work this
                              week. Enter their details, and use the + button to
                              add more shifts, or the delete button to remove
                              extras.
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
                    name={`employees.${index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        {index === 0 && (
                          <FormLabel className=''>Email</FormLabel>
                        )}
                        <FormControl>
                          <Input type='email' {...field} />
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
                        onClick={() => addEmployee()}
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
    </>
  );
}

export default EditEmployees
