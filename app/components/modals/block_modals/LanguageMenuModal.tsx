import { languageArray } from '@/const/LanguageList';
import { editBlock } from '@/services/block';
import { TBLock, TLanguage } from '@/types/types';
import { forwardRef } from 'react';

interface Props {
  block: TBLock;
  selectedLanguage: TLanguage;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<TLanguage>>;
  setIsLanguageMenuOpen: () => void;
}

const LanguageMenuModal = forwardRef<HTMLDivElement, Props>(
  (
    { block, selectedLanguage, setSelectedLanguage, setIsLanguageMenuOpen },
    ref
  ) => {
    const handleChangeLanguage = async (languageLabel: string) => {
      const updatedBlock = [{ ...block, language: languageLabel }];
      await editBlock(updatedBlock);
      setSelectedLanguage({ ...selectedLanguage, label: languageLabel });
      setIsLanguageMenuOpen();
    };
    return (
      <div
        ref={ref}
        className='absolute mt-8 z-20 bg-white p-1 rounded drop-shadow-lg'
      >
        {languageArray.map((lang) => (
          <div
            key={lang.id}
            onClick={() => handleChangeLanguage(lang.label)}
            className='px-1 rounded text-sm text-[#3E4248] cursor-pointer hover:bg-[#EBEBEA]'
          >
            {lang.name}
          </div>
        ))}
      </div>
    );
  }
);

export default LanguageMenuModal;
