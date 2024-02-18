'use client';

import { FC, createContext, useState } from 'react';
import { Employee, NumEmployeesAssigned, Shift, User } from '@prisma/client';
import Dashboard from './dashboard';

type Props = {
  user: User;
  employees: Employee[];
  shifts: Shift[];
  numEmployeesAssigned: NumEmployeesAssigned[];
};

export const DashboardContext = createContext<Props | undefined>(undefined)

// Takes user data as props and stores them in a context object
const DashboardProvider: FC<Props> = ({
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
      <Dashboard />
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
