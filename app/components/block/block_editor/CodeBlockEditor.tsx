'use client';

import { useEffect, useRef, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { TBLock, TLanguage } from '@/types/types';
import useDebounce from '@/hooks/useDebounce';
import { editBlock } from '@/services/block';
import Image from 'next/image';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useToggle } from '@/hooks/useToggle';
import { languageArray } from '@/const/LanguageList';
import deleteBlock from '@/utils/HandleDeleteBlock';
import LanguageMenuModal from '@/components/modals/block_modals/LanguageMenuModal';
import CopiedNotificationPopup from '@/components/popup/CopiedNotificationPopup';

interface Props {
  block: TBLock;
  blockList: TBLock[];
  setBlockList: React.Dispatch<React.SetStateAction<TBLock[]>>;
}

const CodeBlockEditor = ({ block, blockList, setBlockList }: Props) => {
  const [codeBlockValue, setCodeBlockValue] = useState<string | null>(
    block?.content || null
  );
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useToggle(false);
  const [selectedLanguage, setSelectedLanguage] = useState<TLanguage>({
    id: 0,
    name: '',
    label: block.language,
  });
  const languageMenuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(languageMenuRef, setIsLanguageMenuOpen);

  const debouncedValue = useDebounce(codeBlockValue, 1500);

  const updateCode = async (updatedContent: string) => {
    const updatedBlock = [{ ...block, content: updatedContent }];
    await editBlock(updatedBlock);
  };

  useEffect(() => {
    if (debouncedValue != null && debouncedValue != block?.content) {
      updateCode(debouncedValue);
    }
  }, [debouncedValue]);

  const handleCodeBlockChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCodeBlockValue(e.target.value);
  };

  const selectedLang = languageArray.find(
    (lang) => lang.label === selectedLanguage.label
  );

  useEffect(() => {
    setSelectedLanguage(selectedLang!);
  }, [selectedLanguage]);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleCopyToClipboard = () => {
    if (block.content) {
      navigator.clipboard.writeText(block.content);
      setIsPopupVisible(true);
      setTimeout(() => {
        setIsPopupVisible(false);
      }, 2000);
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
    <>
      <div
        data-color-mode='light'
        className='w-full overflow-hidden rounded bg-[#F6F8FA]'
      >
        <div className='p-1 flex justify-between'>
          <div className='relative cursor-pointer'>
            <div
              onClick={setIsLanguageMenuOpen}
              className='w-full p-1 flex items-center rounded space-x-2 hover:bg-[#EBEBEA]'
            >
              <p className='text-xs text-[#3E4248]'>{selectedLanguage?.name}</p>
              <div>
                <Image
                  src='/assets/right-arrow.png'
                  alt='arrow icon'
                  width={10}
                  height={10}
                  className='rotate-90'
                />
              </div>
            </div>
          </div>
          <div className='flex'>
            <div
              className='p-1 cursor-pointer rounded hover:bg-[#EBEBEA]'
              onClick={handleCopyToClipboard}
            >
              <Image
                src='/assets/copy.png'
                alt='copy icon'
                width={16}
                height={16}
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            <div onClick={handleDeleteBlock}>
              <Image
                src='/assets/delete-grey.png'
                alt='delete icon'
                width={16}
                height={16}
                style={{ width: 'auto', height: 'auto' }}
                className='p-1 cursor-pointer rounded hover:bg-[#EBEBEA]'
              />
            </div>
          </div>
        </div>
        <CodeEditor
          value={codeBlockValue || ''}
          language={selectedLanguage?.label}
          placeholder='Please enter code.'
          onChange={handleCodeBlockChange}
          padding={15}
          style={{
            fontFamily:
              'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            fontSize: 12,
          }}
        />
      </div>
      {isLanguageMenuOpen && (
        <LanguageMenuModal
          ref={languageMenuRef}
          block={block}
          selectedLanguage={selectedLanguage!}
          setSelectedLanguage={setSelectedLanguage}
          setIsLanguageMenuOpen={setIsLanguageMenuOpen}
        />
      )}
      {isPopupVisible && (
        <CopiedNotificationPopup
          text={'Copied to clipboard'}
          isPopupVisible={isPopupVisible}
        />
      )}
    </>
  );
};

export default CodeBlockEditor;
