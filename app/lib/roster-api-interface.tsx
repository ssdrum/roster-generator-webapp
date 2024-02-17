import { Employee, Shift, User } from '@prisma/client';

type QueryData = {
  num_employees: number;
  num_days: number;
  num_shifts: number;
  soft_days_off: boolean;
};

const genRoster = async (
  user: User,
  employees: Employee[],
  shifts: Shift[]
) => {
  const num_employees = employees.length;
  const num_days = user.workDays.length;
  const num_shifts = shifts.length;
  const soft_days_off = true;

  const queryData = {
    num_employees: num_employees,
    num_days: num_days,
    num_shifts: num_shifts,
    soft_days_off: soft_days_off,
  };
  //
  // query roster API
  const APIres = await queryRosterAPI(queryData);
  console.log(APIres)
};

/* Queries roster and returns response object data API */
const queryRosterAPI = async (queryData: QueryData) => {
  try {
    const res = await fetch('/roster_api/make_roster', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(queryData),
    });

    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`);
    } else {
      const responseData = await res.json();
      return responseData;
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

export default genRoster;
