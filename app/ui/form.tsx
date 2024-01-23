import React, { FC } from 'react'; // Import FC (functional component)
import { useState } from 'react';
import { Roster } from '@/app/lib/types';

type HandleRosterDataFunction = (data: Roster) => void;
type SetIsLoading = (isLoading: boolean) => void;

type Props = {
  handleRosterData: HandleRosterDataFunction;
  setIsLoading: SetIsLoading;
};

type FormData = {
  employees: string;
  shifts: string;
  days: string;
  soft_days_off: boolean;
};

const Form: FC<Props> = ({ handleRosterData, setIsLoading }) => {
  const [formData, setFormData] = useState<FormData>({
    employees: '',
    shifts: '',
    days: '',
    soft_days_off: false,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData((prevState) => ({ ...prevState, [fieldName]: fieldValue }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const submitData = {
      employees: parseInt(formData.employees),
      days: parseInt(formData.days),
      shifts: parseInt(formData.shifts),
      soft_days_off: formData.soft_days_off,
    };

    console.log(submitData);

    try {
      const response = await fetch('/my_api/make_roster', {
        method: 'POST',
        body: JSON.stringify(submitData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        handleRosterData(responseData); // Pass return data to parent component
      } else {
        console.log('Error submitting form');
      }
    } catch (error) {
      console.error('Error submitting form', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center'>
      <form onSubmit={handleSubmit} className='mb-4 rounded bg-white pb-8 pt-6'>
        <div className='mb-4'>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='employees'
          >
            Number of Employees
          </label>
          <input
            type='number'
            id='employees'
            name='employees'
            placeholder='Enter the number of employees'
            required
            value={formData.employees}
            onChange={handleInput}
            className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none'
            min='1'
          />
        </div>

        <div className='mb-4'>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='shifts'
          >
            Number of Shifts (Including off shift)
          </label>
          <input
            type='number'
            id='shifts'
            name='shifts'
            placeholder='Enter the number of shifts'
            required
            value={formData.shifts}
            onChange={handleInput}
            className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none'
            min='2'
          />
        </div>

        <div className='mb-4'>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='days'
          >
            Week Length
          </label>
          <input
            type='number'
            id='days'
            name='days'
            placeholder='Enter the number of days'
            required
            value={formData.days}
            onChange={handleInput}
            className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none'
            min='1'
            max='7'
          />
        </div>

        <div className='mb-4 flex'>
          <input
            type='checkbox'
            id='soft_days_off'
            name='soft_days_off'
            checked={formData.soft_days_off}
            onChange={handleInput}
            className='mr-2 leading-tight text-gray-700 focus:outline-none'
          />
          <label
            className='block text-sm font-bold text-gray-700'
            htmlFor='soft_days_off'
          >
            Allow for less than two days off
          </label>
        </div>

        <div className='flex items-center justify-between'>
          <button
            type='submit'
            className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
