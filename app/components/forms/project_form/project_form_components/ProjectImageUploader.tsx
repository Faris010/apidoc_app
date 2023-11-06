'use client';

import { TImage, TNewProject, TProject } from '@/types/types';
import Image from 'next/image';
import { forwardRef, useState } from 'react';

interface Props {
  handleImageFileUpload: () => void;
  setUploadedImage: React.Dispatch<React.SetStateAction<TImage>>;
  setNewProjectData: React.Dispatch<React.SetStateAction<TNewProject>>;
  newProjectData: TNewProject;
  error: boolean;
  setCurrentProject: React.Dispatch<React.SetStateAction<TProject | null>>;
  currentProject: TProject | null;
}

const ProjectImageUploader = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const [imageUrl, setImageUrl] = useState<string>('');

    const handleImageUrlInput = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      props.setNewProjectData({ ...props.newProjectData, logo: imageUrl });
      props.currentProject &&
        props.setCurrentProject({ ...props.currentProject, logo: imageUrl });
      props.setUploadedImage({
        imageUrl: imageUrl,
        name: '',
        extension: '',
        size: '',
      });
    };

    return (
      <div className='flex flex-col space-y-2'>
        <div className='space-y-1'>
          <p className='px-1 font-semibold'>Project Logo</p>
          <p className='px-1 text-sm text-[#444444]'>
            Upload image or add image URL
          </p>
        </div>
        <label htmlFor='project-logo' className='cursor-pointer'>
          <div
            className={`flex flex-col items-center justify-center py-5 px-4 space-y-6 border-[1px] border-dashed ${
              props.error ? 'border-red-600' : 'border-[#B4B4B3]'
            }  rounded-md`}
          >
            <div>
              <Image
                src='/assets/upload.png'
                alt='upload icon'
                width={24}
                height={24}
              />
            </div>
            <div className='text-center space-y-1'>
              <p>
                <span className='text-blue-600 font-semibold'>Choose file</span>{' '}
                to upload
              </p>
              <p className='text-sm text-[#a5a5a5]'>PNG, JPG, SVG or GIF</p>
            </div>
          </div>
        </label>
        <input
          id='project-logo'
          type='file'
          accept='image/*'
          ref={ref}
          onChange={props.handleImageFileUpload}
          className='hidden'
        />
        <div className='w-full pt-2 flex items-center justify-between space-x-4'>
          <div className='w-1/2 h-[1px] bg-[#B4B4B3]'></div>
          <div className='text-xs text-[#B4B4B3]'>OR</div>
          <div className='w-1/2 h-[1px] bg-[#B4B4B3]'></div>
        </div>
        <div className='space-y-2'>
          <label htmlFor='image-url' className='text-sm font-semibold'>
            Import from URL
          </label>
          <div
            className={`flex items-center border-[1px] ${
              props.error ? 'border-red-600' : 'border-[#B4B4B3]'
            } rounded-md overflow-hidden`}
          >
            <input
              id='image-url'
              type='text'
              placeholder='https://example.com/your-image-url'
              className='w-full p-2 outline-none'
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <button
              onClick={handleImageUrlInput}
              className='p-2 text-blue-600 font-semibold'
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default ProjectImageUploader;
