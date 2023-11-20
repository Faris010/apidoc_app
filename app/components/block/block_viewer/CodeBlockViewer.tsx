'use client';

import { useState, useEffect } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Image from 'next/image';
import { TBLock } from '@/types/types';
import { languageArray } from '@/const/LanguageList';

interface Props {
  block: TBLock;
}

const CodeBlockViewer = ({ block }: Props) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [languageName, setLanguageName] = useState<string>('');

  const handleCopyToClipboard = () => {
    if (block.content) {
      navigator.clipboard.writeText(block.content);
      setIsPopupVisible(true);
      setTimeout(() => {
        setIsPopupVisible(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const language = languageArray.find((lang) => lang.label == block.language);
    setLanguageName(language?.name!);
  }, []);

  return (
    <>
      <div
        data-color-mode='light'
        className='w-full overflow-hidden rounded bg-[#F6F8FA]'
      >
        <div className='p-1 flex justify-between'>
          <p className='p-1 text-xs text-[#3E4248]'>{languageName}</p>
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
        </div>
        <CodeEditor
          disabled
          value={block.content || ''}
          language={block.language}
          placeholder='Please enter code.'
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

export default CodeBlockViewer;
