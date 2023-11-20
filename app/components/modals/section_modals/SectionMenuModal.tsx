'use client';

import { TSection } from '@/types/types';
import handleSectionDelete from '@/utils/HandleSectionDelete';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { forwardRef } from 'react';

interface Props {
  section: TSection;
  sectionList: TSection[];
  setSectionList: React.Dispatch<React.SetStateAction<TSection[] | undefined>>;
  setIsRenameInputOpen: () => void;
  setIsSectionMenuOpen: () => void;
}

const SectionMenuModal = forwardRef<HTMLDivElement, Props>(
  (
    {
      section,
      sectionList,
      setSectionList,
      setIsRenameInputOpen,
      setIsSectionMenuOpen,
    },
    ref
  ) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const sectionId = searchParams.get('sectionId');

    const handleSectionDeleteMain = async () => {
      const response = await handleSectionDelete(
        section,
        sectionList,
        sectionId!,
        router,
        pathname
      );
      if (response.success) {
        setSectionList(response.updatedSectionList!);
      }
    };
    return (
      <div
        ref={ref}
        className='absolute -right-28 p-1 z-10 bg-white rounded drop-shadow-lg'
      >
        <div
          onClick={() => {
            setIsRenameInputOpen();
            setIsSectionMenuOpen();
          }}
          className='py-1 pl-3 pr-14 flex items-center space-x-2 cursor-pointer hover:bg-[#EBEBEA] rounded'
        >
          <Image
            src='/assets/rename.png'
            alt='edit icon'
            height={16}
            width={16}
          />
          <p className='text-sm'>Rename</p>
        </div>
        <div
          onClick={handleSectionDeleteMain}
          className='py-1 px-3 flex items-center space-x-2 cursor-pointer hover:bg-[#EBEBEA] rounded'
        >
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
  }
);
export default SectionMenuModal;
