import { prisma } from '@/app/lib/prisma';
import { User, Employee, Shift, Assignment } from '@prisma/client';

/* Collection of functions to interact with database */

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
