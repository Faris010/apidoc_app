'use client';

import { useRef, useState } from 'react';
import ProjectImageUploader from './ProjectImageUploader';
import FormActionButtons from './FormActionButtons';
import Image from 'next/image';
import { TProject } from '@/const/ProjectConst';

export type TImage = {
  imageUrl: string | ArrayBuffer | null;
  name: string;
  extension: string;
  size: string;
};

interface Props {
  currentProject: TProject | null;
  setIsFormOpen: () => void;
  title: string;
}

export default function ProjectForm({
  currentProject,
  setIsFormOpen,
  title,
}: Props) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [uploadedImage, setUploadedImage] = useState<TImage>({
    imageUrl: '',
    name: '',
    extension: '',
    size: '',
  });

  const formatFileSize = (size: number): string => {
    const units = ['B', 'KB', 'MB'];
    const k = 1024;
    for (const unit of units) {
      if (size <= k) {
        return size.toFixed(2) + ' ' + unit;
      } else {
        size = size / k;
      }
    }
    return '';
  };

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
  return (
    <div className='fixed w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <form className='w-1/3 bg-white rounded-lg space-y-7 px-10 py-6'>
        <div className='flex items-center justify-between'>
          <p className='text-xl font-semibold'>{title} project</p>
          <div
            onClick={setIsFormOpen}
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
            value={currentProject != null ? currentProject.projectName : ''}
            placeholder='Project Name...'
            className='w-full p-2 border-[1px] border-[#B4B4B3] rounded-md outline-none'
          />
        </div>
        <ProjectImageUploader
          handleImageFileUpload={handleImageFileUpload}
          setUploadedImage={setUploadedImage}
          ref={ref}
        />
        {uploadedImage.imageUrl != '' ||
          (currentProject != null && (
            <div className='space-y-2'>
              <p className='px-1 text-sm font-semibold'>Image Preview</p>
              <div className='p-2 flex items-start justify-between space-x-2 bg-slate-300 bg-opacity-50 rounded-md'>
                <div className='w-full h-28 flex items-center space-x-2 overflow-hidden'>
                  <Image
                    src={
                      currentProject != null
                        ? currentProject.logoUrl
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
              </div>
            </div>
          ))}
        <FormActionButtons setIsFormOpen={setIsFormOpen} />
      </form>
    </div>
  );
}
