'use client';

import { useRef, useState } from 'react';
import ProjectImageUploader from './ProjectImageUploader';
import FormActionButtons from './FormActionButtons';
import Image from 'next/image';
import { formatFileSize } from '@/utils/FormatFileSize';
import { TImage, TProject } from '@/types/types';
import { addNewProject, editProject } from '@/services/project';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import ErrorNotification from './ErrorNotification';

interface Props {
  currentProject: TProject | null;
  setIsProjectFormOpen: () => void;
  title: string;
  setCurrentProject: React.Dispatch<React.SetStateAction<TProject | null>>;
}

export default function ProjectForm({
  currentProject,
  setIsProjectFormOpen,
  title,
  setCurrentProject,
}: Props) {
  const ref = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [newProjectData, setNewProjectData] = useState<TProject>({
    id: uuidv4(),
    projectName: '',
    logo: '',
  });
  const [uploadedImage, setUploadedImage] = useState<TImage>({
    imageUrl: '',
    name: '',
    extension: '',
    size: '',
  });

  const handleImageFileUpload = () => {
    const file: File = ref.current!.files![0];
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage({
        imageUrl: reader.result,
        name: file.name.substring(0, file.name.lastIndexOf('.')),
        extension: file.name.substring(file.name.lastIndexOf('.') + 1),
        size: formatFileSize(file.size),
      });
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (title == 'Create') {
      setNewProjectData({ ...newProjectData, [e.target.name]: e.target.value });
    } else {
      currentProject &&
        setCurrentProject({
          ...currentProject,
          [e.target.name]: e.target.value,
        });
    }
  };

  const handleProjectFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (title == 'Create') {
        await addNewProject(newProjectData);
      } else {
        await editProject(currentProject);
      }
      setError(false);
      setIsProjectFormOpen();
      router.refresh();
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className='fixed w-full h-full z-20 flex items-center justify-center bg-black bg-opacity-50'>
      <form
        onSubmit={handleProjectFormSubmit}
        className='w-1/3 bg-white rounded-lg space-y-7 px-10 py-6'
      >
        <div className='flex items-center justify-between'>
          <p className='text-xl font-semibold'>{title} project</p>
          <div
            onClick={setIsProjectFormOpen}
            className='hover:bg-slate-200 rounded-full p-2 cursor-pointer'
          >
            <Image
              src='/assets/reject.png'
              alt='close icon'
              height={16}
              width={16}
            />
          </div>
        </div>
        <div className='flex flex-col space-y-2'>
          <label htmlFor='project-name' className='px-1 text-sm font-semibold'>
            Project Name
          </label>
          <input
            id='project-name'
            type='text'
            name='projectName'
            required
            value={currentProject?.projectName ?? newProjectData.projectName}
            placeholder='Project Name...'
            className={`w-full p-2 border-[1px] ${
              error ? 'border-red-600' : 'border-[#B4B4B3]'
            } rounded-md outline-none`}
            onChange={handleInputChange}
          />
        </div>
        <ProjectImageUploader
          handleImageFileUpload={handleImageFileUpload}
          setUploadedImage={setUploadedImage}
          setNewProjectData={setNewProjectData}
          newProjectData={newProjectData}
          error={error}
          setCurrentProject={setCurrentProject}
          currentProject={currentProject}
          ref={ref}
        />
        {(uploadedImage.imageUrl != '' || currentProject != null) && (
          <div className='space-y-2'>
            <p className='px-1 text-sm font-semibold'>Image Preview</p>
            <div className='p-2 flex items-start justify-between space-x-2 bg-slate-300 bg-opacity-50 rounded-md'>
              <div className='w-full h-28 flex items-center space-x-2 overflow-hidden'>
                <Image
                  src={
                    currentProject != null
                      ? currentProject.logo
                      : (uploadedImage.imageUrl as string) ||
                        '/assets/placeholder.png'
                  }
                  alt='uploaded image'
                  style={{ width: 'auto', height: '100%' }}
                  height={112}
                  width={112}
                />
                {uploadedImage.name != '' && (
                  <div className='w-full truncate'>
                    <p className='truncate font-semibold'>
                      {uploadedImage.name}
                    </p>
                    <div className='flex items-center space-x-1 text-sm text-[#444444]'>
                      <p className='uppercase'>{uploadedImage.extension}</p>
                      <p>&#x2022;</p>
                      <p>{uploadedImage.size}</p>
                    </div>
                  </div>
                )}
              </div>
              {currentProject == null && (
                <div
                  onClick={() =>
                    setUploadedImage({ ...uploadedImage, imageUrl: '' })
                  }
                  className='p-1 flex items-center justify-center hover:bg-white rounded-full cursor-pointer'
                >
                  <Image
                    src='/assets/reject.png'
                    alt='close icon'
                    height={16}
                    width={16}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        <FormActionButtons setIsProjectFormOpen={setIsProjectFormOpen} />
      </form>
      {error && <ErrorNotification />}
    </div>
  );
}
