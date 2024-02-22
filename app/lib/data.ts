import { prisma } from '@/app/lib/prisma';
import { User, Employee, Shift } from '@prisma/client'; // Prisma generates classess associated with the models defined in the schema automatically
import { RosterAssignment } from './formSchemas';

/* Collection of functions to fetch data from the database */
export const fetchUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  return users;
};

export const fetchUserData = async (userId: string): Promise<User> => {
  /* Returns user data */
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user!;
};

export const fetchEmployees = async (userId: string): Promise<Employee[]> => {
  /* Returns all employees created by user */
  const employees = await prisma.employee.findMany({
    where: {
      employedBy: userId,
    },
  });
  return employees;
};

export const fetchShifts = async (userId: string): Promise<Shift[]> => {
  /* Returns all shifts created by user */
  const shifts = await prisma.shift.findMany({
    where: {
      createdBy: userId,
    },
  });
  return shifts;
};

export const fetchAssignments = async (
  userId: string
): Promise<RosterAssignment[]> => {
  // load all of the assignments from the database, grouped by assignedTo
  const data = await prisma.assignment.findMany({
    where: { assignedBy: userId },
  });

  // get the user data so that we can get the week length to create our array of shifts
  const userData = await prisma.user.findFirstOrThrow({
    where: { id: userId },
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

  // Return roster sorted on the employees names in ascending order
  // Credits: https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  rosterAssignments.sort((a: RosterAssignment, b: RosterAssignment): number => {
    const empA = a.employee.name.toLowerCase();
    const empB = b.employee.name.toLowerCase();
    if (empA < empB) {
      return -1;
    }
    if (empB > empB) {
      return 1;
    }
    return 0;
  });

  return rosterAssignments;
};
