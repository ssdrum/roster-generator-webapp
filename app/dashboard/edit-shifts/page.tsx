'use client';

import Title from '@/app/ui/title';
import { useContext, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
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
import { editShiftSchema } from '@/app/lib/formSchemas';
import { PlusIcon, QuestionIcon, DeleteIcon } from '@/app/lib/icons';
import SubmitBtn from '@/app/ui/submit-btn';
const { v4: uuidv4 } = require('uuid');

const EditShifts = () => {
  const { shifts } = useContext(DashboardContext)!;
  const [isSubmitting, setIsSubmitting] = useState(false); // when we click the button
  const router = useRouter();

  // Pre-populate form with shifts stored in the database
  const form = useForm<z.infer<typeof editShiftSchema>>({
    resolver: zodResolver(editShiftSchema),
    defaultValues: {
      shifts: shifts,
    },
  });

  // definining methods to modify shifts
  const {
    fields: shiftFields,
    append: appendShift,
    remove: removeShift,
  } = useFieldArray({
    control: form.control,
    name: 'shifts',
  });

  // Add and delete shifts from form
  const addShift = () => {
    appendShift({
      id: uuidv4(),
      name: '',
      startTime: '00:00',
      endTime: '00:00',
    }); // create a new shift object with our default values
  };

  const deleteShift = (index: number) => removeShift(index);

  // Submit new values to database, then refresh page
  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const updatedShifts = form.getValues().shifts;
      const response = await fetch('/api/prisma/shifts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedShifts),
      });
    } catch (error) {
      console.error('Error submitting shifts:', error);
    } finally {
      await new Promise((r) => setTimeout(r, 500));
      setIsSubmitting(false);
      router.refresh();
    }
  };

  return (
    <>
      <Title title={'Edit Shifts'} />
      <div className='flex min-h-screen items-start justify-center'>
        {/* shadcn form wrapper */}
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            {/* loop over and render the shift fields */}
            {shiftFields.map((field, index) => (
              <div // grid container for the row
                key={field.id}
                className='grid w-full max-w-screen-xl grid-cols-12 py-2'
              >
                {/* name */}
                <div className='col-span-5 pr-4'>
                  <FormField
                    control={form.control}
                    name={`shifts.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        {/* only render the label for the first one */}
                        {index === 0 && (
                          <HoverCard openDelay={1} closeDelay={1}>
                            <HoverCardTrigger>
                              <FormLabel className='inline-flex items-center hover:underline'>
                                Shift Name
                                <QuestionIcon className='pl-1 text-gray-500' />
                              </FormLabel>
                            </HoverCardTrigger>
                            <HoverCardContent
                              side={'top'}
                              className='text-sm text-gray-500'
                            >
                              Enter the shifts that your employees work. Give it
                              a name, and then enter the time that your shift
                              starts and ends at. Use the + button to add more
                              shifts, or the delete button to remove extras.
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

                {/* start time */}
                <div className='col-span-3 pr-4'>
                  <FormField
                    control={form.control}
                    name={`shifts.${index}.startTime`}
                    render={({ field }) => (
                      <FormItem>
                        {index === 0 && (
                          <FormLabel className=''>Start Time</FormLabel>
                        )}
                        <FormControl>
                          <Input type='time' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* end time */}
                <div className='col-span-3 pr-4'>
                  <FormField
                    control={form.control}
                    name={`shifts.${index}.endTime`}
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
                  <div className='col-span-1'>
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

                {/* plus button to add a new shift and a submit button but only under the last element */}
                {index === shiftFields.length - 1 && (
                  <>
                    <div className='col-span-11 pr-4 pt-4'>
                      <Button
                        type='button'
                        variant='outline'
                        className='w-full'
                        onClick={addShift}
                      >
                        <PlusIcon className='h-6 w-6' />
                      </Button>
                    </div>
                    <div className='col-span-11 pr-4 pt-4'>
                      <SubmitBtn
                        isSubmitting={isSubmitting}
                        text={'Update'}
                        submittingText={'Updating...'}
                      />
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
};

export default EditShifts;
