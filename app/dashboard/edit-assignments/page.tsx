'use client';

import { useContext, useState, FormEvent } from 'react';
import { DashboardContext } from '@/app/dashboard/dashboard-context';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import Title from '@/app/ui/title';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../../lib/formSchemas';
import { FieldPath } from 'react-hook-form';
import GridCell from '@/app/start/components/grid-cell';
import SubmitBtn from '@/app/ui/submit-btn';

// Days displayed in the table header
const daysNames = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

const EditAssignments = () => {
  const { user, shifts, employees, numEmployeesAssigned } =
    useContext(DashboardContext)!;
  const { workDays } = user;
  const [isSubmitting, setIsSubmitting] = useState(false); // when we click the button
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workDays: workDays,
      shifts: shifts,
      employees: employees,
      numEmployeesAssigned: [
        // TODO: 1. Translate numEmployeesAssigned taken from useContext in the format below
        //       2. Build API endpoint to update in DB
        {
          shiftId: shifts[0].id,
          assignments: [
            { day: 0, numAssigned: 1 },
            { day: 1, numAssigned: 2 },
            { day: 2, numAssigned: 2 },
            { day: 3, numAssigned: 2 },
            { day: 4, numAssigned: 2 },
          ],
        },
        {
          shiftId: shifts[1].id,
          assignments: [
            { day: 0, numAssigned: 1 },
            { day: 1, numAssigned: 2 },
            { day: 2, numAssigned: 2 },
            { day: 3, numAssigned: 2 },
            { day: 4, numAssigned: 2 },
          ],
        },
      ],
    },
  });

  /* Get value for each cell from form data from form data */
  const getValue = (id: string, day: number): number => {
    const formValues = form.getValues();
    const shift = formValues.numEmployeesAssigned.find(
      (s) => s.shiftId === id
    )!;
    const assignment = shift.assignments.find((a) => a.day === day)!;
    return assignment.numAssigned;
  };

  /* Updates form value on change */
  const updateValue = (id: string, day: number, newValue: number): void => {
    // Locate the shift object by id in the form data
    const shiftIndex = form
      .watch('numEmployeesAssigned')
      .findIndex((s) => s.shiftId === id);
    // Locate the assignment object by day in the shift's assignments
    const assignmentIndex = form
      .watch(`numEmployeesAssigned.${shiftIndex}.assignments`)
      .findIndex((a) => a.day === day);

    // FieldPath recursively generates all combinations of possible paths. Without it, we would have to do it manually.
    // However, I am not entirely sure that I am using it correctly. For now it seems to work. Keep an eye on it
    // In case of unexpected bahaviour
    const fieldPath: FieldPath<z.infer<typeof formSchema>> =
      `numEmployeesAssigned.${shiftIndex}.assignments.${assignmentIndex}.numAssigned`;

    form.setValue(fieldPath, newValue);
  };

  // Submit new values to database, then refresh page
  // TODO
  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
    } catch (error) {
      console.error('Error submitting shifts:', error);
    } finally {
      await new Promise((r) => setTimeout(r, 500)); // Wait half a second after submitting
      setIsSubmitting(false);
      router.refresh();
    }
  };

  return (
    <>
      <Title title={'Edit Assignments'} />
      <div className='container mx-auto mt-8'>
        <h1 className='font-size-lg'>
          Select the number of employees to be assigned per shift
        </h1>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='w-16  p-2'></th>
              {workDays.map((day) => (
                <th key={day} className='w-20 p-2 text-center'>
                  {daysNames[day]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift.id}>
                <td className='w-16  p-2'>{shift.name}</td>
                {workDays.map((day) => (
                  <GridCell
                    key={`${shift.id}-${day}`}
                    shiftId={shift.id}
                    day={day}
                    value={getValue(shift.id, day)}
                    updateValue={updateValue}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className='col-span-11 pr-4 pt-4'>
          <SubmitBtn
            isSubmitting={isSubmitting}
            text={'Update'}
            submittingText={'Updating...'}
            handleClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default EditAssignments;
