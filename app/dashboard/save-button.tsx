import React, { FC } from 'react';

type HandleSave = (e: React.FormEvent<HTMLFormElement>) => void;

type Props = {
  handleSave: HandleSave;
};

const SaveButton: FC<Props> = ({ handleSave }) => {
  return (
    <div className='mb-4 flex items-center justify-end'>
      <form onSubmit={handleSave}>
        <button
          type='submit'
          className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
        >
          Save
        </button>
      </form>
    </div>
  );
};
export default SaveButton;
