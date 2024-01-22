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
