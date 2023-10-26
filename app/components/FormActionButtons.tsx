'use client';

interface Props {
  setIsProjectFormOpen: () => void;
}

export default function FormActionButtons({ setIsProjectFormOpen }: Props) {
  return (
    <div className='w-full flex items-center justify-between space-x-4'>
      <button
        type='reset'
        onClick={setIsProjectFormOpen}
        className='w-1/2 py-2 border-[1px] border-[#B4B4B3] rounded-md font-medium'
      >
        Cancel
      </button>
      <button
        type='submit'
        className='w-1/2 py-2 bg-blue-600 rounded-md text-white'
      >
        Save
      </button>
    </div>
  );
}
