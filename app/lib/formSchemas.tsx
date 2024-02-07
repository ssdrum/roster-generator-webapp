import { z } from 'zod';

export const shiftSchema = z.object({
  shiftName: z.string().min(1, {
    message: 'Please give the shift a name.',
  }),
  shiftStartTime: z.string(),
  shiftEndTime: z.string(),
});

const employeeSchema = z.object({
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

const shiftAssignmentSchema = z.record(z.string(), z.number());
export const allShiftsSchema = z.record(z.string(), shiftAssignmentSchema);

// create the form schema
export const formSchema = z.object({
  workDays: z.array(z.number()).min(1, {
    message: "Please select at least one day that you're open.",
  }),
  shifts: z.array(shiftSchema), // an array of shifts
  employees: z.array(employeeSchema), // an array of employee details
  numEmployeesAssigned: allShiftsSchema,
});

export type FormType = z.infer<typeof formSchema>;
export type ShiftType = z.infer<typeof shiftSchema>;
export type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';
