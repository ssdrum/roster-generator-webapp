const Spinner = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='spinner h-20 w-20 animate-spin rounded-full border-t-4 border-solid border-blue-500'></div>
      <div className='mt-6 text-gray-700'>Generating Roster...</div>
    </div>
  );
};

export default Spinner;
