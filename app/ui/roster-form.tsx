// shadcn
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

// form
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import useMultiStepForm from '@/app/ui/multistep-form/useMultiStepForm';
import ProgressBar from '@/app/ui/multistep-form/progress-bar';

// import types, schemas and the other two components
import { Day, formSchema, employeeSchema } from '../schemas/formSchemas';
import WorkDetails from './work-details';
import EmployeeDetails from './employee-details';
import GridSelector from '@/app/ui/grid-selector/grid-selector';

export default function RosterForm() {
  const days: Day[] = [
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
      employeesAssigned: [0, 0, 0, 0, 0, 0, 0],
    },
  });

  // submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // yeah we console logging for now woo
  }

  /// employees assigned per day
  // initial value
  const [employeesAssigned, setEmployeesAssigned] = useState(
    new Array(days.length).fill(0)
  ); // inital value

  // increase number of employees
  const incrementEmployeesAssigned = (dayIndex: number) => {
    setEmployeesAssigned((currentCounts) =>
      currentCounts.map((count, index) => {
        // only update the day we changed
        if (index === dayIndex) {
          const updatedCount = count + 1; // +1
          form.setValue(`employeesAssigned.${index}`, updatedCount, {
            shouldValidate: true,
          }); // update the form

          return updatedCount; // return this day
        }
        return count; // return all the days
      })
    );
  };

  // decrease
  const decrementEmployeesAssigned = (dayIndex: number) => {
    setEmployeesAssigned((currentCounts) =>
      currentCounts.map((count, index) => {
        if (index === dayIndex) {
          const updatedCount = Math.max(count - 1, 0); // make sure it stays at 0 or above
          form.setValue(`employeesAssigned.${index}`, updatedCount, {
            shouldValidate: true,
          });

          return updatedCount;
        }
        return count;
      })
    );
  };

  // break it into form components
  const { step, steps, isFirstStep, isLastStep, currStepIndex, back, next } =
    useMultiStepForm([
      <WorkDetails key={'one'} form={form} days={days} />,
      <EmployeeDetails key={'two'} form={form} />,
      // Temporarily hardcoded props
      <GridSelector
        workDays={[0, 1, 2, 3, 4, 5]}
        shifts={[
          { name: 'Morning', startTime: '08:00', endTime: '15:00' },
          { name: 'Evening', startTime: '15:00', endTime: '21:00' },
        ]}
      />,
    ]);

  return (
    <>
      <ProgressBar currStepIndex={currStepIndex} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          {currStepIndex + 1} / {steps.length}
          {step}
          {!isFirstStep && (
            <Button
              type='button'
              onClick={back}
              className='fixed bottom-10 left-36 m-8'
            >
              Back
            </Button>
          )}
          {isLastStep ? (
            <Button type='submit' className='fixed bottom-10 right-36 m-8'>
              Submit
            </Button>
          ) : (
            <Button
              type='button'
              onClick={next}
              className='fixed bottom-10 right-36 m-8'
            >
              Next
            </Button>
          )}
        </form>
      </Form>
    </>
  );
}
