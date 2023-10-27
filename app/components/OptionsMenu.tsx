import { TProject } from '@/types/types';
import Image from 'next/image';
import { forwardRef } from 'react';

interface Props {
  project: TProject;
  setIsProjectFormOpen: () => void;
  setFormTitle: React.Dispatch<React.SetStateAction<string>>;
  setCurrentProject: React.Dispatch<React.SetStateAction<TProject | null>>;
  setIsMenuOpen: () => void;
  setIsDeleteModalOpen: () => void;
}

const OptionsMenu = forwardRef<HTMLDivElement, Props>(
  (
    {
      project,
      setIsProjectFormOpen,
      setFormTitle,
      setCurrentProject,
      setIsMenuOpen,
      setIsDeleteModalOpen,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className='absolute top-16 -right-14 flex flex-col items-center z-10 overflow-hidden cursor-pointer bg-white rounded-md drop-shadow-lg shadow-lg'
      >
        <div
          onClick={() => {
            setIsProjectFormOpen();
            setFormTitle('Edit');
            setCurrentProject(project);
            setIsMenuOpen();
          }}
          className='w-full px-5 py-3 flex items-center space-x-4 hover:bg-slate-200'
        >
          <Image
            src='/assets/edit.png'
            alt='edit icon'
            height={16}
            width={16}
          />
          <p>Edit</p>
        </div>
        <div className='w-full h-[1px] bg-slate-200'></div>
        <div
          onClick={() => {
            setCurrentProject(project);
            setIsDeleteModalOpen();
            setIsMenuOpen();
          }}
          className='w-full px-5 py-3 flex items-center space-x-4 hover:bg-slate-200'
        >
          <Image
            src='/assets/delete.png'
            alt='delete icon'
            height={16}
            width={16}
          />
          <p>Delete</p>
        </div>
      </div>
    );
  }
);

export default OptionsMenu;
