import { useToggle } from '@/hooks/useToggle';
import { TFormik, TSection } from '@/types/types';
import { GenerateSlug } from '@/utils/GenerateSlug';
import Image from 'next/image';
import Link from 'next/link';
import SectionMenuModal from '../modals/SectionMenuModal';
import { useRef } from 'react';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { FormikProps } from 'formik';
import CreateSectionInput from './CreateSectionInput';

interface Props {
  section: TSection;
  sectionList: TSection[];
  depth: number;
  formik: FormikProps<TFormik>;
  setSectionList: React.Dispatch<React.SetStateAction<TSection[] | undefined>>;
  setIsAddSectionOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddSectionOpen: boolean;
  handleInputBlur: () => Promise<void>;
  handleInputKeyPress: (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => Promise<void>;
}

export default function SectionItem({
  section,
  sectionList,
  depth,
  setIsAddSectionOpen,
  formik,
  setSectionList,
  isAddSectionOpen,
  handleInputBlur,
  handleInputKeyPress,
}: Props) {
  const ref = useRef(null);
  const [isExpanded, setIsExpanded] = useToggle(false);
  const [isMouseOver, setIsMouseOver] = useToggle(false);
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useToggle(false);
  useOnClickOutside(ref, setIsSectionMenuOpen);

  let childrenSection = sectionList.filter((sec) => sec.parentId == section.id);

  return (
    <div className='relative'>
      <div
        onMouseEnter={setIsMouseOver}
        onMouseLeave={setIsMouseOver}
        className={`relative ${
          section.parentId != null && depth == 1 && 'hidden'
        } px-2 py-1 flex items-center cursor-pointer rounded hover:bg-[#EBEBEA]`}
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
                !isExpanded && setIsExpanded();
                setIsAddSectionOpen(true);
                formik.setFieldValue('parentId', section.id);
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
          <>
            {childrenSection.map((sec) => (
              <div key={sec.id} className={`pl-2`}>
                <SectionItem
                  section={sec}
                  formik={formik}
                  sectionList={sectionList}
                  depth={depth + 1}
                  setIsAddSectionOpen={setIsAddSectionOpen}
                  setSectionList={setSectionList}
                  isAddSectionOpen={isAddSectionOpen}
                  handleInputBlur={handleInputBlur}
                  handleInputKeyPress={handleInputKeyPress}
                />
              </div>
            ))}
            <CreateSectionInput
              isAddSectionOpen={isAddSectionOpen}
              formik={formik}
              section={section}
              handleInputBlur={handleInputBlur}
              handleInputKeyPress={handleInputKeyPress}
            />
          </>
        ) : (
          <>
            <div
              className={`${
                isAddSectionOpen &&
                formik.values.parentId == section.id &&
                'hidden'
              } py-1 pl-8 text-sm text-[#B4B4B3] font-medium truncate`}
            >
              No sections inside
            </div>
            <CreateSectionInput
              isAddSectionOpen={isAddSectionOpen}
              formik={formik}
              section={section}
              handleInputBlur={handleInputBlur}
              handleInputKeyPress={handleInputKeyPress}
            />
          </>
        ))}
    </div>
  );
}
