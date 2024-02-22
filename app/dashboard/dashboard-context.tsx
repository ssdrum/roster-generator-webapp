'use client';

import { FC, ReactNode, createContext } from 'react';
import {
  Employee,
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
  assignments: RosterAssignment[];
};

// Initialise context as undefined
export const DashboardContext = createContext<
  | {
      userData: User;
      employees: Employee[];
      shifts: Shift[];
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
  assignments,
}) => {
  return (
    <DashboardContext.Provider
      value={{
        userData: userData,
        employees: employees,
        shifts: shifts,
        assignments: assignments,
      }}
    >
      {children}
      <Toaster />
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
