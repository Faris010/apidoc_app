'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getProjectById } from '@/services/project';
import { TProject, TSection } from '@/types/types';
import SectionItem from '../section/SectionItem';
import { addSection, getSectionByProjectId } from '@/services/section';
import { GenerateSlug } from '@/utils/GenerateSlug';
import { useFormik } from 'formik';
import CreateSectionInput from '../section/CreateSectionInput';

interface Props {
  projectId: string;
  isViewer: boolean;
  setBlockSearchFilter: React.Dispatch<React.SetStateAction<string>>;
  blockSearchFilter: string;
}

export default function Sidebar({
  projectId,
  isViewer,
  setBlockSearchFilter,
  blockSearchFilter,
}: Props) {
  const router = useRouter();
  const pathaname = usePathname();
  const searchParams = useSearchParams();
  const sectionQuery = searchParams.get('section');

  const [project, setProject] = useState<TProject>();
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [sectionList, setSectionList] = useState<TSection[]>();
  const formik = useFormik({
    initialValues: {
      name: 'Untitled',
      title: 'Untitled',
      projectId: projectId,
      parentId: null,
    },
    onSubmit: async (values) => {
      await addSection(values, projectId);
      const response = await getSectionByProjectId(projectId);
      setSectionList(response.payload);
      setIsAddSectionOpen(false);
      formik.resetForm();
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.replace('/login');
    }
  }, []);

  const getCurrentProject = async () => {
    try {
      const response = await getProjectById(projectId);
      setProject(response.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const getProjectSections = async () => {
    try {
      const response = await getSectionByProjectId(projectId);
      setSectionList(response.payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentProject();
    getProjectSections();
  }, [projectId]);

  useEffect(() => {
    if (
      !sectionQuery &&
      (sectionList ?? []).length > 0 &&
      blockSearchFilter == ''
    ) {
      let firstSection: TSection | null = null;

      if (sectionList) {
        firstSection = sectionList[0];
      }

      if (firstSection) {
        const { name, id } = firstSection;
        const sectionSlug = GenerateSlug(name);
        router.replace(`?section=${sectionSlug}&sectionId=${id}`);
      }
    }
    if (sectionQuery && sectionList?.length == 0 && blockSearchFilter == '') {
      router.replace(pathaname);
    }
  }, [sectionList, sectionQuery, blockSearchFilter]);

  const [isEnterKeyPressed, setIsEnterKeyPressed] = useState(false);

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

  const memoizedSections = useMemo(() => sectionList, [sectionList]);

  const handleBlockSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlockSearchFilter(e.target.value);
  };

  return (
    <div className='w-1/5 max-sm:w-2/3 p-1 space-y-4 bg-[#FBFBFA] border-r-[2px] border-[#E1E1E1] '>
      {/* Project logo and name */}
      <div className='p-2 flex flex-col items-center space-y-2'>
        <div className='relative h-24'>
          <Image
            src={project?.logo || '/assets/placeholder.png'}
            alt='Project logo'
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: 'auto', height: '100%' }}
          />
        </div>
        <p className='text-center font-semibold'>{project?.projectName}</p>
      </div>

      {!isViewer && (
        <div
          onClick={() => router.push('/')}
          className='w-full px-4 py-1 flex items-center space-x-2 hover:bg-[#EBEBEA] cursor-pointer rounded'
        >
          <Image
            src='/assets/home.png'
            alt='home icon'
            width={16}
            height={16}
            style={{ width: 'auto', height: 'auto' }}
          />
          <p className='text-sm text-[#3E4248] font-medium'>Home page</p>
        </div>
      )}

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
          onChange={handleBlockSearch}
          className='w-full outline-none bg-transparent text-sm '
        />
      </div>
      {/* Section list */}
      <div>
        <div>
          {memoizedSections &&
            memoizedSections?.length > 0 &&
            memoizedSections
              .filter((s) => s.id != null)
              .map((section: TSection) => (
                <SectionItem
                  key={section.id}
                  section={section}
                  formik={formik}
                  sectionList={memoizedSections}
                  depth={1}
                  setIsAddSectionOpen={setIsAddSectionOpen}
                  isAddSectionOpen={isAddSectionOpen}
                  setSectionList={setSectionList}
                  handleInputBlur={handleInputBlur}
                  handleInputKeyPress={handleInputKeyPress}
                  isViewer={isViewer}
                />
              ))}
        </div>
        {/* Add new section input */}
        {isAddSectionOpen && formik.values.parentId == null && !isViewer && (
          <CreateSectionInput
            isAddSectionOpen={isAddSectionOpen}
            formik={formik}
            section={null}
            handleInputBlur={handleInputBlur}
            handleInputKeyPress={handleInputKeyPress}
          />
        )}
        {/* Add section button */}
        {!isViewer && (
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
        )}
      </div>
    </div>
  );
}
