'use client';

import { getProjectById } from '@/services/project';
import { TProject, TSection } from '@/types/types';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SectionItem from './SectionItem';
import { useToggle } from '@/hooks/useToggle';
import SectionForm from './SectionForm';
import { addSection } from '@/services/section';

export default function Sidebar() {
  const params = useParams();
  let id: number = parseInt(params.projectId);
  const [project, setProject] = useState<TProject>();
  const [isSectionFormOpen, setIsSectionFormOpen] = useToggle(false);
  const [section, setSection] = useState<TSection>({
    name: '',
    title: '',
    projectId: id,
    parentId: null,
  });

  useEffect(() => {
    const getCurrentProject = async () => {
      const response = await getProjectById(id);
      setProject(response);
    };
    getCurrentProject();
  }, []);

  const handleAddSection = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addSection(section);
      console.log(section);
      setIsSectionFormOpen();
    } catch (error) {
      console.log(error);
    }
  };

  let arr = [
    { id: 1, name: 'Introduction' },
    { id: 2, name: 'Typography Lorem ipsum dolor sit' },
    { id: 3, name: 'API Request' },
    { id: 4, name: 'API Response' },
    { id: 5, name: 'Get Started' },
  ];
  return (
    <>
      <div className='w-1/5 p-1 space-y-2 bg-[#FBFBFA] border-r-[2px] border-[#E1E1E1] shadow-lg'>
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
        <div className='mx-2 px-2 py-1 flex items-center space-x-2 bg-[#EBEBEA] rounded'>
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

        {/* Project name */}
        {/* <div className='flex items-center px-2 cursor-pointer space-x-2'>
          <div>
            <Image
              src='/assets/document-grey.png'
              alt='document icon'
              height={18}
              width={18}
            />
          </div>
          <p className='truncate'>{project?.projectName}</p>
        </div> */}

        {/* Section list */}
        <div>
          {arr.map((section) => (
            <SectionItem key={section.id} section={section} projectId={id} />
          ))}
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
