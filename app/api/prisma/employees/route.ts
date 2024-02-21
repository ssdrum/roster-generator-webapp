import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import { getUserSession } from '@/app/lib/session';
import { Employee } from '@prisma/client';

/* Updates Employees data in the database */
export async function POST(req: any) {
  const { numDaysOff, employees } = await req.json();
  const session = await getUserSession();
  const userId = session.id;

  // check if shifts is an array
  if (!Array.isArray(employees)) {
    return NextResponse.json(
      { error: 'Employees array is required', employees: employees },
      { status: 400 }
    );
  }

  // Update number of days off
  const updatedNumDaysOff = await prisma.user.update({
    where: { id: userId },
    data: { numDaysOff: parseInt(numDaysOff, 10) },
  });

  // Update/insert employees
  const upsertEmployees = await Promise.all(
    employees.map(async (employee: Employee) => {
      const { id, name, email } = employee;

      return prisma.employee.upsert({
        where: {
          id: id,
        },
        update: {
          name: name,
          email: email,
        },
        create: {
          name: name,
          email: email,
          employedBy: userId,
        },
      });
    })
  );

  // get the ids of the employees to be deleted and delete them
  const deleteEmployeeIds = upsertEmployees.map((employee) => employee.id);

  // Delete employees
  const deleteemployees = await prisma.employee.deleteMany({
    where: {
      employedBy: userId,
      NOT: {
        id: {
          in: deleteEmployeeIds,
        },
      },
    },
  });

  return NextResponse.json(
    { employees: upsertEmployees, deletedemployees: deleteemployees },
    { status: 200 }
  );
}
