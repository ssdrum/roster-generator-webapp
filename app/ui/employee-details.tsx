import React from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';

import { z } from 'zod';

// shadcn
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Day, formSchema } from '../schemas/formSchemas';

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

  const addEmployee = () => {
    appendEmployee({ employeeName: '', employeeEmail: '', workingDays: 1 });
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
                      type='number'
                      {...field}
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
