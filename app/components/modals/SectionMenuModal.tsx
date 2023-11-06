'use client';

import Image from 'next/image';
import { forwardRef } from 'react';

const SectionMenuModal = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      className='absolute w-3/4 p-1 top-6 -right-40 z-10 bg-white rounded-md drop-shadow-lg'
    >
      <div className='py-1 px-3 flex items-center space-x-2 hover:bg-[#EBEBEA] rounded'>
        <Image
          src='/assets/rename.png'
          alt='edit icon'
          height={16}
          width={16}
        />
        <p className='text-sm'>Rename</p>
      </div>
      <div className='py-1 px-3 flex items-center space-x-2 hover:bg-[#EBEBEA] rounded'>
        <Image
          src='/assets/delete-red.png'
          alt='edit icon'
          height={16}
          width={16}
        />
        <p className='text-sm text-red-600'>Delete</p>
      </div>
    </div>
  );
});
export default SectionMenuModal;
