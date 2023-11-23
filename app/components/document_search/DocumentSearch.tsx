'use client';

import useDebounce from '@/hooks/useDebounce';
import Pagination from '../pagination/Pagination';
import { useEffect, useState } from 'react';
import { TSection } from '@/types/types';
import { useRouter } from 'next/navigation';
import { getSearchedSections } from '@/services/section';
import Image from 'next/image';

interface Props {
  blockSearchFilter: string;
  projectId: string;
  setBlockSearchFilter: React.Dispatch<React.SetStateAction<string>>;
  setIsSidebarOpenOnMobile: () => void;
  isSidebarOpenOnMobile: boolean;
}

const PAGE_SIZE = 5;

export default function DocumentSearch({
  blockSearchFilter,
  projectId,
  setBlockSearchFilter,
  setIsSidebarOpenOnMobile,
  isSidebarOpenOnMobile,
}: Props) {
  const router = useRouter();
  const [searchedSections, setSearchedSections] = useState<TSection[]>([]);
  const [pageArray, setPageArray] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const debouncedValue = useDebounce(blockSearchFilter, 300);

  const handleNumberOfPages = (totalItems: number) => {
    const totalNumberOfPages = Math.ceil(totalItems / PAGE_SIZE);
    const arr = Array.from(
      { length: totalNumberOfPages },
      (_, index) => index + 1
    );
    setPageArray(arr);
  };

  const getSections = async () => {
    const response = await getSearchedSections(
      projectId,
      currentPage,
      blockSearchFilter
    );

    if (response.success) {
      setSearchedSections(response.payload.paginatedSections);
      handleNumberOfPages(response.payload.totalItems);
      router.replace(`?search=${debouncedValue}&page=${currentPage}`);
    }
  };

  const handleSearchedSectionOpen = (
    sectionName: string,
    sectionId: string
  ) => {
    router.push(`?section=${sectionName}&sectionId=${sectionId}`);
    setBlockSearchFilter('');
  };

  useEffect(() => {
    getSections();
  }, [debouncedValue, currentPage]);

  return (
    <div className='w-full flex flex-col max-md:p-3'>
      <div
        onClick={setIsSidebarOpenOnMobile}
        className='hidden max-md:flex z-50 flex-col items-end space-y-1'
      >
        {!isSidebarOpenOnMobile ? (
          <>
            <div className={`h-0.5 w-6 bg-gray-600 rounded-lg`}></div>
            <div className={`h-0.5 w-6 bg-gray-600 rounded-lg`}></div>
            <div className={`h-0.5 w-6 bg-gray-600 rounded-lg`}></div>
          </>
        ) : (
          <svg
            className='h-8 w-8 text-gray-600'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <line x1='18' y1='6' x2='6' y2='18' />
            <line x1='6' y1='6' x2='18' y2='18' />
          </svg>
        )}
      </div>
      <div className='w-full p-10 max-md:py-4 max-md:px-0 max-lg:w-full flex flex-col items-center bg-white space-y-10'>
        {searchedSections.map((section) => (
          <div
            key={section.id}
            className='w-2/3 p-4 rounded-lg drop-shadow-lg shadow-lg space-y-2'
          >
            <div className='text-2xl font-bold'>{section.name}</div>
            <div className='h-24 overflow-hidden'>
              {section.blocks?.map((block) => (
                <div key={block.id}>{block.content}</div>
              ))}
            </div>
            <div
              onClick={() =>
                handleSearchedSectionOpen(section.name, section?.id!)
              }
              className='flex items-center justify-end font-semibold space-x-2 cursor-pointer'
            >
              <p>Continue to read</p>
              <Image
                src='/assets/next-arrow.png'
                alt='arrow'
                height={16}
                width={16}
              />
            </div>
          </div>
        ))}
        {searchedSections.length > 0 ? (
          <Pagination
            totalPages={pageArray}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        ) : (
          <div className='h-full flex flex-col items-center justify-center space-y-3'>
            <div className='relative w-60 h-60'>
              <Image
                src='/assets/empty.png'
                fill
                className='grayscale'
                alt='Empty'
              />
            </div>
            <div className='text-lg font-semibold'>No results found</div>
          </div>
        )}
      </div>
    </div>
  );
}
