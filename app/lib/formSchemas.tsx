import { z } from 'zod';

// Start form schemas

// ************* First page *************
export const shiftSchema = z.object({
  id: z.string(),
  name: z.string().min(1, {
    message: 'Please give the shift a name.',
  }),
  startTime: z.string(),
  endTime: z.string(),
});

// ************* Second page *************
const employeeSchema = z.object({
  employeeId: z.number(),
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

// ************* Third page *************

/* Number of employees assigned to a shift on a particular day
 *   Example: {day: 0, numAssigned: 3}
 */
const numAssignedSchema = z.object({
  day: z.number(),
  numAssigned: z.number(),
});

/* Number of employees assigned to a shift, for every working day
     Example: [{shiftId: 0, assignments: [{day: 0, numAssigned: 2}, {day: 1, numAssigned: 3}, ...], ...]
 */
const allNumAssignedSchema = z.object({
  shiftId: z.string(),
  assignments: z.array(numAssignedSchema),
});

// Main form schema
export const formSchema = z.object({
  workDays: z.array(z.number()).min(1, {
    message: "Please select at least one day that you're open.",
  }),
  shifts: z.array(shiftSchema),
  employees: z.array(employeeSchema),
  numEmployeesAssigned: z.array(allNumAssignedSchema),
});

// Edit pages schemas
export const editShiftSchema = z.object({
  shifts: z.array(shiftSchema),
});

export const editEmployeeSchema = z.object({
  employees: z.array(employeeSchema),
});

// Export types
export type FormType = z.infer<typeof formSchema>;
export type ShiftType = z.infer<typeof shiftSchema>;
export type EmployeeType = z.infer<typeof employeeSchema>;
export type NumAssignedType = z.infer<typeof numAssignedSchema>;
export type AllNumAssignedSchema = z.infer<typeof allNumAssignedSchema>;
export type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';
