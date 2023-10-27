'use client';

import Image from 'next/image';

export default function Navbar() {
  const handleLogout = () => {
    //TODO: handle logout function
  };

  return (
    <div className='w-full px-10 py-4 flex items-center justify-between bg-white'>
      <div className='font-bold text-xl'>API Doc</div>
      <div className='w-1/3 px-4 py-2 flex items-center space-x-3 border-[1px] border-[#B4B4B3] rounded-3xl'>
        <Image
          src='/assets/search.png'
          alt='search-icon'
          height={16}
          width={16}
        />
        <input
          id='search'
          type='text'
          placeholder='Search Projects...'
          className='w-full outline-none'
        />
      </div>
      <div
        onClick={handleLogout}
        className='flex items-center space-x-2 cursor-pointer'
      >
        <Image
          src='/assets/logout.png'
          alt='logout-icon'
          height={16}
          width={16}
        />
        <p className='text-red-600'>Log out</p>
      </div>
    </div>
  );
}
