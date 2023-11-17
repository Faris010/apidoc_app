import { languageArray } from '@/const/LanguageList';
import { forwardRef } from 'react';

interface Props {
  setSelectedLanguageName: React.Dispatch<React.SetStateAction<string>>;
  setIsLanguageMenuOpen: () => void;
}

const LanguageMenuModal = forwardRef<HTMLDivElement, Props>(
  ({ setSelectedLanguageName, setIsLanguageMenuOpen }, ref) => {
    return (
      <div
        ref={ref}
        className='absolute mt-8 z-20 bg-white p-1 rounded drop-shadow-lg'
      >
        {languageArray.map((lang) => (
          <div
            key={lang.id}
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
    );
  }
);

export default LanguageMenuModal;
