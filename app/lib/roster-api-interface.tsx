import { Employee, Shift, User } from '@prisma/client';

// Define the structure of the query data
type QueryData = {
  num_employees: number;
  num_days: number;
  num_shifts: number;
  num_days_off: number;
  soft_days_off: boolean;
};

/**
 * Generates a roster based on user, employees, and shifts data.
 * @param user The user for whom the roster is generated.
 * @param employees An array of employees.
 * @param shifts An array of shifts.
 * @returns The generated roster data.
 */
const genRoster = async (
  userData: User,
  employees: Employee[],
  shifts: Shift[]
) => {
  // Calculate the number of employees, days, and shifts
  const num_employees = employees.length;
  const num_days = userData.workDays.length;
  const num_shifts = shifts.length;
  const num_days_off = userData.numDaysOff;
  const soft_days_off = false; // Soft days off flag

  // Prepare query data object
  const queryData: QueryData = {
    num_employees: num_employees,
    num_days: num_days,
    num_shifts: num_shifts + 1, // Being off is considered a shift by the API, so we add 1.
    num_days_off: num_days_off,
    soft_days_off: soft_days_off,
  };

  // Call the roster API to generate the roster
  const APIres = await queryRosterAPI(queryData);

  // Process the API response to get the roster data in a suitable format
  const rosterData = processAPIResponse(APIres, employees, shifts);

  return rosterData;
};

/**
 * Queries the roster API with the provided query data.
 * @param queryData The query data to be sent to the API.
 * @returns The response data from the API.
 */
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

/**
 * Processes the API response and converts it into roster data.
 * @param APIres The API response data.
 * @param employees An array of employees.
 * @param shifts An array of shifts.
 * @returns The roster data in a suitable format.
 */
const processAPIResponse = (
  APIres: any,
  employees: Employee[],
  shifts: Shift[]
) => {
  const rosterData: any = { numSolutions: 0, status: APIres.status, data: [] };

  // If status returned by API is 1, constraint are unfeasible
  if (APIres.status === 1) {
    return rosterData;
  }

  rosterData.numSolutions = APIres.num_solutions;

  // Iterate through each assignment in the API response
  APIres.data.forEach((APIassignment: any) => {
    const clientAssignment: any = {}; // Initialize client assignment object

    // Set employee name for the assignment
    clientAssignment.employee = {
      id: employees[parseInt(APIassignment.employee_num) - 1].id,
      name: employees[parseInt(APIassignment.employee_num) - 1].name,
    };

    // Construct shifts array for the assignment
    clientAssignment.shiftsAssigned = [];
    APIassignment.shifts.forEach((shift: number) => {
      if (shift === 1) {
        // If the shift is off, push null
        clientAssignment.shiftsAssigned.push(null);
      } else {
        const id = shifts[shift - 2].id;
        const name = shifts[shift - 2].name; // Shifts are 1-indexed, so subtract 2
        const startTime = shifts[shift - 2].startTime;
        const endTime = shifts[shift - 2].endTime;

        // Push shift details to the shifts array
        clientAssignment.shiftsAssigned.push({
          id: id,
          name: name,
          startTime: startTime,
          endTime: endTime,
        });
      }
    });

    rosterData.data.push(clientAssignment);
  });

  return rosterData;
};

export default genRoster;
