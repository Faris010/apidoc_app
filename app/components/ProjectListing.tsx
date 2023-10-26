'use client';

import { TProject } from '@/types/types';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import { useToggle } from '@/hooks/useToggle';
import { useState } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';

export default function ProjectListing({ projects }: { projects: TProject[] }) {
  const [isProjectFormOpen, setIsProjectFormOpen] = useToggle(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useToggle(false);
  const [formTitle, setFormTitle] = useState<string>('Create');
  const [currentProject, setCurrentProject] = useState<TProject | null>(null);

  return (
    <>
      <div className='w-3/4 my-10 space-y-6'>
        <div className='px-1 flex items-end justify-between'>
          <p className='font-bold text-lg'>All projects</p>
          <div
            onClick={() => {
              setIsProjectFormOpen();
              setFormTitle('Create');
            }}
            className='bg-blue-600 text-white text-sm px-4 py-2 rounded-3xl cursor-pointer hover:bg-blue-700'
          >
            + Add new project
          </div>
        </div>
        <div className='h-[1px] bg-[#B4B4B3] w-full'></div>
        <div className='grid grid-cols-4 gap-6'>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              setIsProjectFormOpen={setIsProjectFormOpen}
              setFormTitle={setFormTitle}
              setCurrentProject={setCurrentProject}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
            />
          ))}
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          currentProject={currentProject}
        />
      )}
      {isProjectFormOpen && (
        <ProjectForm
          currentProject={currentProject}
          setIsProjectFormOpen={setIsProjectFormOpen}
          title={formTitle}
          setCurrentProject={setCurrentProject}
        />
      )}
    </>
  );
}
