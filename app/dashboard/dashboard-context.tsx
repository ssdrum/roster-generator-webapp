'use client';

import { FC, ReactNode, createContext } from 'react';
import {
  Assignment,
  Employee,
  NumEmployeesAssigned,
  Shift,
  User,
} from '@prisma/client';
import { Toaster } from '../ui/shadcn/ui/sonner';
import { RosterAssignment } from '../lib/formSchemas';

type Props = {
  children: ReactNode;
  userData: User;
  employees: Employee[];
  shifts: Shift[];
  numEmployeesAssigned: NumEmployeesAssigned[];
  assignments: RosterAssignment[];
};

// Initialise context as undefined
export const DashboardContext = createContext<
  | {
      userData: User;
      employees: Employee[];
      shifts: Shift[];
      numEmployeesAssigned: NumEmployeesAssigned[];
      assignments: RosterAssignment[];
    }
  | undefined
>(undefined);

// Takes user data as props and stores them in a context object
const DashboardProvider: FC<Props> = ({
  children,
  userData,
  employees,
  shifts,
  numEmployeesAssigned,
  assignments,
}) => {
  return (
    <DashboardContext.Provider
      value={{
        userData: userData,
        employees: employees,
        shifts: shifts,
        numEmployeesAssigned: numEmployeesAssigned,
        assignments: assignments,
      }}
    >
      {children}
      <Toaster />
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
