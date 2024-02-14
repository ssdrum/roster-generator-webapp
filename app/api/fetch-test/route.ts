import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import { getUserSession } from '@/app/lib/session';

export async function GET() {
  const user = await getUserSession();
  const userId = user.id;

  // Fetch necessary data from database
  const numAssignedData = await prisma.numEmployeesAssigned.findMany({
    where: { assignedBy: userId },
    include: { Shift: true, countPerDay: true }, // Includes join data from other tables
  });

  const employees = await prisma.employee.findMany({
    where: { employedBy: userId },
  });

  const userData = await prisma.user.findFirst({ where: { id: userId } })!;

  // Construct data object
  const num_employees = employees.length;
  const num_days = userData?.workDays.length;
  const num_shifts = numAssignedData.length;

  const data = {
    num_employees: num_employees,
    num_days: num_days,
    num_shifts: num_shifts,
    soft_days_off: false
  };

  console.log(data)

  // Query API
  const queryRosterAPI = async (data: any) => {
    try {
      const res = await fetch('/my_api/make_roster', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Check if the response was successful
      if (!res.ok) {
        console.error(`HTTP error! status: ${res.status}`);
      } else {
        // If successful, you may want to process the response further
        const responseData = await res.json();
        console.log(responseData);
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
    }
  };

  queryRosterAPI(data)

  return NextResponse.json({ data }, { status: 200 });
}
