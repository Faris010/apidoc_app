import { TProject } from '@/types/types';
import Image from 'next/image';
import { forwardRef } from 'react';

interface Props {
  project: TProject;
  setIsMenuOpen: () => void;
  setIsProjectFormOpen: () => void;
  setIsDeleteModalOpen: () => void;
  setCurrentProject: React.Dispatch<React.SetStateAction<TProject>>;
  setIsPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectOptionsMenu = forwardRef<HTMLDivElement, Props>(
  (
    {
      project,
      setIsMenuOpen,
      setCurrentProject,
      setIsProjectFormOpen,
      setIsDeleteModalOpen,
      setIsPopupVisible,
    },
    ref
  ) => {
    const handleCopyLink = () => {
      navigator.clipboard.writeText(`${window.location.origin}/${project.id}`);
      setIsPopupVisible(true);
      setIsMenuOpen();
      setTimeout(() => {
        setIsPopupVisible(false);
      }, 2000);
    };

    return (
      <div
        ref={ref}
        className='absolute w-2/3 top-16 -right-28 max-sm:right-8 p-1 flex flex-col items-center z-10 overflow-hidden bg-white rounded-md drop-shadow-lg'
      >
        <div
          onClick={() => {
            setIsProjectFormOpen();
            setCurrentProject(project);
            setIsMenuOpen();
          }}
          className='w-full py-1 px-3 flex items-center space-x-2 rounded cursor-pointer hover:bg-slate-200'
        >
          <Image
            src='/assets/edit.png'
            alt='edit icon'
            height={16}
            width={16}
          />
          <p className='text-sm'>Edit</p>
        </div>
        <div
          onClick={handleCopyLink}
          className='w-full py-1 px-3 flex items-center space-x-2 rounded cursor-pointer hover:bg-slate-200'
        >
          <Image
            src='/assets/link.png'
            alt='link icon'
            width={16}
            height={16}
            style={{ width: 'auto', height: 'auto' }}
          />
          <p className='text-sm'>Copy link</p>
        </div>
        <div
          onClick={() => {
            setCurrentProject(project);
            setIsDeleteModalOpen();
            setIsMenuOpen();
          }}
          className='w-full py-1 px-3 flex items-center space-x-2 rounded cursor-pointer hover:bg-slate-200'
        >
          <Image
            src='/assets/delete-red.png'
            alt='delete icon'
            height={16}
            width={16}
          />
          <p className='text-sm text-red-600'>Delete</p>
        </div>
      </div>
    );
  }
);

export default ProjectOptionsMenu;
