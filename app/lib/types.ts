// Roster data
type EmployeeShift = {
  employee_name: string;
  shifts: number[];
};

export type Roster = {
  status: number;
  week_length: number;
  data: EmployeeShift[];
} | null;

export type Session = {
  name: string;
  email: string;
  image: string;
  id: string;
};
