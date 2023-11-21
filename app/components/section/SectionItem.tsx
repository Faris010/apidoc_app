'use client';

import { useToggle } from '@/hooks/useToggle';
import { TFormik, TSection } from '@/types/types';
import { GenerateSlug } from '@/utils/GenerateSlug';
import Image from 'next/image';
import Link from 'next/link';
import SectionMenuModal from '../modals/section_modals/SectionMenuModal';
import { useRef, useState } from 'react';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { FormikProps } from 'formik';
import CreateSectionInput from './CreateSectionInput';
import { editSection } from '@/services/section';
import { useSearchParams } from 'next/navigation';

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
  isViewer: boolean;
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
  isViewer,
}: Props) {
  const ref = useRef(null);
  const sectionIdQuery = useSearchParams().get('sectionId');
  const [isExpanded, setIsExpanded] = useToggle(false);
  const [isMouseOver, setIsMouseOver] = useToggle(false);
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useToggle(false);
  const [isRenameInputOpen, setIsRenameInputOpen] = useToggle(false);
  const [isEnterKeyPressed, setIsEnterKeyPressed] = useState<boolean>(false);
  const [sectionNameValue, setSectionNameValue] = useState<string>(
    section.name
  );
  useOnClickOutside(ref, setIsSectionMenuOpen);

  let childrenSection = sectionList.filter((sec) => sec.parentId == section.id);

  const handleSectionRename = async () => {
    const updatedSection = {
      ...section,
      name: sectionNameValue,
    };
    await editSection(updatedSection);
    const updatedSectionIndex = sectionList.findIndex(
      (s) => s.id == section.id
    );
    if (updatedSectionIndex !== -1) {
      const updatedSectionList = [...sectionList];
      updatedSectionList[updatedSectionIndex] = {
        ...updatedSection,
      };
      setSectionList(updatedSectionList);
    }
    setIsRenameInputOpen();
  };

  const handleRenameInputBlur = async () => {
    if (!isEnterKeyPressed) {
      handleSectionRename();
    }
    setIsEnterKeyPressed(false);
  };

  const handleRenameInputKeyPress = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      setIsEnterKeyPressed(true);
      handleSectionRename();
    }
  };

  return (
    <div className='relative py-[1px]'>
      <div
        onMouseEnter={setIsMouseOver}
        onMouseLeave={setIsMouseOver}
        className={`relative ${
          section.parentId != null && depth == 1 && 'hidden'
        } px-2 py-1 flex items-center ${
          sectionIdQuery == section.id
            ? 'bg-[#F1F1F0] hover:bg-[#E2E2E1]'
            : 'hover:bg-[#EBEBEA]'
        } cursor-pointer rounded `}
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
          className='w-full flex items-center overflow-hidden'
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
          <div className='w-full pr-1 ml-2 truncate'>
            {!isRenameInputOpen ? (
              <p className='text-sm text-[#3E4248] font-medium truncate'>
                {section.name}
              </p>
            ) : (
              <input
                id='rename-input'
                type='text'
                onBlur={handleRenameInputBlur}
                onKeyDown={handleRenameInputKeyPress}
                value={sectionNameValue}
                onChange={(e) => setSectionNameValue(e.target.value)}
                className='w-full px-1 text-sm rounded overflow-hidden outline-none'
              />
            )}
          </div>
        </Link>
        {isMouseOver && !isViewer && (
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
          setIsRenameInputOpen={setIsRenameInputOpen}
          setIsSectionMenuOpen={setIsSectionMenuOpen}
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
                  isViewer={isViewer}
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
