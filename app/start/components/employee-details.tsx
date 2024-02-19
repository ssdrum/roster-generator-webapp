import React from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/ui/shadcn/form';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/app/ui/shadcn/hover-card';
import { Button } from '@/app/ui/shadcn/button';
import { Input } from '@/app/ui/shadcn/input';
import { formSchema } from '@/app/lib/formSchemas';
const { v4: uuidv4 } = require('uuid');

type Props = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

const EmployeeDetails: React.FC<Props> = ({ form }) => {
  /// fieldarray lets us manage a changing number of shifts ( an array of fields)
  // employees
  const {
    fields: employeeFields,
    append: appendEmployee,
    remove: removeEmployee,
  } = useFieldArray({
    control: form.control,
    name: 'employees',
  });

  // Add and delete employees
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
              name={`employees.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  {/* only render the label for the first one */}
                  <HoverCard openDelay={1} closeDelay={1}>
                    <HoverCardTrigger>
                      {index === 0 && (
                        <FormLabel className='inline-flex items-center hover:underline'>
                          Employee Name
                          <QuestionIcon className='pl-1 text-gray-500' />
                        </FormLabel>
                      )}
                    </HoverCardTrigger>
                    <HoverCardContent
                      side={'top'}
                      className='text-sm text-gray-500'
                    >
                      List the employees that you want to work this week. Enter
                      their details, and use the + button to add more shifts, or
                      the delete button to remove extras.
                    </HoverCardContent>
                  </HoverCard>
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
                onClick={() => addEmployee()}
              >
                <PlusIcon className='h-6 w-6' />
              </Button>
            </div>
          )}
        </div>
      ))}
    </>
  );
};
export default EmployeeDetails;

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

function QuestionIcon(props: any) {
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
      <path d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z'></path>
    </svg>
  );
}
