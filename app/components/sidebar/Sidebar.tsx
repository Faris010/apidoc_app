'use client';

import { getProjectById } from '@/services/project';
import { TProject, TSection } from '@/types/types';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SectionItem from '../section/SectionItem';
import { useToggle } from '@/hooks/useToggle';
import SectionForm from '../forms/section_form/SectionForm';
import { addSection, getSectionByProjectId } from '@/services/section';
import { GenerateSlug } from '@/utils/GenerateSlug';

export default function Sidebar() {
  const params = useParams();
  const router = useRouter();
  let id: number = parseInt(params.projectId);
  const [project, setProject] = useState<TProject>();
  const [isSectionFormOpen, setIsSectionFormOpen] = useToggle(false);
  const [section, setSection] = useState<TSection>({
    name: '',
    title: '',
  });
  const [sectionList, setSectionList] = useState<TSection[]>();

  const getCurrentProject = async () => {
    try {
      const response = await getProjectById(id);
      setProject(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getSections = async () => {
    try {
      const response = await getSectionByProjectId(id);
      setSectionList(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentProject();
    getSections();
  }, [id]);

  useEffect(() => {
    if (sectionList != undefined && sectionList.length > 0) {
      router.push(
        `?section=${GenerateSlug(sectionList[0]?.name)}&sectionId=${
          sectionList[0]?.id
        }`
      );
    }
  }, [sectionList]);

  const handleAddSection = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addSection(section, id);
      setIsSectionFormOpen();
      getSections();
      setSection({
        id: 0,
        name: '',
        title: '',
        paredntId: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='w-1/5 p-1 space-y-4 bg-[#FBFBFA] border-r-[2px] border-[#E1E1E1] '>
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
        <div className='mx-2 px-2.5 py-1.5 flex items-center space-x-2 bg-[#EBEBEA] rounded'>
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
                    setSection={setSection}
                    sectionList={sectionList}
                    depth={1}
                    setIsSectionFormOpen={setIsSectionFormOpen}
                    setSectionList={setSectionList}
                  />
                ))}
          </div>
          <div
            onClick={setIsSectionFormOpen}
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
      {isSectionFormOpen && (
        <SectionForm
          setIsSectionFormOpen={setIsSectionFormOpen}
          setSection={setSection}
          section={section}
          handleAddSection={handleAddSection}
        />
      )}
    </>
  );
}
