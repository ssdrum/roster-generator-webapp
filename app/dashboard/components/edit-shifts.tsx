import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';

//shadcn
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

// own imports
import { editShiftSchema } from '@/app/lib/formSchemas';
import { PlusIcon, QuestionIcon, DeleteIcon } from '@/app/lib/icons';

export default function EditShifts() {
  // here we would load the shift data from the db into this component,
  // but for now we have dummy data
  const tempShifts = [
    { shiftName: 'Morning', shiftStartTime: '08:00', shiftEndTime: '16:00' },
    { shiftName: 'Afternoon', shiftStartTime: '16:00', shiftEndTime: '00:00' },
    { shiftName: 'Night', shiftStartTime: '00:00', shiftEndTime: '08:00' },
  ];

  // give the form default values
  const form = useForm<z.infer<typeof editShiftSchema>>({
    resolver: zodResolver(editShiftSchema),
    defaultValues: {
      shifts: tempShifts,
    },
  });

  // when we submit the form, edit the db values
  function onSubmit(values: z.infer<typeof editShiftSchema>) {
    console.log(values);
  }

  // methods for modifying the shifts
  const {
    // definining the methods that this accepts
    fields: shiftFields,
    append: appendShift,
    remove: removeShift,
  } = useFieldArray({
    control: form.control,
    name: 'shifts',
  });

  const addShift = (index: number) => {
    appendShift({
      shiftId: index,
      shiftName: '',
      shiftStartTime: '00:00',
      shiftEndTime: '00:00',
    }); // create a new shift object with our default values
  };

  const deleteShift = (index: number) => {
    removeShift(index);
  };

  return (
    <div className='flex min-h-screen items-start justify-center pt-48'>
      {/* shadcn form wrapper */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  name={`shifts.${index}.shiftName`}
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
                            Enter the shifts that your employees work. Give it a
                            name, and then enter the time that your shift starts
                            and ends at. Use the + button to add more shifts, or
                            the delete button to remove extras.
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
                  name={`shifts.${index}.shiftStartTime`}
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
                      onClick={() => addShift(index)}
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
