import {
  deleteProject,
  getProjectsBySearchFilter,
  getProjectsPagination,
} from '@/services/project';
import { TProject } from '@/types/types';
import Image from 'next/image';

interface Props {
  currentProject: TProject | null;
  setIsDeleteModalOpen: () => void;
  setProjects: React.Dispatch<React.SetStateAction<TProject[]>>;
  currentPage: number;
  debouncedValue: string;
}

export default function DeleteConfirmationModal({
  setProjects,
  currentProject,
  setIsDeleteModalOpen,
  currentPage,
  debouncedValue,
}: Props) {
  const handleDeleteProject = async () => {
    if (currentProject && currentProject.id) {
      await deleteProject(currentProject.id);
      let response;
      if (debouncedValue != '') {
        response = await getProjectsBySearchFilter(currentPage, debouncedValue);
        setProjects(response.payload.paginatedProjects);
      } else {
        response = await getProjectsPagination(currentPage);
        setProjects(response.payload);
      }
      setIsDeleteModalOpen();
    }
  };

  return (
    <div className='fixed w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-1/3 max-md:w-3/4 max-lg:w-1/2 p-6 space-y-6 bg-white rounded-lg'>
        <div className='flex items-center justify-center'>
          <div className='p-2 bg-red-200 rounded-full'>
            <Image
              src='/assets/warning.png'
              alt='warning icon'
              height={24}
              width={24}
            />
          </div>
        </div>
        <div className='text-center space-y-2'>
          <p className='text-xl font-bold'>Delete Project</p>
          <p className='text-sm text-[#444444]'>
            You are going to delete the{' '}
            <span className='text-black font-semibold'>
              {currentProject?.projectName}
            </span>{' '}
            project. Are you sure?
          </p>
        </div>
        <div className='w-full flex items-center space-x-4'>
          <button
            onClick={setIsDeleteModalOpen}
            className='w-1/2 py-2 border-[1px] border-[#B4B4B3] rounded-md font-medium'
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteProject}
            className='w-1/2 py-2 bg-red-600 rounded-md text-white'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
