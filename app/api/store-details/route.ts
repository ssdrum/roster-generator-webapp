import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import { getUserSession } from '@/app/lib/session';
import {
  ShiftType,
  EmployeeType,
  AllNumAssignedSchema,
} from '@/app/lib/formSchemas';

type PostReq = {
    json: () => any;
};

export async function POST(req: PostReq): Promise<NextResponse> {
  const user = await getUserSession();
  const data = await req.json();

  const { workDays, shifts, employees, numEmployeesAssigned } = data;

  // Update the user's workDays
  await prisma.user.update({
    where: { id: user.id },
    data: { workDays },
  });

  // Associates client-side shift ids with database shift ids
  const shiftsIdMap: { [key: string]: string } = {};

  // Create shifts and assign them to the user
  const createdShifts = await Promise.all(
    shifts.map(async (shiftData: ShiftType) => {
      const { shiftId, shiftName, shiftStartTime, shiftEndTime } = shiftData;

      const shift = await prisma.shift.create({
        data: {
          name: shiftName,
          startTime: shiftStartTime,
          endTime: shiftEndTime,
          createdBy: user.id,
        },
      });

      shiftsIdMap[shiftId] = shift.id;
    })
  );

  // Create employees and assign them to the user
  Promise.all(
    employees.map(async (employeeData: EmployeeType) => {
      const { employeeEmail, employeeName } = employeeData;
      const employee = await prisma.employee.create({
        data: {
          name: employeeName,
          email: employeeEmail,
          employedBy: user.id,
        },
      });
    })
  );

  // Create numEmployeesAssigned and assign them to the shifts
  await Promise.all(
    numEmployeesAssigned.map(
      async (numEmployeesAssignedData: AllNumAssignedSchema) => {
        const { shiftId, assignments } = numEmployeesAssignedData;

        const shift = await prisma.shift.findUnique({
          where: {
            id: shiftsIdMap[shiftId],
          },
        });

        const numEmployeesAssigned = await prisma.numEmployeesAssigned.create({
          data: {
            Shift: {
              connect: { id: shift?.id },
            },
            countPerDay: {
              createMany: {
                data: assignments.map((assignment: any) => ({
                  day: assignment.day,
                  numAssigned: assignment.numAssigned,
                })),
              },
            },
            User: {
              connect: { id: user.id }, // Connect the current user as the one who assigned this record
            },
          },
        });
      }
    )
  );

  return NextResponse.json(
    { message: 'Data stored successfully' },
    { status: 200 }
  );
}
