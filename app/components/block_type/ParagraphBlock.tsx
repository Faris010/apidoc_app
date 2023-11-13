'use client';

import useDebounce from '@/hooks/useDebounce';
import { editBlock } from '@/services/block';
import { TBLock } from '@/types/types';
import { useEffect, useRef, useState } from 'react';

interface Props {
  block: TBLock;
}

const ParagraphBlock = ({ block }: Props) => {
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

  return (
    <textarea
      rows={1}
      ref={paragraphBlockRef}
      name='block'
      value={paragraphBlockValue || ''}
      onChange={handleParagraphBlockChange}
      className={`${
        block.blockTypeId != 1 && 'hidden'
      } w-full rounded outline-none resize-none overflow-hidden text-[#3E4248]`}
      placeholder='Enter some text'
    />
  );
};

export default ParagraphBlock;
