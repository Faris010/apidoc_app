'use client';

import useDebounce from '@/hooks/useDebounce';
import { editSection } from '@/services/section';
import { TSection } from '@/types/types';
import { useEffect, useRef, useState } from 'react';
import UpdateBlockPopup from '../popup/UpdateBlockPopup';

interface Props {
  section: TSection;
}

export default function DocumentEditorTitle({ section }: Props) {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [sectionTitleValue, setSectionTitleValue] = useState<string>(
    section?.title || ''
  );

  //Reset section title when the section changes
  useEffect(() => {
    setSectionTitleValue(section?.title || '');
  }, [section]);

  useEffect(() => {
    //Set initial height for title textarea
    if (section?.title) {
      const textarea = titleRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }
  }, []);

  const debouncedValue = useDebounce(sectionTitleValue, 1500);

  const updateTitle = async (updatedTitle: string) => {
    const updatedSection = { ...section, title: updatedTitle };
    await editSection(updatedSection);
  };

  useEffect(() => {
    let timeoutId: any;

    if (debouncedValue != '' && debouncedValue != section?.title) {
      updateTitle(debouncedValue);
      setIsUpdated(true);
      timeoutId = setTimeout(() => {
        setIsUpdated(false);
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [debouncedValue]);

  const handleTitleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    setSectionTitleValue(e.target.value);
  };
  return (
    <>
      <div className='pb-4 text-4xl font-bold'>
        <textarea
          rows={1}
          ref={titleRef}
          name='title'
          value={sectionTitleValue}
          placeholder='Untitled'
          onChange={handleTitleTextarea}
          className='w-full resize-none overflow-hidden outline-none '
        />
      </div>
      {isUpdated && <UpdateBlockPopup text={'Title'} />}
    </>
  );
}
