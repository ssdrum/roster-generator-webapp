'use client';

import { FC, ReactNode, createContext, useState } from 'react';
import { Employee, NumEmployeesAssigned, Shift, User } from '@prisma/client';

type Props = {
  children: ReactNode;
  user: User;
  employees: Employee[];
  shifts: Shift[];
  numEmployeesAssigned: NumEmployeesAssigned[];
};

// Initialise context as undefined
export const DashboardContext = createContext<
  | {
      user: User;
      employees: Employee[];
      shifts: Shift[];
      numEmployeesAssigned: NumEmployeesAssigned[];
    }
  | undefined
>(undefined);

// Takes user data as props and stores them in a context object
const DashboardProvider: FC<Props> = ({
  children,
  user,
  employees,
  shifts,
  numEmployeesAssigned,
}) => {
  return (
    <DashboardContext.Provider
      value={{
        user: user,
        employees: employees,
        shifts: shifts,
        numEmployeesAssigned: numEmployeesAssigned,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
