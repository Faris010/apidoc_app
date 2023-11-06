'use client';

import { TProject } from '@/types/types';
import ProjectCard from './ProjectCard';
import ProjectForm from '../forms/project_form/ProjectForm';
import { useToggle } from '@/hooks/useToggle';
import { useState } from 'react';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';

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
            className='bg-gray-900 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-gray-800'
          >
            Add new project
          </div>
        </div>
        <div className='h-[1px] bg-[#B4B4B3] w-full'></div>
        <div className='grid grid-cols-4 max-sm:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-3 gap-6'>
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
