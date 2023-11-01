'use client';

import Image from 'next/image';
import { forwardRef } from 'react';

const SectionMenuModal = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      className='absolute -right-28 p-1 z-10 bg-white rounded drop-shadow-lg'
    >
      <div className='py-1 pl-3 pr-14 flex items-center space-x-2 cursor-pointer hover:bg-[#EBEBEA] rounded'>
        <Image
          src='/assets/rename.png'
          alt='edit icon'
          height={16}
          width={16}
        />
        <p className='text-sm'>Rename</p>
      </div>
      <div className='py-1 px-3 flex items-center space-x-2 cursor-pointer hover:bg-[#EBEBEA] rounded'>
        <Image
          src='/assets/delete-grey.png'
          alt='edit icon'
          height={16}
          width={16}
        />
        <p className='text-sm'>Delete</p>
      </div>
    </div>
  );
});
export default SectionMenuModal;
