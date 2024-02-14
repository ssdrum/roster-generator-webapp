import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import { getUserSession } from '@/app/lib/session';

export async function GET() {
  const user = await getUserSession();

  const data = await prisma.numEmployeesAssigned.findMany({
    where: { assignedBy: user.id },
    include: { Shift: true, countPerDay: true }, // Includes join data from other tables
  });

  return NextResponse.json({ data }, { status: 200 });
}
