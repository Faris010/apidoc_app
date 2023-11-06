'use client';

import { getSectionById } from '@/services/section';
import { TSection } from '@/types/types';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DocumentEditor() {
  const searchParams = useSearchParams();
  const params = searchParams.get('sectionId');
  const sectionId = parseInt(params);
  const [section, setSection] = useState<TSection>();

  // const getSection = async () => {
  //   const response = await getSectionById(sectionId);
  //   console.log(response);

  //   setSection(response);
  // };

  // useEffect(() => {
  //   getSection();
  //   console.log('eg');
  // }, [sectionId]);

  return (
    <div className='w-4/5 bg-white'>
      <div className='w-full p-3 flex items-center justify-between border-b-[1px] border-[#E1E1E1]'>
        <div>{section?.name} Section name</div>
        <div className='p-1 rounded cursor-pointer hover:bg-[#EBEBEA] '>
          <Image
            src='/assets/more.png'
            alt='more icon'
            height={16}
            width={16}
          />
        </div>
      </div>
      <div className='w-full p-3 flex justify-center overflow-hidden'>
        <div className='w-2/3 pt-20 flex-col'>
          <div className='pb-4 text-4xl font-bold'>Untitled</div>
          <textarea
            className='w-full p-0 rounded  outline-none resize-none overflow-hidden'
            placeholder="Type '/' for commands"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
