import { TProject } from '@/types/types';
import Image from 'next/image';
import { forwardRef } from 'react';

interface Props {
  project: TProject;
  setIsFormOpen: () => void;
  setFormTitle: React.Dispatch<React.SetStateAction<string>>;
  setCurrentProject: React.Dispatch<React.SetStateAction<TProject | null>>;
  setIsMenuOpen: () => void;
}

const OptionsMenu = forwardRef<HTMLDivElement, Props>(
  (
    { project, setIsFormOpen, setFormTitle, setCurrentProject, setIsMenuOpen },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className='absolute top-16 -right-8 flex flex-col items-center z-10 overflow-hidden cursor-pointer bg-white rounded-lg drop-shadow-lg shadow-lg'
      >
        <div
          onClick={() => {
            setIsFormOpen();
            setFormTitle('Edit');
            setCurrentProject(project);
            setIsMenuOpen();
          }}
          className='w-full p-3 flex items-center space-x-2 hover:bg-slate-200'
        >
          <Image
            src='/assets/edit.png'
            alt='edit icon'
            height={16}
            width={16}
          />
          <p>Edit</p>
        </div>
        <div className='w-full h-[1px] mx-3 bg-slate-200'></div>
        <div
          onClick={setIsMenuOpen}
          className='w-full p-3 flex items-center space-x-2 hover:bg-slate-200'
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