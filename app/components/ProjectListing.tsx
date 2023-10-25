'use client';

import { TProject, projects } from '@/const/ProjectConst';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import { useToggle } from '@/hooks/useToggle';
import { useState } from 'react';

export default function ProjectListing() {
  const [isFormOpen, setIsFormOpen] = useToggle(false);
  const [formTitle, setFormTitle] = useState<string>('Create');
  const [currentProject, setCurrentProject] = useState<TProject | null>(null);
  //TODO: Disable scroll on form open
  return (
    <>
      <div className='w-3/4 my-10 space-y-6'>
        <div className='px-1 flex items-end justify-between'>
          <p className='font-bold text-lg'>All projects</p>
          <div
            onClick={() => {
              setIsFormOpen();
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
              setIsFormOpen={setIsFormOpen}
              setFormTitle={setFormTitle}
              setCurrentProject={setCurrentProject}
            />
          ))}
        </div>
      </div>
      {isFormOpen && (
        <ProjectForm
          currentProject={currentProject}
          setIsFormOpen={setIsFormOpen}
          title={formTitle}
        />
      )}
    </>
  );
}
