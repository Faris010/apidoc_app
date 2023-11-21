'use client';

import { TProject } from '@/types/types';
import ProjectCard from './ProjectCard';
import ProjectFormCreate from '../forms/project_form/ProjectFormCreate';
import { useToggle } from '@/hooks/useToggle';
import { useEffect, useState, useMemo, useCallback } from 'react';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';
import ProjectFormEdit from '../forms/project_form/ProjectFormEdit';
import {
  getAllProjects,
  getProjectsBySearchFilter,
  getProjectsPagination,
} from '@/services/project';
import { useRouter } from 'next/navigation';
import useDebounce from '@/hooks/useDebounce';
import Pagination from '../pagination/Pagination';
import Image from 'next/image';

interface Props {
  projectSearchFilter: string;
}

export default function ProjectListing({ projectSearchFilter }: Props) {
  const router = useRouter();
  const [isProjectFormOpen, setIsProjectFormOpen] = useToggle(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useToggle(false);
  const [isProjectFormEditOpen, setIsProjectFormEditOpen] = useToggle(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageArray, setPageArray] = useState<number[]>([]);

  const [currentProject, setCurrentProject] = useState<TProject>({
    projectName: '',
    logo: '',
  });

  const debouncedValue = useDebounce(projectSearchFilter, 300);

  const [projects, setProjects] = useState<TProject[]>([]);

  const getTotalPages = async (pages: number | null) => {
    if (pages == null) {
      const response = await getAllProjects();
      const totalNumberOfPages = Math.ceil(response.payload.length / 8);
      const arr = Array.from(
        { length: totalNumberOfPages },
        (_, index) => index + 1
      );
      setPageArray(arr);
    } else {
      const totalNumberOfPages = Math.ceil(pages / 8);
      const arr = Array.from(
        { length: totalNumberOfPages },
        (_, index) => index + 1
      );
      setPageArray(arr);
    }
  };

  const getProjects = async () => {
    if (debouncedValue != '') {
      const response = await getProjectsBySearchFilter(
        currentPage,
        debouncedValue
      );
      if (response.success) {
        setProjects(response.payload.paginatedProjects);
      }
      getTotalPages(response.payload.totalItems);
    } else {
      const response = await getProjectsPagination(currentPage);
      if (response.success) {
        setProjects(response.payload);
      }
      getTotalPages(null);
    }
  };

  const memoizedProjects = useMemo(() => projects, [projects]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.replace('/login');
    }
  }, []);

  useEffect(() => {
    getProjects();
  }, [debouncedValue, currentPage]);

  return (
    <>
      <div className='w-3/4 h-full my-10 flex flex-col justify-between'>
        <div className='space-y-6'>
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
          {memoizedProjects.length > 0 ? (
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
          ) : (
            <div className='h-full flex flex-col items-center justify-center space-y-3'>
              <div className='relative w-60 h-60'>
                <Image
                  src='/assets/empty.png'
                  fill
                  className='grayscale'
                  alt='Empty'
                />
              </div>
              <div className='text-sm font-semibold'>No projects found</div>
            </div>
          )}
        </div>
        <div className='flex items-center justify-end py-6'>
          {memoizedProjects.length > 0 && (
            <Pagination
              totalPages={pageArray}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          setProjects={setProjects}
          currentProject={currentProject}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          currentPage={currentPage}
          debouncedValue={debouncedValue}
        />
      )}
      {isProjectFormOpen && (
        <ProjectFormCreate
          currentPage={currentPage}
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
