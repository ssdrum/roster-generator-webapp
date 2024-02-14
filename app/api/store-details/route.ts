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
  const createShifts = await Promise.all(
    shifts.map(async (shiftData: any) => {
      const { shiftName, shiftStartTime, shiftEndTime } = shiftData;

      const shift = await prisma.shift.create({
        data: {
          name: shiftName,
          startTime: shiftStartTime,
          endTime: shiftEndTime,
          createdBy: user.id,
        },
      });
      return shift;
    })
  );

  // employees
  const createEmployees = await Promise.all(
    employees.map(async (employeeData: any) => {
      const { employeeEmail, employeeName } = employeeData;

      const employee = await prisma.employee.create({
        data: {
          name: employeeName,
          email: employeeEmail,
          employedBy: user.id,
        },
      });
      return employee;
    })
  );

  return NextResponse.json(
    { message: 'Data stored successfully' },
    { status: 200 }
  );
}
