'use client';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useToggle } from '@/hooks/useToggle';
import { editBlock } from '@/services/block';
import { TBLock } from '@/types/types';
import deleteBlock from '@/utils/HandleDeleteBlock';
import { UploadImageToStorage } from '@/utils/UploadImageToStorage';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface Props {
  block: TBLock;
  blockList: TBLock[];
  setBlockList: React.Dispatch<React.SetStateAction<TBLock[]>>;
}

const AddImageBlockModal = ({ block, blockList, setBlockList }: Props) => {
  const imageModalRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [isImageUploadModalOpen, setIsImageUploadModalOpen] = useToggle(false);
  const [selectedOption, setSelectedOption] = useState<string>('upload');

  useOnClickOutside(imageModalRef, setIsImageUploadModalOpen);

  const handleImageFileUpload = async () => {
    if (fileRef.current?.files) {
      const file: File = fileRef.current.files[0];
      const imageUrl = await UploadImageToStorage(file);
      const updatedBlock = [{ ...block, image: imageUrl }];
      await editBlock(updatedBlock);
      const updatedBlockIndex = blockList.findIndex(
        (block) => block.id === updatedBlock[0].id
      );
      if (updatedBlockIndex !== -1) {
        const updatedBlocks = [...blockList];
        updatedBlocks[updatedBlockIndex] = updatedBlock[0];
        setBlockList(updatedBlocks);
      }
    }
  };

  const handleDeleteBlock = () => {
    if (block.id) {
      deleteBlock(block.id);
      const updatedBlockList = blockList.filter((b) => b.id !== block.id);
      setBlockList(updatedBlockList);
    }
  };

  return (
    <div className='relative w-full flex flex-col items-center justify-center'>
      <div
        onClick={setIsImageUploadModalOpen}
        className='w-full py-4 px-4 bg-[#F2F1EE] rounded-md cursor-pointer'
      >
        <div className='flex items-center justify-start space-x-4 '>
          <Image
            src='/assets/placeholder.png'
            alt='image placeholder'
            height={25}
            width={25}
          />
          <p className='text-[#878681] text-sm'>Add an image</p>
        </div>
      </div>
      {isImageUploadModalOpen && (
        <div
          ref={imageModalRef}
          className='w-2/3 py-2 bg-white rounded space-y-2 drop-shadow-lg shadow-lg'
        >
          <div className='flex px-4 space-x-2'>
            <div
              onClick={() => setSelectedOption('upload')}
              className={`py-1 px-2 ${
                selectedOption == 'upload' && 'bg-[#EFEFEF]'
              } text-sm cursor-pointer rounded hover:bg-[#EFEFEF]`}
            >
              Upload
            </div>
            <div
              onClick={() => setSelectedOption('link')}
              className={`py-1 px-2 ${
                selectedOption == 'link' && 'bg-[#EFEFEF]'
              } text-sm cursor-pointer rounded hover:bg-[#EFEFEF]`}
            >
              Embed Link
            </div>
          </div>
          <div className='h-[1px] w-full bg-slate-200'></div>
          <div className='px-4 py-2'>
            {selectedOption == 'upload' ? (
              <div className='w-full py-1 flex items-center justify-center border-[1px] border-slate-300 rounded text-sm cursor-pointer'>
                <label
                  htmlFor='image'
                  className='w-full h-full flex justify-center cursor-pointer'
                >
                  Upload file
                </label>
                <input
                  id='image'
                  type='file'
                  accept='image/*'
                  ref={fileRef}
                  onChange={handleImageFileUpload}
                  className='hidden'
                />
              </div>
            ) : (
              <div className='flex flex-col items-center justify-between space-y-2'>
                <input
                  type='text'
                  placeholder='Paste the image link...'
                  className='w-full px-2 py-1 border-[1px] border-slate-300 rounded text-sm'
                />
                <button className='w-1/2 py-1 flex items-center justify-center bg-gray-900 rounded text-white text-sm'>
                  Embed image
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <div
        onClick={handleDeleteBlock}
        className='absolute top-1 right-1 p-1 opacity-0 group-hover:opacity-100 bg-black bg-opacity-75 rounded'
      >
        <Image
          src='/assets/delete-white.png'
          alt='icon'
          width={16}
          height={16}
          style={{ width: 'auto', height: 'auto' }}
          className='cursor-pointer'
        />
      </div>
    </div>
  );
};

export default AddImageBlockModal;
