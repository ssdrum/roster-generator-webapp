import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import { getUserSession } from '@/app/lib/session';
import { ShiftType, EmployeeType } from '@/app/lib/formSchemas';

export async function POST(req: any): Promise<NextResponse> {
  const session = await getUserSession();
  const userId = session.id;
  const data = await req.json();

  const { workDays, shifts, numDaysOff, employees } = data;

  // Update the user's workDays
  await prisma.user.update({
    where: { id: userId },
    data: { workDays, numDaysOff: numDaysOff, isNewUser: false },
  });

  // Associates client-side shift ids with database shift ids
  const shiftsIdMap: { [key: string]: string } = {};

  // Create shifts and assign them to the user
  const createdShifts = await Promise.all(
    shifts.map(async (shiftData: ShiftType) => {
      const { id, name, startTime, endTime } = shiftData;

      const shift = await prisma.shift.create({
        data: {
          name: name,
          startTime: startTime,
          endTime: endTime,
          createdBy: userId,
        },
      });

      shiftsIdMap[id] = shift.id;
    })
  );

  // Create employees and assign them to the user
  Promise.all(
    employees.map(async (employeeData: EmployeeType) => {
      const { email, name } = employeeData;
      const employee = await prisma.employee.create({
        data: {
          name: name,
          email: email,
          employedBy: userId,
        },
      });
    })
  );

  return NextResponse.json(
    { message: 'Data stored successfully' },
    { status: 200 }
  );
}
