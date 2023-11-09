'use client';

import { useRef, useState } from 'react';
import FormActionButtons from '../forms_action_buttons/FormActionButtons';
import Image from 'next/image';
import { formatFileSize } from '@/utils/FormatFileSize';
import { TImage, TProject } from '@/types/types';
import { editProject } from '@/services/project';
import ErrorNotification from './project_form_components/ErrorNotification';
import { useFormik } from 'formik';
import { UploadImageToStorage } from '@/utils/UploadImageToStorage';

interface Props {
  projects: TProject[];
  setProjects: React.Dispatch<React.SetStateAction<TProject[]>>;
  currentProject: TProject;
  setIsProjectFormEditOpen: () => void;
}

export default function ProjectFormEdit({
  projects,
  setProjects,
  currentProject,
  setIsProjectFormEditOpen,
}: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [isProjectEditing, setIsProjectEditing] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File>();

  const formik = useFormik({
    initialValues: {
      id: currentProject.id,
      projectName: currentProject.projectName,
      logo: currentProject.logo,
    },
    onSubmit: async (values, { setStatus }) => {
      try {
        setIsProjectEditing(true);
        if (imageFile) {
          const imageUrl = await UploadImageToStorage(imageFile);
          values.logo = imageUrl;
        }
        await editProject(values);
        const updatedProjectIndex = projects.findIndex(
          (project) => project.id === values.id
        );
        if (updatedProjectIndex !== -1) {
          const updatedProjects = [...projects];
          updatedProjects[updatedProjectIndex] = {
            ...values,
          };
          setProjects(updatedProjects);
        }
        setIsProjectFormEditOpen();
      } catch (error) {
        setStatus('Something went wrong');
      }
    },
  });

  const [uploadedImage, setUploadedImage] = useState<TImage>({
    imageUrl: '',
    name: '',
    extension: '',
    size: '',
  });

  const handleImageFileUpload = async () => {
    if (fileRef.current?.files) {
      const file: File = fileRef.current.files[0];
      if (fileRef.current.files[0].name === file.name) {
        fileRef.current.value = '';
      }
      setImageFile(file);
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
    }
  };

  return (
    <div className='fixed w-full h-full z-20 flex items-center justify-center bg-black bg-opacity-50'>
      <form
        onSubmit={formik.handleSubmit}
        className='w-1/3 max-sm:h-full max-sm:w-full max-md:w-2/3 max-lg:w-1/2 overflow-y-auto bg-white rounded-lg space-y-7 px-10 py-6'
      >
        {/* Form header */}
        <div className='flex items-center justify-between'>
          <p className='text-xl font-semibold'>Edit project</p>
          <div
            onClick={setIsProjectFormEditOpen}
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
        {/* Project name field */}
        <div className='flex flex-col space-y-2'>
          <label htmlFor='projectName' className='px-1 text-sm font-semibold'>
            Project Name
          </label>
          <input
            id='projectName'
            type='text'
            required
            value={formik.values.projectName}
            onChange={formik.handleChange}
            placeholder='Project Name...'
            className={`w-full p-2 border-[1px] ${
              formik.status ? 'border-red-600' : 'border-[#B4B4B3]'
            } rounded-md outline-none`}
          />
        </div>
        {/* Image uploader */}
        <div className='flex flex-col space-y-2'>
          <div className='space-y-1'>
            <p className='px-1 font-semibold'>Project Logo</p>
          </div>
          <label htmlFor='logo' className='cursor-pointer'>
            <div
              className={`flex flex-col items-center justify-center py-5 px-4 space-y-6 border-[1px] border-dashed ${
                formik.status ? 'border-red-600' : 'border-[#B4B4B3]'
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
                  <span className='text-blue-600 font-semibold'>
                    Choose file
                  </span>{' '}
                  to upload
                </p>
                <p className='text-sm text-[#a5a5a5]'>PNG, JPG, SVG or GIF</p>
              </div>
            </div>
          </label>
          <input
            id='logo'
            type='file'
            accept='image/*'
            ref={fileRef}
            onChange={handleImageFileUpload}
            className='hidden'
          />
        </div>
        {/* Image Preview */}
        {currentProject?.logo != '' && (
          <div className='space-y-2'>
            <p className='px-1 text-sm font-semibold'>Image Preview</p>
            <div className='p-2 flex items-start justify-between space-x-2 bg-slate-300 bg-opacity-50 rounded-md'>
              <div className='w-full h-28 flex items-center space-x-2 overflow-hidden'>
                <Image
                  src={
                    uploadedImage.imageUrl != ''
                      ? (uploadedImage.imageUrl as string)
                      : currentProject?.logo || '/assets/placeholder.png'
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
            </div>
          </div>
        )}
        {/* Form action buttons */}
        <FormActionButtons
          setIsFormOpen={setIsProjectFormEditOpen}
          isProjectLoading={isProjectEditing}
        />
      </form>
      {/* Error display */}
      {formik.status && <ErrorNotification />}
    </div>
  );
}
