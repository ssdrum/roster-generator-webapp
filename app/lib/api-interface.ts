// Get user data from db
const genRoster = async () => {
  // Get user data
  const userData = await queryDB();
  console.log(userData.numEmployeesAssigned);

  // Construct object to send to API
  const num_employees: number = userData.employees.length;
  const num_days: number = userData.user.workDays.length;
  const num_shifts: number = userData.numEmployeesAssigned.length + 1; // Includes off shift
  const soft_days_off: boolean = true;

  const queryData = {
    num_employees: num_employees,
    num_days: num_days,
    num_shifts: num_shifts,
    soft_days_off: soft_days_off,
  };

  // query roster API
  const APIres = await queryRosterAPI(queryData);
  //console.log(APIres);

  const rosterData: any = [];

  APIres.data.forEach((element: any) => {
    const APIshifts = element.shifts;
    const shiftsAssigned: any = {};
    shiftsAssigned['employee'] =
      userData.employees[parseInt(element.employee_num) - 1].name;
    shiftsAssigned['shifts'] = APIshifts.map((shift: any, i: number) =>
      shift === 1
        ? null
        : { name: 'Blah', startTime: '8:00 AM', endTime: '4:00 PM' } // Temporary hardcoded
    );
    rosterData.push(shiftsAssigned);
  });

  return rosterData;
};

/* Queries and returns user information from database */
const queryDB = async () => {
  try {
    const res = await fetch('/api/fetch-data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

/* Queries roster and returns response object data API */
const queryRosterAPI = async (queryData: any) => {
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

// TODO
/* Processes roster API response and formats it correctly to be displayed on
 * dashboard
 */
const processAPIResponse = (userData, APIresponse) => {
  console.log('TODO');
};

export default genRoster;