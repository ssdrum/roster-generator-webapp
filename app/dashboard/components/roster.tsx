// File: roster.tsx
// Description: the main component on the dashboard which shows the roster for the week
// Created  by: osh
//          at: 17:07 on Sunday, the 11th of February, 2024.
// Last edited: 23:31 on Sunday, the 11th of February, 2024.

// shadcn
import {
  Table,
  TableHeader,
  TableRow, 
  TableHead,
  TableBody,
  TableCell,

} from "@/app/ui/shadcn/table";
import Shift from "./shift";

interface Shift {
  name: string;
  startTime: string;
  endTime: string;
}

interface Assignment {
  employee: string;
  shifts: (Shift | null)[];
}

interface Props {
  assignments: Assignment[];
}

// can you generate me shifts following this schema? I want multiple employees each with multiple shifts. there 

const Roster: React.FC<Props> = ({ assignments }: Props) => {

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // the function for choosing which side the shift should extend to
  function determineSide(shifts: (Shift | null)[], index: number): string {

    // first one in the array
    if (index === 0) {
      return shifts[index + 1] !== null ? "left" : "single";
    }

    // last one in the array
    if (index === shifts.length - 1) {
      return shifts[index - 1] !== null ? "right" : "single";
    }

    if (shifts[index - 1] !== null && shifts[index + 1] !== null) {
      return "both";
    } else if (shifts[index - 1] !== null) {
      return "right";
    } else if (shifts[index + 1] !== null) {
      return "left";
    } else {
      return "single";
    }
  }

  return (
    <div className="border rounded-lg w-full">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px] border-r" />
              {days.map((day) => (
                <TableHead key={day} className="border-r">{day}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignments.map(({ employee, shifts}) => (
              <TableRow key={employee}>
                <TableCell className="font-medium w-64">{employee}</TableCell>
                {days.map((d, index) => (
                  <TableCell key={index} className="p-0 border-l">
                    {shifts !== null && shifts[index] !== null ? (
                      <Shift
                        side={determineSide(shifts, index) as "left" | "right" | "single" | "both"}
                        name={shifts[index]?.name}
                        startTime={shifts[index]?.startTime}
                        endTime={shifts[index]?.endTime}
                        employee={employee}
                      />
                    ) : (
                      ""
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Roster;