import { Shift, Assignment } from '@prisma/client';
import EditShiftBtn from './edit-shift-dialog';
import { RosterAssignment } from '@/app/lib/formSchemas';

interface Props {
  id?: string;
  side: 'left' | 'right' | 'single' | 'both'; // the side to extend to, if any
  name?: string;
  startTime?: string;
  endTime?: string;
  employee: string;
  shifts: Shift[];
  assignment: RosterAssignment;
  day: number;
}

const RosterShift: React.FC<Props> = ({
  id,
  side,
  name,
  startTime,
  endTime,
  employee,
  shifts,
  assignment,
  day,
}) => {
  // apply the tailwind classes depending on the side prop we passed
  // this joins shift segments together if they're next to each other
  const adjustSide = () => {
    let result = 'my-4 p-4 shadow-lg'; // base classes

    switch (side) {
      case 'left':
        result += ' ml-4 rounded-l-lg flex-row-reverse';
        break;
      case 'right':
        result += ' mr-4 rounded-r-lg flex-row';
        break;
      case 'both':
        result += ' flex-row';
        break;
      default:
        result += ' mx-4 rounded-lg flex-row';
        break;
    }

    return result;
  };

  // helper function to turn a string into an int representation of the sum of its characters
  function stringToSum(s: string): number {
    let sum = 0;
    for (let i = 0; i < s.length; i++) {
      sum += s.charCodeAt(i);
    }
    return sum;
  }

  // calculate the colour based on the employee's name, turn it into a tailwind colour
  // dynamically assigning an employee a 'random' colour, but that employee will always get the same colour
  const calcColour = (employee: string) => {
    const sum = stringToSum(employee);
    // a choice selection of tailwind colours
    const colours = [
      '#991B1B',
      '#9A3412',
      '#3F6212',
      '#92400E',
      '#854D0E',
      '#3F6212',
      '#166534',
      '#065F46',
      '#115E59',
      '#155E75',
      '#075985',
      '#3730A3',
      '#5B21B6',
      '#6B21A8',
      '#86198F',
      '#9D174D',
      '#9F1239',
      '#1E293B',
    ];
    return colours[sum % colours.length];
  };

  return (
    // we need to apply the style using classic css since tailwind doesn't allow for dynamic colours
    <div
      style={{ backgroundColor: `${calcColour(employee)}` }}
      className={`h-16 text-white ${adjustSide()}`}
    >
      <div className='flex h-full flex-col justify-center'>
        <div className='flex justify-between text-sm font-semibold'>
          <p>{name}</p>
          <EditShiftBtn shifts={shifts} selected={id} assignment={assignment} day={day}/>
        </div>
        <div className='text-xs'>
          {startTime} - {endTime}
        </div>
      </div>
    </div>
  );
};

export default RosterShift;
