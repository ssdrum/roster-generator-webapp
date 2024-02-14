import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import { getUserSession } from '@/app/lib/session';

export async function POST(req: any) {
  const user = await getUserSession();
  const data = await req.json();

  const { workDays, shifts, employees, numEmployeesAssigned } = data;

  // Update the user's workDays
  await prisma.user.update({
    where: { id: user.id },
    data: { workDays },
  });

  // Create shifts and assign them to the user
  await Promise.all(
    shifts.map(async (shiftData: any) => {
      const { shiftName, shiftStartTime, shiftEndTime, shiftId } = shiftData;

      const shift = await prisma.shift.create({
        data: {
          tempID: shiftId,
          name: shiftName,
          startTime: shiftStartTime,
          endTime: shiftEndTime,
          createdBy: user.id,
        },
      });
    })
  );

  // Create employees and assign them to the user
  Promise.all(
    employees.map(async (employeeData: any) => {
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
    numEmployeesAssigned.map(async (numEmployeesAssignedData: any) => {
      const { shiftId, assignments } = numEmployeesAssignedData;

      const shift = await prisma.shift.findUnique({
        where: {
          tempID: shiftId,
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
        },
      });
    })
  );

  return NextResponse.json(
    { message: 'Data stored successfully' },
    { status: 200 }
  );
}
