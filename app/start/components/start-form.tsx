'use client';

import { FormEvent, useState } from 'react';
import { Form } from '@/app/ui/shadcn/form';
import { Button } from '@/app/ui/shadcn/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import useMultiStepForm from '@/app/lib/useMultiStepForm';
import ProgressBar from '@/app/start/components/progress-bar';
import { useRouter } from 'next/navigation';

// import types, schemas and the other two components
import { Day, formSchema } from '../../lib/formSchemas';
import WorkDetails from './work-details';
import EmployeeDetails from './employee-details';
import GridSelector from '@/app/start/components/grid-selector';

const { v4: uuidv4 } = require('uuid');

const StartForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { push } = useRouter();
  const router = useRouter();

  const days: Day[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  // Initialise form with default values on first render
  const firstShiftId = uuidv4();
  const secondShiftId = uuidv4();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // Link the react form and the resolver together for validation
    defaultValues: {
      workDays: [0, 1, 2, 3, 4],
      shifts: [
        {
          shiftId: firstShiftId,
          shiftName: 'Morning',
          shiftStartTime: '08:00',
          shiftEndTime: '12:00',
        },
        {
          shiftId: secondShiftId,
          shiftName: 'Evening',
          shiftStartTime: '15:00',
          shiftEndTime: '21:00',
        },
      ],
      employees: [
        {
          employeeId: -4,
          employeeName: 'Good Employee',
          employeeEmail: 'good@mail.com',
          workingDays: 5,
        },
        {
          employeeId: -3,
          employeeName: 'Bad Employee',
          employeeEmail: 'bad@mail.com',
          workingDays: 5,
        },
        {
          employeeId: -2,
          employeeName: 'Luigi',
          employeeEmail: 'luigi@mail.com',
          workingDays: 5,
        },
        {
          employeeId: -1,
          employeeName: 'Oisin',
          employeeEmail: 'oisin@mail.com',
          workingDays: 5,
        },
      ],
      numEmployeesAssigned: [
        {
          shiftId: firstShiftId,
          assignments: [
            { day: 0, numAssigned: 1 },
            { day: 1, numAssigned: 2 },
            { day: 2, numAssigned: 2 },
            { day: 3, numAssigned: 2 },
            { day: 4, numAssigned: 2 },
          ],
        },
        {
          shiftId: secondShiftId,
          assignments: [
            { day: 0, numAssigned: 1 },
            { day: 1, numAssigned: 2 },
            { day: 2, numAssigned: 2 },
            { day: 3, numAssigned: 2 },
            { day: 4, numAssigned: 2 },
          ],
        },
      ],
    },
  });
  const { trigger } = form;

  // Intermediate validation triggered when clicking next
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
  const { step, isFirstStep, isLastStep, currStepIndex, back, next } =
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

  // Example db POST request
  const submitToDB = async (data: any) => {
    // Send the POST request using fetch
    const res = await fetch('/api/store-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      // Assuming the API responds with a JSON object containing a 'redirect' property
      const jsonResponse = await res.json();
      if (jsonResponse.redirect) {
        // Use Next.js router to perform the client-side redirect
        import('next/router').then(({ useRouter }) => {
          router.push(jsonResponse.redirect);
        });
      }
    } else {
      console.error('Error:', res.statusText);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLastStep) {
      form.handleSubmit(async (data) => {
        console.log(data);
        setIsSubmitting(true);
        await submitToDB(data);
        push('/dashboard');
      })();
    } else {
      return nextPage();
    }
  };

  return (
    <div className='container mx-auto mt-20'>
      <ProgressBar currStepIndex={currStepIndex} />
      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-center space-y-4'
        >
          {step}
          {!isFirstStep && (
            <Button type='button' onClick={back}>
              Back
            </Button>
          )}
          <Button type='submit' onClick={handleSubmit} disabled={isSubmitting}>
            {isLastStep ? 'Finish' : 'Next'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StartForm;
