'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProjectOptionsMenu from '../modals/project_modals/ProjectOptionsMenu';
import { useToggle } from '@/hooks/useToggle';
import { TProject } from '@/types/types';
import { useRef, useState } from 'react';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import CopiedNotificationPopup from '../popup/CopiedNotificationPopup';

interface Props {
  project: TProject;
  setIsProjectFormOpen: () => void;
  setCurrentProject: React.Dispatch<React.SetStateAction<TProject>>;
  setIsDeleteModalOpen: () => void;
}

export default function ProjectCard({
  project,
  setIsProjectFormOpen,
  setCurrentProject,
  setIsDeleteModalOpen,
}: Props) {
  const ref = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useToggle(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  useOnClickOutside(ref, setIsMenuOpen);
  return (
    <>
      <div className='relative'>
        <div className='p-8 bg-white rounded-md space-y-6 drop-shadow-md'>
          {/* Card Header */}
          <div className='flex items-center justify-between'>
            <div className='bg-gray-300 bg-opacity-50 p-2 rounded-full'>
              <Image
                src='/assets/document-grey.png'
                alt='document icon'
                height={16}
                width={16}
              />
            </div>
            <div
              onClick={setIsMenuOpen}
              className='hover:bg-slate-200 rounded-full p-2 cursor-pointer'
            >
              <Image
                src='/assets/more.png'
                alt='more icon'
                height={16}
                width={16}
                className='rotate-90'
              />
            </div>
          </div>
          {/* Card Body */}
          <div className='space-y-3 flex-col items-stretch'>
            <div className='relative h-28 flex justify-center items-center'>
              <Image
                src={project.logo || '/assets/placeholder.png'}
                alt='project logo'
                width={0}
                height={0}
                sizes='100vw'
                style={{ width: 'auto', height: '100%' }}
              />
            </div>
            <p className='text-center truncate font-semibold'>
              {project.projectName}
            </p>
          </div>
          {/* Card Action */}
          <div className='text-center'>
            <Link
              href={`/project/${project.id}`}
              className='py-2 px-4 bg-gray-900 rounded-md text-white text-sm'
            >
              Open project
            </Link>
          </div>
        </div>
        {/* Card menu */}
        {isMenuOpen && (
          <ProjectOptionsMenu
            ref={ref}
            project={project}
            setIsMenuOpen={setIsMenuOpen}
            setCurrentProject={setCurrentProject}
            setIsProjectFormOpen={setIsProjectFormOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            setIsPopupVisible={setIsPopupVisible}
          />
        )}
      </div>
      {isPopupVisible && (
        <CopiedNotificationPopup
          text={'Copied link to clipboard'}
          isPopupVisible={isPopupVisible}
        />
      )}
    </>
  );
}
