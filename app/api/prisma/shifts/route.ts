import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import { getUserSession } from '@/app/lib/session';
import { Shift } from '@prisma/client';

/* Updates Employees data in the database */
export async function POST(req: any) {
  const shifts = await req.json();
  const session = await getUserSession();
  const userId = session.id;

  // check if shifts is an array
  if (!Array.isArray(shifts)) {
    return NextResponse.json(
      { error: 'Shifts array is required', shifts: shifts },
      { status: 400 }
    );
  }

  // Updarte/insert shifts
  const upsertShifts = await Promise.all(
    shifts.map(async (shift: Shift) => {
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
          createdBy: userId,
        },
      });
    })
  );

  // Get the ids of the shifts to be deleted and delete them
  const deleteShiftIds = upsertShifts.map((shift) => shift.id);

  // Delete shifts
  const deleteShifts = await prisma.shift.deleteMany({
    where: {
      createdBy: userId,
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
