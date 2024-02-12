import { z } from 'zod';

// First page
export const shiftSchema = z.object({
  shiftId: z.number(),
  shiftName: z.string().min(1, {
    message: 'Please give the shift a name.',
  }),
  shiftStartTime: z.string(),
  shiftEndTime: z.string(),
});

// Second page
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

// Third page

// Example: {day: 0, numAssigned: 3}
const assignmentSchema = z.object({
  day: z.number(),
  numAssigned: z.number(),
});

// Example: [{shiftId: 0, shiftName: Morning, assignments: [{day: 0, numAssigned: 2}, {day: 1, numAssigned: 3}]]
const weeklyAssignmentsSchema = z.object({
  shiftId: z.number(),
  assignments: z.array(assignmentSchema),
});

// Main form schema
export const formSchema = z.object({
  workDays: z.array(z.number()).min(1, {
    message: "Please select at least one day that you're open.",
  }),
  shifts: z.array(shiftSchema), // an array of shifts
  employees: z.array(employeeSchema), // an array of employee details
  numEmployeesAssigned: z.array(weeklyAssignmentsSchema),
});

// Types
export const editShiftSchema = z.object({
  shifts: z.array(shiftSchema),
});

export const editEmployeeSchema = z.object({
  employees: z.array(employeeSchema),
});

export type FormType = z.infer<typeof formSchema>;
export type ShiftType = z.infer<typeof shiftSchema>;
export type singleAssignmentType = z.infer<typeof assignmentSchema>;
export type WeeklyAssignmentsType = z.infer<typeof weeklyAssignmentsSchema>;
export type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';
