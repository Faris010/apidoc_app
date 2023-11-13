import { TFormik, TSection } from '@/types/types';
import { FormikProps } from 'formik';
import Image from 'next/image';
import { forwardRef } from 'react';

interface Props {
  isAddSectionOpen: boolean;
  formik: FormikProps<TFormik>;
  section: TSection | null;
  handleInputBlur: () => Promise<void>;
  handleInputKeyPress: (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => Promise<void>;
}

const CreateSectionInput = forwardRef<HTMLInputElement, Props>(
  (
    { isAddSectionOpen, formik, section, handleInputBlur, handleInputKeyPress },
    ref
  ) => {
    return (
      <div
        className={`${
          (!isAddSectionOpen || formik.values.parentId != section?.id) &&
          'hidden'
        } ${
          section == null ? 'pl-2' : 'pl-4'
        } pr-2 py-1 flex items-center space-x-1 cursor-pointer rounded hover:bg-[#EBEBEA]`}
      >
        <div>
          <div className='w-5 h-5 p-1.5 hover:bg-[#DDDDDC] rounded'>
            <Image
              src='/assets/right-arrow.png'
              alt='arrow icon'
              height={14}
              width={14}
            />
          </div>
        </div>
        <div className='w-full flex overflow-hidden'>
          <input
            ref={ref}
            type='text'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyPress}
            className='w-full px-1 h-5 rounded outline-none text-sm'
          />
        </div>
      </div>
    );
  }
);

export default CreateSectionInput;
