import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import { getUserSession } from '@/app/lib/session';

export async function GET(req: any) {
  const user = await getUserSession();

  const data = await prisma.shift.findMany({
    where: { createdBy: user.id },
  });

  return NextResponse.json({ data }, { status: 200 });
}

export async function POST(req: any) {
  const shifts = await req.json();
  console.log('req ', await shifts);
  const user = await getUserSession();

  // check if shifts is an array
  if (!Array.isArray(shifts)) {
    return NextResponse.json(
      { error: 'Shifts array is required', shifts: shifts },
      { status: 400 }
    );
  }

  const upsertShifts = await Promise.all(
    shifts.map(async (shift: any) => {
      const { id, name, startTime, endTime } = shift;

      return prisma.shift.upsert({
        where: {
          id: id,
        },
        update: {
          name: name,
          startTime: startTime,
          endTime: endTime,
        },
        create: {
          name: name,
          startTime: startTime,
          endTime: endTime,
          createdBy: user.id,
        },
      });
    })
  );

  // get the ids of the shifts to be deleted and delete them
  const deleteShiftIds = upsertShifts.map((shift) => shift.id);
  const deleteShifts = await prisma.shift.deleteMany({
    where: {
      createdBy: user.id,
      NOT: {
        id: {
          in: deleteShiftIds,
        },
      },
    },
  });

  return NextResponse.json(
    { shifts: upsertShifts, deletedShifts: deleteShifts },
    { status: 200 }
  );
}
