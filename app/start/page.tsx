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
import { Day, formSchema } from '@/app/lib/formSchemas';
import WorkDetails from '@/app/start/components/work-details';
import EmployeeDetails from '@/app/start/components/employee-details';
import GridSelector from '@/app/start/components/grid-selector';
import Title from '@/app/ui/title';
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
          id: firstShiftId,
          name: 'Morning',
          startTime: '08:00',
          endTime: '12:00',
        },
        {
          id: secondShiftId,
          name: 'Evening',
          startTime: '15:00',
          endTime: '21:00',
        },
      ],
      numDaysOff: 0,
      employees: [
        {
          id: '0',
          name: 'Good Employee',
          email: 'good@mail.com',
          createdBy: '',
        },
        {
          id: '1',
          name: 'Bad Employee',
          email: 'bad@mail.com',
          createdBy: '',
        },
        {
          id: '2',
          name: 'Luigi',
          email: 'luigi@mail.com',
          createdBy: '',
        },
        {
          id: '3',
          name: 'Oisin',
          email: 'oisin@mail.com',
          createdBy: '',
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

  // Submit all form data to db
  const submitToDB = async (data: any) => {
    // Send the POST request using fetch
    const res = await fetch('/api/prisma/store-initial-details', {
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
        router.push(jsonResponse.redirect);
      }
    } else {
      console.error('Error:', res.statusText);
    }
  };

  // Submit data and go to /dashboard if on last page. Go on next page otherwise
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLastStep) {
      form.handleSubmit(async (data) => {
        setIsSubmitting(true);
        await submitToDB(data);
        alert("You're all set! Time to generate your first roster!");
        push('/dashboard');
      })();
    } else {
      return nextPage();
    }
  };

  // Dynamically selected title
  let currTitle = '';
  switch (currStepIndex) {
    case 0:
      currTitle = 'Business Details';
      break;
    case 1:
      currTitle = 'Employees';
      break;
    case 2:
      currTitle = 'Employees per Shift';
      break;
  }

  return (
    <div className='container mx-auto mt-20'>
      <ProgressBar currStepIndex={currStepIndex} />
      <Title title={currTitle} />
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
