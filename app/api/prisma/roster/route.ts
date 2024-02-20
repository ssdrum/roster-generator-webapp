import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import { getUserSession } from '@/app/lib/session';
import { RosterAssignment } from '@/app/lib/formSchemas';

export async function POST(req: any) {
  const data = await req.json(); // Assuming the request body contains the data in the specified schema
  const user = await getUserSession();

  // delete all of the assignments before saving the new one
  const deleteAssignments = await prisma.assignment.deleteMany({
    where: {
      assignedBy: user.id,
    },
  });

  const createAssignments = await Promise.all(
    // map over the input data
    data.map(async (data: any) => {
      const { employee, shiftsAssigned } = data;

      // map over the shifts subarray
      return Promise.all(
        shiftsAssigned.map(async (shift: any, index: number) => {
          if (shift) {
            // skip the entries where there is no shift for that day (it's null)

            return prisma.assignment.create({
              data: {
                day: index,
                assignedBy: user.id,
                shift: shift.id,
                assignedTo: employee.id,
              },
            });
          }
        })
      );
    })
  );

  return NextResponse.json(
    { createdAssignments: createAssignments },
    { status: 200 }
  );
}

export async function GET() {
  const user = await getUserSession();

  // load all of the assignments from the database, grouped by assignedTo
  const data = await prisma.assignment.findMany({
    where: { assignedBy: user.id },
  });

  // get the user data so that we can get the week length to create our array of shifts
  const userData = await prisma.user.findFirstOrThrow({
    where: { id: user.id },
  });

  // group the data by employee
  const groupedData = data.reduce((data: any, index) => {
    if (!data[index.assignedTo]) {
      data[index.assignedTo] = [];
    }
    data[index.assignedTo].push(index);
    return data;
  }, {});

  let rosterAssignments: RosterAssignment[] = [];

  // loop over the different employees to get the shifts they are assigned
  for (let assignment in groupedData) {
    // fetch the employee from the db
    let employee = await prisma.employee.findFirstOrThrow({
      where: { id: assignment },
    });

    // create the shift array by looping over the shifts and adding them to the right index by the day
    let shifts = new Array(userData.workDays.length).fill(null);
    await Promise.all(
      groupedData[assignment].map(async (assignment: any) => {
        let shift = await prisma.shift.findFirstOrThrow({
          where: { id: assignment.shift },
        });
        shifts[assignment.day] = shift;
      })
    );

    // add the roster to our rosters
    rosterAssignments.push({
      employee: employee,
      shiftsAssigned: shifts,
    });
  }

  return NextResponse.json({ rosterAssignments }, { status: 200 });
}

export async function PATCH(req: any) {
  const user = await getUserSession();
  const data = await req.json();

  // get the assignment from the database where all the fields match
  const assignment = await prisma.assignment.findFirstOrThrow({
    where: {
      assignedBy: user.id,
      assignedTo: data.assignment.employee.id,
      day: data.day,
    },
  });

  if (data.shift === null) {
    // if assignment.shift is null, delete the shift
    const deletedAssignment = await prisma.assignment.delete({
      where: {
        id: assignment.id,
      },
    });
  } else {
    // if assignment.shift is not null, update the shift
    const updatedAssignment = await prisma.assignment.update({
      where: {
        id: assignment.id,
      },
      data: {
        shift: data.shift,
      },
    });
  }

  return NextResponse.json({ message: 'success' }, { status: 200 });
}

export async function PUT(req: any) {
  const user = await getUserSession();
  const data = await req.json();

  const assignment = await prisma.assignment.create({
    data: {
      day: data.day,
      assignedBy: user.id,
      shift: data.shift,
      assignedTo: data.assignment.employee.id,
    },
  });

  return NextResponse.json({ assignment }, { status: 200 });
}
