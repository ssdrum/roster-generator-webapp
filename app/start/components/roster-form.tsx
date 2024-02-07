// File: roster-form.tsx
// Description: the multi-page drawer form where the user enters the details to create a roster
// Created  by: osh
//          at: 16:06 on Thursday, the 01st of February, 2024.
// Last edited: 04:22 on Sunday, the 04th of February, 2024.

// shadcn
import { Sheet, SheetContent, SheetTrigger } from '@/app/ui/shadcn/sheet';
import { FormEvent } from 'react';
import { Form } from '@/app/ui/shadcn/form';
import { Button } from '@/app/ui/shadcn/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import useMultiStepForm from '@/app/lib/useMultiStepForm';
import ProgressBar from '@/app/start/components/progress-bar';

// import types, schemas and the other two components
import { Day, formSchema } from '../../lib/formSchemas';
import WorkDetails from './work-details';
import EmployeeDetails from './employee-details';
import GridSelector from '@/app/start/components/grid-selector';

const StartForm = () => {
  const days: Day[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]; // the list for the day selection

  // Define the form as it renders
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // Link the react form and the resolver together for validation
    defaultValues: {
      // To stop the values from changing from undefined to a type, we have to initialise them with an empty value matching their type
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
      numEmployeesAssigned: {},
    },
  });
  const { register, trigger } = form;

  // validation on next click
  const nextPage = () => {
    (async () => {
      // check the current page's shift
      type FieldNames =
        | 'workDays'
        | 'shifts'
        | 'employees'
        | 'numEmployeesAssigned'; // define the types of fields we can expect
      let fieldsToValidate: FieldNames[] = []; // the array containing the specific fields we want to validate on this page
      switch (
        step.key // decide which values to validate based on the current page
      ) {
        case 'one':
          fieldsToValidate = ['workDays', 'shifts'];
          break;
        case 'two':
          fieldsToValidate = ['employees'];
          break;
        case 'three':
          fieldsToValidate = ['numEmployeesAssigned'];
          break;
        default:
          fieldsToValidate = [];
      }

      // validation passed, go to the next page
      if (await trigger(fieldsToValidate)) {
        next();
      }
    })();
  };

  // Break form into three pages and pass them to useMultiStepForm hook
  const { step, steps, isFirstStep, isLastStep, currStepIndex, back, next } =
    useMultiStepForm([
      <WorkDetails key={'one'} form={form} days={days} />,
      <EmployeeDetails key={'two'} form={form} />,
      // Temporary dummy data
      <GridSelector
        key={'three'}
        workDays={form.getValues().workDays.sort()}
        shifts={form.getValues().shifts}
        form={form}
      />,
    ]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLastStep) {
      form.handleSubmit(async (data) => {
        console.log(data);
      })();
    } else {
      return nextPage();
    }

    if (currStepIndex === 1 && form.getValues().workDays.length === 0) {
      alert('No working days selected');
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <Sheet>
        <SheetTrigger>Create Roster</SheetTrigger>
        <SheetContent side={'bottom'} className='h-[60vh] w-full overflow-auto'>
          <ProgressBar currStepIndex={currStepIndex} />
          <Form {...form}>
            <form
              onSubmit={handleSubmit}
              className='flex flex-col justify-center space-y-4'
            >
              {currStepIndex + 1} / {steps.length}
              {step}
              {!isFirstStep && (
                <Button type='button' onClick={back}>
                  Back
                </Button>
              )}
              <Button type='submit'>{isLastStep ? 'Finish' : 'Next'}</Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default StartForm;
