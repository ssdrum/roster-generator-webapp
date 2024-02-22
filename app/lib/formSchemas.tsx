import { Employee, Shift } from '@prisma/client';
import { z } from 'zod';

// Start form schemas

// ************* First page *************
const shiftSchema = z.object({
  id: z.string(),
  name: z.string().min(1, {
    message: 'Please give the shift a name.',
  }),
  startTime: z.string(),
  endTime: z.string(),
});

// ************* Second page *************
const employeeSchema = z.object({
  id: z.string(),
  name: z.string().min(2, {
    message: 'Please enter a name longer than two characters.',
  }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  createdBy: z.string(),
});

// ************* Third page *************

/* Number of employees assigned to a shift on a particular day
 *   Example: {day: 0, numAssigned: 3}
 */
const numAssignedSchema = z.object({
  day: z.number(),
  numAssigned: z.number(),
});

// Main form schema
export const formSchema = z.object({
  workDays: z.array(z.number()).min(1, {
    message: "Please select at least one day that you're open.",
  }),
  shifts: z.array(shiftSchema),
  numDaysOff: z.coerce // Convert string input to number. (No, just using .number doesn't work)
    .number()
    .min(0, { message: 'Please enter a valid number of days off' })
    .max(4, { message: 'Number of days off must be less than 5' }),
  employees: z.array(employeeSchema),
});

// Edit pages schemas
export const editShiftSchema = z.object({
  shifts: z.array(shiftSchema),
});

export const editEmployeeSchema = z.object({
  numDaysOff: z.coerce // Convert string input to number. (No, just using .number doesn't work)
    .number()
    .min(0, { message: 'Please enter a valid number of days off' })
    .max(4, { message: 'Number of days off must be less than 5' }),
  employees: z.array(employeeSchema),
});

export type RosterAssignment = {
  employee: Employee;
  shiftsAssigned: (Shift | null)[];
};

// Export types
export type FormType = z.infer<typeof formSchema>;
export type ShiftType = z.infer<typeof shiftSchema>;
export type EmployeeType = z.infer<typeof employeeSchema>;
export type NumAssignedType = z.infer<typeof numAssignedSchema>;
export type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';
