import { prisma } from '@/app/lib/prisma';
import {
  User,
  Employee,
  Shift,
  Assignment,
  NumEmployeesAssigned,
} from '@prisma/client'; // Prisma generates classess associated with the models defined in the schema automatically


/* Collection of functions to fetch data from the database */
export const fetchUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  return users;
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

export const fetchNumEmployeesAssigned = async (
  userId: string
): Promise<NumEmployeesAssigned[]> => {
  /* Returns data from NumEmployeesAssigned table */
  const numEmployeesAssigned = await prisma.numEmployeesAssigned.findMany({
    where: {
      assignedBy: userId,
    },
    include: { Shift: true, countPerDay: true },
  });
  return numEmployeesAssigned;
};

export const fetchAssignments = async (
  userId: string
): Promise<Assignment[]> => {
  /* Returns all assignments created by user */
  const assignments = await prisma.assignment.findMany({
    where: {
      assignedBy: userId,
    },
  });
  return assignments;
};
