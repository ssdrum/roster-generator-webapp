import { NumEmployeesAssigned } from '@prisma/client';

/* Takes assignments data in prisma format and returns it in a format suitable for assignment-grid */
export const transformData = (inputData: NumEmployeesAssigned[]) => {
  const transformedData: any = []; // Return object

  inputData.forEach((shift: any) => {
    const assignment: any = {};

    assignment.shiftId = shift.shift;
    assignment.assignments = [];
    shift.countPerDay.forEach((count: any) => {
      const c = { day: count.day, numAssigned: count.numAssigned };
      assignment.assignments.push(c);
    });
    transformedData.push(assignment);
  });

  return transformedData;
};
