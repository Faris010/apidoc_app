'use client';

import { projects } from '@/const/ProjectConst';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import { useToggle } from '@/hooks/useToggle';

export default function ProjectListing() {
  const [modal, setModal] = useToggle(false);
  //TODO: Disable scroll on form open
  return (
    <>
      <div className='w-3/4 my-10 space-y-6'>
        <div className='px-1 flex items-end justify-between'>
          <p className='font-bold text-lg'>All projects</p>
          <div
            onClick={setModal}
            className='bg-blue-600 text-white text-sm px-4 py-2 rounded-3xl cursor-pointer hover:bg-blue-700'
          >
            + Add new project
          </div>
        </div>
        <div className='h-[1px] bg-[#B4B4B3] w-full'></div>
        <div className='grid grid-cols-4 gap-6'>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
      {modal && <ProjectForm setModal={setModal} title='Create' />}
    </>
  );
}
