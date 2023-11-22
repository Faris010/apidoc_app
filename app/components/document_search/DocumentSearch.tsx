'use client';

import useDebounce from '@/hooks/useDebounce';
import Pagination from '../pagination/Pagination';
import { useEffect, useState } from 'react';
import { getSearchedBlocks } from '@/services/block';
import { TBLock } from '@/types/types';
import { useRouter } from 'next/navigation';

interface Props {
  blockSearchFilter: string;
  projectId: string;
}

export default function DocumentSearch({
  blockSearchFilter,
  projectId,
}: Props) {
  const router = useRouter();
  const [searchedBlocks, setSearchedBlocks] = useState<TBLock[]>([]);
  const debouncedValue = useDebounce(blockSearchFilter, 300);

  const getBlocks = async () => {
    const response = await getSearchedBlocks(projectId, 1, blockSearchFilter);
    setSearchedBlocks(response.payload);
  };

  useEffect(() => {
    getBlocks();
    router.replace(`?search=${debouncedValue}`);
  }, [debouncedValue]);

  return (
    <div className='w-4/5 p-10 flex flex-col items-center bg-white space-y-10'>
      {searchedBlocks.map((block) => (
        <div
          key={block.id}
          className='w-2/3 p-4 rounded-lg drop-shadow-lg shadow-lg space-y-2 cursor-pointer'
        >
          <div className='text-2xl font-bold'>Heading</div>
          <div className='h-24 overflow-hidden'>{block.content}</div>
        </div>
      ))}
      {/* <Pagination /> */}
    </div>
  );
}
