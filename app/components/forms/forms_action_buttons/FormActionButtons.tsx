'use client';

interface Props {
  setIsFormOpen: () => void;
}

export default function FormActionButtons({ setIsFormOpen }: Props) {
  return (
    <div className='w-full flex items-center justify-between space-x-4'>
      <button
        type='reset'
        onClick={setIsFormOpen}
        className='w-1/2 py-2 border-[1px] border-[#B4B4B3] rounded-md font-medium'
      >
        Cancel
      </button>
      <button
        type='submit'
        className='w-1/2 py-2 bg-gray-900 rounded-md text-white'
      >
        Save
      </button>
    </div>
  );
}
