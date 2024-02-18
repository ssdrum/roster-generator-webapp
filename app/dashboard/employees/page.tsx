import EditEmployees from '../components/edit-employees';
import Title from '@/app/ui/title';

const EmployeesPage = () => {
  return (
    <>
      <Title title={'Employees'} />
      <EditEmployees />
      );
    </>
  );
};

export default EmployeesPage;
