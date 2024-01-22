// Roster data
type Shift = {
  [employee_name: string]: number[];
};

export type Roster = {
  week_length: number;
  shifts: Shift;
} | null;
