import { FormEvent } from 'react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import useMultiStepForm from '@/app/ui/multistep-form/useMultiStepForm';
import ProgressBar from '@/app/ui/multistep-form/progress-bar';
import { Day, formSchema } from '../schemas/formSchemas';
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
      employeesAssigned: {},
    },
  });

  // break it into form components
  const { step, steps, isFirstStep, isLastStep, currStepIndex, back, next } =
    useMultiStepForm([
      <WorkDetails key={'one'} form={form} days={days} />,
      <EmployeeDetails key={'two'} form={form} />,
      // Temporarily dummy data
      <GridSelector
        workDays={[0, 1, 2, 3, 4, 5]}
        shifts={[
          { name: 'Morning', startTime: '08:00', endTime: '15:00' },
          { name: 'Evening', startTime: '15:00', endTime: '21:00' },
        ]}
        form={form}
      />,
    ]);

  // const onSubmit = (values: z.infer<typeof formSchema>) => {
  //   console.log("form submitted"); // yeah we console logging for now woo
  // }
  //

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLastStep) {
      form.handleSubmit(async (data) => {
        console.log(data);
      })();
    } else {
      return next();
    }
  };

  return (
    <>
      <ProgressBar currStepIndex={currStepIndex} />
      <Form {...form}>
        <form onSubmit={handleSubmit} className='space-y-4'>
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
          <Button
            type='submit'
            className='last-step fixed bottom-10 right-36 m-8'
          >
            {isLastStep ? 'Finish' : 'Next'}
          </Button>
        </form>
      </Form>
    </>
  );
}
