import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import { getUserSession } from '@/app/lib/session';

// To handle a POST request to /api
export async function POST(req: any) {
  // Do whatever you want
  const user = await getUserSession();
  const data = await req.json();

  const { workDays } = data;

  const testUpsert = await prisma.user.update({
    where: { id: user.id },
    data: { workDays: workDays },
  });

  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}
