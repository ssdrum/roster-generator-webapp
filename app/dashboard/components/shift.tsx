// File: shift.tsx
// Description: the component that renders in the grid for the shift, takes the values as a prop
// Created  by: root
//          at: 22:50 on Sunday, the 11th of February, 2024.
// Last edited: 23:59 on Sunday, the 11th of February, 2024.

interface Details {
  side: "left" | "right" | "single" | "both"; // the side to extend to, if any
  name?: string;
  startTime?: string;
  endTime?: string;
  employee: string;
}

const Shift: React.FC<Details> = ({ side, name, startTime, endTime, employee }: Details) => {

  // apply the tailwind classes depending on the side prop we passed 
  // this joins shift segments together if they're next to each other
  const adjustSide = () => {
    let result = "my-4 p-4 shadow-lg"; // base classes

    switch (side) {
      case "left":
        result += " ml-4 rounded-l-lg flex-row-reverse";
        break;
      case "right":
        result += " mr-4 rounded-r-lg flex-row";
        break;
      case "both":
        result += " flex-row";
        break;
      default:
        result += " mx-4 rounded-lg flex-row";
        break;
    }

    return result;
  }

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
    const colours = ["#991B1B", "#9A3412", "#3F6212", "#92400E", "#854D0E", "#3F6212", "#166534", "#065F46", "#115E59", "#155E75", "#075985", "#3730A3", "#5B21B6", "#6B21A8", "#86198F", "#9D174D", "#9F1239", "#1E293B"];
    return colours[sum % colours.length];
  }

  return (
    // we need to apply the style using classic css since tailwind doesn't allow for dynamic colours
    <div style={{ backgroundColor: `${calcColour(employee)}` }} className={`h-16 text-white ${adjustSide()}`}>
      <div className="flex flex-col justify-center h-full">
        <div className="text-sm font-semibold">{name}</div>
        <div className="text-xs">{startTime} - {endTime}</div>
      </div>
    </div>
  );
};

export default Shift;