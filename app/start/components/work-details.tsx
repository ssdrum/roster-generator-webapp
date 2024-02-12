import { FC } from 'react';
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
import { ToggleGroup, ToggleGroupItem } from '@/app/ui/shadcn/toggle-group';
import { Button } from '@/app/ui/shadcn/button';
import { Input } from '@/app/ui/shadcn/input';

import { Day, formSchema } from '../../lib/formSchemas';
import { QuestionIcon, DayIcon, DeleteIcon, PlusIcon } from '@/app/lib/icons';

type Props = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  days: Day[];
};

const WorkDetails: FC<Props> = ({ form, days }) => {
  // Fieldarray lets us manage a changing number of shifts (an array of fields [duh])
  // shifts
  const {
    fields: shiftFields,
    append: appendShift,
    remove: removeShift,
  } = useFieldArray({
    control: form.control,
    name: 'shifts',
  });

  // defining the methods to add and delete shifts and employees
  const addShift = (index: number) => {
    const newAssignment = { shiftId: index, assignments: [] as any };
    form.getValues().workDays.forEach((day) => {
      const newDay = { day: day, numAssigned: 1 };
      newAssignment.assignments.push(newDay);
    });

    form.getValues().numEmployeesAssigned.push(newAssignment); // updates grid-selector data

    appendShift({
      shiftId: index,
      shiftName: '',
      shiftStartTime: '00:00',
      shiftEndTime: '00:00',
    }); // create a new shift object with our default values
  };

  const deleteShift = (index: number) => {
    // TODO
    removeShift(index);
  };

  /* Updates numEmployeesAssigned array when user adds or removes a workday */
  const updateDays = (days: number[]): void => {
    // Removes days from form data when de-selected
    form.getValues().numEmployeesAssigned.forEach((data) => {
      data.assignments.forEach((assignment, index) => {
        if (!days.includes(assignment.day)) {
          data.assignments.splice(index, 1);
        }
      });
    });

    // Adds days in form data when selected
    days.forEach((day) => {
      form.getValues().numEmployeesAssigned.forEach((data) => {
        // Check if the day is already assigned
        const isDayAssigned = data.assignments.some(
          (assignment) => assignment.day === day
        );
        if (!isDayAssigned) {
          // Add the day to assignments
          data.assignments.push({
            day: day,
            numAssigned: 1,
          });
        }
      });
    });
  };

  return (
    <>
      {/* work day selection */}
      <FormField
        control={form.control}
        name='workDays'
        render={({ field: { onChange, value } }) => (
          <FormItem>
            <HoverCard openDelay={1} closeDelay={1}>
              <HoverCardTrigger>
                <FormLabel className='inline-flex items-center hover:underline'>
                  Select the days your company works
                  <QuestionIcon className='pl-1 text-gray-500' />
                </FormLabel>
              </HoverCardTrigger>
              <HoverCardContent side={'top'} className='text-sm text-gray-500'>
                Does your company open for business every day? If so, select
                every day, if not, select all the days that you are open.
              </HoverCardContent>
            </HoverCard>
            <FormControl>
              <ToggleGroup
                className='justify-start'
                type='multiple'
                value={value.map(String)} // the output is a number, but we need to display it in a string format
                onValueChange={(newValue) => {
                  // save the strings as numbers
                  const numberValue = newValue
                    .map((val) => parseInt(val, 10))
                    .sort();
                  updateDays(numberValue);
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
                  <HoverCard openDelay={1} closeDelay={1}>
                    <HoverCardTrigger>
                      {index === 0 && (
                        <FormLabel className='inline-flex items-center hover:underline'>
                          Shift Name
                          <QuestionIcon className='pl-1 text-gray-500' />
                        </FormLabel>
                      )}
                    </HoverCardTrigger>
                    <HoverCardContent
                      side={'top'}
                      className='text-sm text-gray-500'
                    >
                      Enter the shifts that your employees work. Give it a name,
                      and then enter the time that your shift starts and ends
                      at. Use the + button to add more shifts, or the delete
                      button to remove extras.
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

          {/* start time */}
          <div className='col-span-2 pr-4'>
            <FormField
              control={form.control}
              name={`shifts.${index}.shiftStartTime`}
              render={({ field }) => (
                <FormItem>
                  {index === 0 && (
                    <FormLabel className='inline-flex items-center hover:underline'>
                      Start Time
                    </FormLabel>
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
                onClick={() => addShift(index)}
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
export default WorkDetails;
