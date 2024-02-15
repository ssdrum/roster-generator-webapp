import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import { getUserSession } from '@/app/lib/session';

/* API endpoint that fetches user info from the database */
export async function GET() {
  const session = await getUserSession();
  const userId = session.id;

  // Fetch necessary data from database
  const numEmployeesAssigned = await prisma.numEmployeesAssigned.findMany({
    where: { assignedBy: userId },
    include: { Shift: true, countPerDay: true }, // Includes join data from other tables
  });

  const employees = await prisma.employee.findMany({
    where: { employedBy: userId },
  });

  const user = await prisma.user.findFirst({ where: { id: userId } })!;

  console.log(numEmployeesAssigned)


  // Return object
  const data = {
    user: user,
    employees: employees,
    numEmployeesAssigned: numEmployeesAssigned,
  };

  return NextResponse.json(data, { status: 200 });
}
