'use client';

import useDebounce from '@/hooks/useDebounce';
import { editBlock } from '@/services/block';
import { TBLock } from '@/types/types';
import deleteBlock from '@/utils/HandleDeleteBlock';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface Props {
  block: TBLock;
  blockList: TBLock[];
  setBlockList: React.Dispatch<React.SetStateAction<TBLock[]>>;
}

const ParagraphBlock = ({ block, blockList, setBlockList }: Props) => {
  const [paragraphBlockValue, setParagraphBlockValue] = useState<string | null>(
    block?.content || null
  );

  const paragraphBlockRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    //Set initial height for paragraph textarea
    if (block?.content) {
      const textarea = paragraphBlockRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }
  }, []);

  const debouncedValue = useDebounce(paragraphBlockValue, 2000);

  const updateParagraph = async (updatedContent: string) => {
    const updatedBlock = { ...block, content: updatedContent };
    await editBlock(updatedBlock);
  };

  useEffect(() => {
    if (debouncedValue != null && debouncedValue != block?.content) {
      updateParagraph(debouncedValue);
      console.log('Update');
    }
  }, [debouncedValue]);

  const handleParagraphBlockChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    setParagraphBlockValue(e.target.value);
  };

  const handleDeleteBlock = () => {
    if (block.id) {
      deleteBlock(block.id);
      const updatedBlockList = blockList.filter((b) => b.id !== block.id);
      setBlockList(updatedBlockList);
    }
  };

  return (
    <div className='relative w-full p-1 hover:bg-[#F6F8FA] rounded-md overflow-hidden group'>
      <div onClick={handleDeleteBlock} className='absolute top-1 right-1'>
        <Image
          src='/assets/delete-grey.png'
          alt='delete icon'
          width={16}
          height={16}
          style={{ width: 'auto', height: 'auto' }}
          className='hidden p-1 cursor-pointer rounded group-hover:block hover:bg-[#EBEBEA]'
        />
      </div>
      <textarea
        rows={1}
        ref={paragraphBlockRef}
        name='block'
        value={paragraphBlockValue || ''}
        onChange={handleParagraphBlockChange}
        className={`${
          block.blockTypeId != 1 && 'hidden'
        } w-full px-1 pt-5 bg-transparent  rounded outline-none resize-none overflow-hidden text-[#3E4248]`}
        placeholder='Enter some text'
      />
    </div>
  );
};

export default ParagraphBlock;
