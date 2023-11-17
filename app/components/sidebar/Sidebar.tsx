'use client';

import { getProjectById } from '@/services/project';
import { TProject, TSection } from '@/types/types';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import SectionItem from '../section/SectionItem';
import { addSection, getSectionByProjectId } from '@/services/section';
import { GenerateSlug } from '@/utils/GenerateSlug';
import { useFormik } from 'formik';
import CreateSectionInput from '../section/CreateSectionInput';

export default function Sidebar() {
  const router = useRouter();
  const params = useParams();
  let id: string = params.projectId.toString();

  const [project, setProject] = useState<TProject>();
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [sectionList, setSectionList] = useState<TSection[]>();
  const formik = useFormik({
    initialValues: {
      name: 'Untitled',
      title: 'Untitled',
      projectId: id,
      parentId: null,
    },
    onSubmit: async (values) => {
      await addSection(values, id);
      const response = await getSectionByProjectId(id);
      setSectionList(response);
      setIsAddSectionOpen(false);
      formik.resetForm();
    },
  });

  const getCurrentProject = async () => {
    try {
      const response = await getProjectById(id);
      setProject(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getProjectSections = async () => {
    try {
      const response = await getSectionByProjectId(id);
      setSectionList(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentProject();
    getProjectSections();
  }, [id]);

  // useEffect(() => {
  //   if (sectionList != undefined && sectionList.length > 0) {
  //     router.push(
  //       `?section=${GenerateSlug(sectionList[0]?.name)}&sectionId=${
  //         sectionList[0]?.id
  //       }`
  //     );
  //   }
  // }, [sectionList]);

  const inputRef = useRef<HTMLInputElement>(null);
  const [isEnterKeyPressed, setIsEnterKeyPressed] = useState(false);

  useEffect(() => {
    if (isAddSectionOpen && inputRef.current) inputRef.current.focus();
  }, [isAddSectionOpen]);

  const handleInputBlur = async () => {
    if (!isEnterKeyPressed) {
      formik.handleSubmit();
      //Open created section, add to route query section details
    }
    setIsEnterKeyPressed(false);
  };

  const handleInputKeyPress = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      setIsEnterKeyPressed(true);
      formik.handleSubmit();
      //Open created section, add to route query section details
    }
  };

  return (
    <div className='w-1/5 max-sm:w-2/3 p-1 space-y-4 bg-[#FBFBFA] border-r-[2px] border-[#E1E1E1] '>
      {/* Project logo and name */}
      <div className='flex items-center px-2 py-1 space-x-2 hover:bg-[#EBEBEA] rounded cursor-pointer'>
        <div className='flex items-center justify-center'>
          <Image
            src={project?.logo || '/assets/placeholder.png'}
            alt='Project logo'
            height={20}
            width={20}
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
        <p className='truncate font-semibold'>{project?.projectName}</p>
      </div>

      {/* Search bar */}
      <div className='mx-2 px-2.5 py-1 flex items-center space-x-2 bg-[#EBEBEA] rounded'>
        <div>
          <Image
            src='/assets/search.png'
            alt='search icon'
            height={12}
            width={12}
          />
        </div>
        <input
          type='text'
          placeholder='Search...'
          className='w-full outline-none bg-transparent text-sm '
        />
      </div>
      {/* Section list */}
      <div className='pt-2'>
        <div>
          {sectionList &&
            sectionList?.length > 0 &&
            sectionList
              .filter((s) => s.id != null)
              .map((section: TSection) => (
                <SectionItem
                  key={section.id}
                  section={section}
                  formik={formik}
                  sectionList={sectionList}
                  depth={1}
                  setIsAddSectionOpen={setIsAddSectionOpen}
                  isAddSectionOpen={isAddSectionOpen}
                  setSectionList={setSectionList}
                  handleInputBlur={handleInputBlur}
                  handleInputKeyPress={handleInputKeyPress}
                />
              ))}
        </div>
        {/* Add new section input */}
        {isAddSectionOpen && formik.values.parentId == null && (
          <CreateSectionInput
            isAddSectionOpen={isAddSectionOpen}
            formik={formik}
            section={null}
            handleInputBlur={handleInputBlur}
            handleInputKeyPress={handleInputKeyPress}
          />
        )}
        {/* Add section button */}
        <div
          onClick={() => setIsAddSectionOpen(true)}
          className='pl-3 pr-2 py-1 flex items-center space-x-3 cursor-pointer hover:bg-[#EBEBEA] rounded'
        >
          <div>
            <Image
              src='/assets/plus.png'
              alt='arrow icon'
              height={12}
              width={12}
            />
          </div>
          <p className='text-sm text-[#3E4248] font-medium'>Add section</p>
        </div>
      </div>
    </div>
  );
}
