// Roster data
type ShiftData = {
  [employee_name: string]: number[];
};

export type RosterData = {
  week_length: number;
  shifts: ShiftData;
};
