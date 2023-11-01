import { useToggle } from '@/hooks/useToggle';
import { TSection } from '@/types/types';
import { GenerateSlug } from '@/utils/GenerateSlug';
import Image from 'next/image';
import Link from 'next/link';
import SectionMenuModal from '../modals/SectionMenuModal';
import { useRef } from 'react';
import useOnClickOutside from '@/hooks/useOnClickOutside';

interface Props {
  section: TSection;
  sectionList: TSection[];
  depth: number;
  setIsSectionFormOpen: () => void;
  setSection: React.Dispatch<React.SetStateAction<TSection>>;
  setSectionList: React.Dispatch<React.SetStateAction<TSection[] | undefined>>;
}

export default function SectionItem({
  section,
  sectionList,
  depth,
  setIsSectionFormOpen,
  setSection,
  setSectionList,
}: Props) {
  const ref = useRef(null);
  const [isExpanded, setIsExpanded] = useToggle(false);
  const [isMouseOver, setIsMouseOver] = useToggle(false);
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useToggle(false);
  useOnClickOutside(ref, setIsSectionMenuOpen);

  let childrenSection = sectionList.filter(
    (sec) => sec.paredntId == section.id
  );

  return (
    <div className='relative'>
      <div
        onMouseEnter={setIsMouseOver}
        onMouseLeave={setIsMouseOver}
        className={`${
          section.paredntId != null && depth == 1 && 'hidden'
        } w-full px-2 py-1 flex items-center cursor-pointer rounded hover:bg-[#EBEBEA]`}
      >
        <div>
          <div
            onClick={setIsExpanded}
            className='w-5 h-5 p-1.5 hover:bg-[#DDDDDC] rounded'
          >
            <Image
              src='/assets/right-arrow.png'
              alt='arrow icon'
              height={14}
              width={14}
              className={`${isExpanded && 'rotate-90'}`}
            />
          </div>
        </div>
        <Link
          href={{
            query: {
              section: GenerateSlug(section.name.toLowerCase()),
              sectionId: section.id,
            },
          }}
          className='w-full flex overflow-hidden'
        >
          <div>
            <div className='w-5 h-5 flex items-center justify-center'>
              <Image
                src='/assets/file.png'
                alt='document icon'
                height={18}
                width={18}
              />
            </div>
          </div>
          <div className='w-full ml-2 truncate'>
            <p className='text-sm text-[#3E4248] font-medium truncate'>
              {section.name}
            </p>
          </div>
        </Link>
        {isMouseOver && (
          <div className='flex items-center space-x-1'>
            <div
              onClick={setIsSectionMenuOpen}
              className='w-5 h-5 p-1 flex items-center justify-center hover:bg-[#DDDDDC] rounded'
            >
              <Image
                src='/assets/more.png'
                alt='more icon'
                height={16}
                width={16}
              />
            </div>
            <div
              onClick={() => {
                setIsSectionFormOpen();
                setSection((prev) => ({ ...prev, paredntId: section.id }));
              }}
              className='w-5 h-5 p-1 flex items-center justify-center hover:bg-[#DDDDDC] rounded'
            >
              <Image
                src='/assets/plus.png'
                alt='add icon'
                height={16}
                width={16}
              />
            </div>
          </div>
        )}
      </div>
      {isSectionMenuOpen && (
        <SectionMenuModal
          section={section}
          sectionList={sectionList}
          setSectionList={setSectionList}
          ref={ref}
        />
      )}
      {isExpanded &&
        (childrenSection.length > 0 ? (
          childrenSection.map((sec) => (
            <div key={sec.id} className={`pl-2`}>
              <SectionItem
                section={sec}
                setSection={setSection}
                sectionList={sectionList}
                depth={depth + 1}
                setIsSectionFormOpen={setIsSectionFormOpen}
                setSectionList={setSectionList}
              />
            </div>
          ))
        ) : (
          <div
            className={`py-1 pl-8 text-sm text-[#B4B4B3] font-medium truncate`}
          >
            No sections inside
          </div>
        ))}
    </div>
  );
}
