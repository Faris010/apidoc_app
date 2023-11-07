'use client';

import { TProject } from '@/types/types';
import ProjectCard from './ProjectCard';
import ProjectFormCreate from '../forms/project_form/ProjectFormCreate';
import { useToggle } from '@/hooks/useToggle';
import { useEffect, useState } from 'react';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';
import ProjectFormEdit from '../forms/project_form/ProjectFormEdit';
import { getAllProjects } from '@/services/project';
import { useMemo } from 'react';

export default function ProjectListing() {
  const [isProjectFormOpen, setIsProjectFormOpen] = useToggle(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useToggle(false);
  const [isProjectFormEditOpen, setIsProjectFormEditOpen] = useToggle(false);

  const [currentProject, setCurrentProject] = useState<TProject>({
    projectName: '',
    logo: '',
  });

  const [projects, setProjects] = useState<TProject[]>([]);

  const getProjects = async () => {
    const response = await getAllProjects();
    setProjects(response);
  };

  const memoizedProjects = useMemo(() => projects, [projects]);

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <div className='w-3/4 my-10 space-y-6'>
        <div className='px-1 flex items-end justify-between'>
          <p className='font-bold text-lg'>All projects</p>
          <div
            onClick={setIsProjectFormOpen}
            className='bg-gray-900 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-gray-800'
          >
            Add new project
          </div>
        </div>
        <div className='h-[1px] bg-[#B4B4B3] w-full'></div>
        <div className='grid grid-cols-4 max-sm:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-3 gap-6'>
          {memoizedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              setIsProjectFormOpen={setIsProjectFormEditOpen}
              setCurrentProject={setCurrentProject}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
            />
          ))}
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          projects={projects}
          setProjects={setProjects}
          currentProject={currentProject}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
      {isProjectFormOpen && (
        <ProjectFormCreate
          setProjects={setProjects}
          setIsProjectFormOpen={setIsProjectFormOpen}
        />
      )}
      {isProjectFormEditOpen && (
        <ProjectFormEdit
          projects={projects}
          setProjects={setProjects}
          currentProject={currentProject}
          setIsProjectFormEditOpen={setIsProjectFormEditOpen}
        />
      )}
    </>
  );
}
