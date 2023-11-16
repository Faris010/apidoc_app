'use client';

import { useEffect, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { TBLock } from '@/types/types';
import useDebounce from '@/hooks/useDebounce';
import { editBlock } from '@/services/block';
import Image from 'next/image';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useToggle } from '@/hooks/useToggle';
import { languageArray } from '@/const/LanguageList';
import deleteBlock from '@/utils/HandleDeleteBlock';

interface Props {
  block: TBLock;
  blockList: TBLock[];
  setBlockList: React.Dispatch<React.SetStateAction<TBLock[]>>;
}

const CodeBlock = ({ block, blockList, setBlockList }: Props) => {
  const [codeBlockValue, setCodeBlockValue] = useState<string | null>(
    block?.content || null
  );
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useToggle(false);
  const [selectedLanguageName, setSelectedLanguageName] = useState(
    languageArray[0].name
  );
  //useOnClickOutside(_, setIsLanguageMenuOpen);

  const debouncedValue = useDebounce(codeBlockValue, 1500);

  const updateCode = async (updatedContent: string) => {
    const updatedBlock = { ...block, content: updatedContent };
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

  const selectedLanguage = languageArray.find(
    (lang) => lang.name === selectedLanguageName
  );

  const selectedLanguageLabel = selectedLanguage
    ? selectedLanguage.label
    : 'js';

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
              <p className='text-xs text-[#3E4248]'>{selectedLanguageName}</p>
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
            {isLanguageMenuOpen && (
              <div className='absolute z-20 bg-white p-1 rounded drop-shadow-lg'>
                {languageArray.map((lang, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedLanguageName(lang.name);
                      setIsLanguageMenuOpen();
                    }}
                    className='px-1 rounded text-sm text-[#3E4248] hover:bg-[#EBEBEA]'
                  >
                    {lang.name}
                  </div>
                ))}
              </div>
            )}
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
          language={selectedLanguageLabel}
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
      {isPopupVisible && (
        <div
          className={`fixed z-50 px-3 py-3 bottom-0 left-1/2 -translate-x-1/2 bg-black text-white text-sm rounded-md transition-transform duration-300 ease-out transform ${
            isPopupVisible && '-translate-y-1/2'
          }`}
        >
          Copied to clipboard
        </div>
      )}
    </>
  );
};

export default CodeBlock;
