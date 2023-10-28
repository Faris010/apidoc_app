import { useToggle } from '@/hooks/useToggle';
import { TSection } from '@/types/types';
import { GenerateSlug } from '@/utils/GenerateSlug';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  section: TSection;
  projectId: number;
}

export default function SectionItem({ section, projectId }: Props) {
  const [isExpanded, setIsExpanded] = useToggle(false);
  const [isMouseOver, setIsMouseOver] = useToggle(false);

  return (
    <>
      <div
        onMouseEnter={setIsMouseOver}
        onMouseLeave={setIsMouseOver}
        className='px-2 py-1 flex items-center cursor-pointer rounded hover:bg-[#EBEBEA]'
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
            pathname: `/project/${projectId}`,
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
            <div className='w-5 h-5 p-1 flex items-center justify-center hover:bg-[#DDDDDC] rounded'>
              <Image
                src='/assets/more.png'
                alt='more icon'
                height={16}
                width={16}
              />
            </div>
            <div className='w-5 h-5 p-1 flex items-center justify-center hover:bg-[#DDDDDC] rounded'>
              <Image
                src='/assets/plus.png'
                alt='more icon'
                height={16}
                width={16}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
