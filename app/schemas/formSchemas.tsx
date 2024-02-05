import { z } from 'zod';

const shiftSchema = z.object({
  shiftName: z.string().min(1, {
    message: 'Please give the shift a name.',
  }),
  shiftStartTime: z.string(),
  shiftEndTime: z.string(),
});

export const employeeSchema = z.object({
  employeeName: z.string().min(2, {
    message: 'Please enter a name longer than two characters.',
  }),
  employeeEmail: z.string().email({ message: 'Please enter a valid email.' }),
  workingDays: z
    .number()
    .min(1, {
      message: 'Employees must work at least one day a week.',
    })
    .max(7, {
      message: 'Employees cannot work more days than exists in a week.',
    }),
});

export const gridAssignmentSchema = z.object({
})

// create the form schema
export const formSchema = z.object({
  workDays: z.array(z.number()).min(1, {
    message: "Please select at least one day that you're open.",
  }),
  shifts: z.array(shiftSchema), // an array of shifts
  employees: z.array(employeeSchema), // an array of employee details
  employeesAssigned: z
    .array(z.number()) // the list of workers per day in the week
    .refine((arr) => !arr.includes(0), {
      message: 'Array must not contain 0',
    }),
});

export type FormType = z.infer<typeof formSchema>;
export type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';
