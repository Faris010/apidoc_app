'use client';

import Image from 'next/image';
import Link from 'next/link';
import OptionsMenu from '../modals/OptionsMenu';
import { useToggle } from '@/hooks/useToggle';
import { TProject } from '@/types/types';
import { useRef } from 'react';
import useOnClickOutside from '@/hooks/useOnClickOutside';

interface Props {
  project: TProject;
  setIsProjectFormOpen: () => void;
  setFormTitle: React.Dispatch<React.SetStateAction<string>>;
  setCurrentProject: React.Dispatch<React.SetStateAction<TProject | null>>;
  setIsDeleteModalOpen: () => void;
}

export default function ProjectCard({
  project,
  setIsProjectFormOpen,
  setFormTitle,
  setCurrentProject,
  setIsDeleteModalOpen,
}: Props) {
  const ref = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useToggle(false);
  useOnClickOutside(ref, setIsMenuOpen);
  return (
    <div className='relative'>
      <div className='w-full p-8 bg-white rounded-md space-y-6 drop-shadow-md flex flex-col'>
        <div className='flex items-center justify-between'>
          <div className='bg-blue-300 bg-opacity-50 p-2 rounded-full'>
            <Image
              src='/assets/document.png'
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
        <div className='space-y-6'>
          <div className='space-y-3 w-full'>
            <div className='h-20 flex justify-center items-center'>
              <Image
                src={project.logo || '/assets/placeholder.png'}
                alt='company logo'
                height={72}
                width={72}
                style={{ width: 'auto' }}
                className='drop-shadow-lg'
              />
            </div>
            <p className='truncate text-center font-semibold'>
              {project.projectName}
            </p>
          </div>
          <div className='text-center'>
            <Link
              href={`/project/${project.id}`}
              className='py-2 px-4 bg-blue-600 rounded-3xl text-white text-sm'
            >
              Open project
            </Link>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <OptionsMenu
          ref={ref}
          project={project}
          setIsProjectFormOpen={setIsProjectFormOpen}
          setFormTitle={setFormTitle}
          setCurrentProject={setCurrentProject}
          setIsMenuOpen={setIsMenuOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
    </div>
  );
}
