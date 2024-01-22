import { useState } from 'react';
import { RosterData } from '@/app/lib/types';

type HandleRosterDataFunction = (rosterData: RosterData) => void;

interface FormProps {
  handleRosterData: HandleRosterDataFunction;
}

export default function Form({ handleRosterData }: FormProps) {
  const [formData, setFormData] = useState({
    employees: '',
    shifts: '',
    days: '',
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData((prevState) => ({ ...prevState, [fieldName]: fieldValue }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitData = {
      employees: parseInt(formData.employees),
      days: parseInt(formData.days),
      shifts: parseInt(formData.shifts),
    };

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
            value={formData.employees}
            onChange={handleInput}
            className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none'
          />
        </div>

        <div className='mb-4'>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='shifts'
          >
            Number of Shifts
          </label>
          <input
            type='number'
            id='shifts'
            name='shifts'
            placeholder='Enter the number of shifts'
            value={formData.shifts}
            onChange={handleInput}
            className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none'
          />
        </div>

        <div className='mb-4'>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='days'
          >
            Number of Days
          </label>
          <input
            type='number'
            id='days'
            name='days'
            placeholder='Enter the number of days'
            value={formData.days}
            onChange={handleInput}
            className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none'
          />
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
}
