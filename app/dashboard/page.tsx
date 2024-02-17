import {
  fetchEmployees,
  fetchNumEmployeesAssigned,
  fetchShifts,
  fetchUserData,
} from '../lib/data';
import { getUserSession } from '../lib/session';
import Dashboard from './dashboard';

const FetchWrapper = async () => {
  // Retreive user id
  const user = await getUserSession();
  const userId = user.id;

  // Fetch all data related to user server-side
  const userData = await fetchUserData(userId);
  const employees = await fetchEmployees(userId);
  const shifts = await fetchShifts(userId);
  const numEmployeesAssigned = await fetchNumEmployeesAssigned(userId);

  return (
    <Dashboard
      user={userData}
      employees={employees}
      shifts={shifts}
      numEmployeesAssigned={numEmployeesAssigned}
    />
  );
};

export default FetchWrapper;
