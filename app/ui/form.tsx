import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    employees: '',
    shifts: '',
    days: '',
    solutions: '',
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData((prevState) => ({ ...prevState, [fieldName]: fieldValue }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const submitData = {
      num_employees: parseInt(formData.employees),
      num_shifts: parseInt(formData.shifts),
      num_days: parseInt(formData.days),
      solution_limit: parseInt(formData.solutions),
    };

    console.log(submitData);

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/python_api/test-algorithm/',
        {
          method: 'POST',
          body: JSON.stringify(submitData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        // Handle success
        const responseData = await response.json();
        console.log(responseData);
      } else {
        // Handle errors
        console.log('Error submitting form');
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <form
        onSubmit={handleSubmit}
        className='mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md'
      >
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

        <div className='mb-4'>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='solutions'
          >
            Number of Solutions
          </label>
          <input
            type='number'
            id='solutions'
            name='solutions'
            placeholder='Enter the number of solutions'
            value={formData.solutions}
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
