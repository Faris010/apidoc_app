import Image from 'next/image';
import FormActionButtons from '../forms_action_buttons/FormActionButtons';
import { TSection } from '@/types/types';

interface Props {
  setIsSectionFormOpen: () => void;
  setSection: React.Dispatch<React.SetStateAction<TSection>>;
  section: TSection;
  handleAddSection: (e: React.FormEvent) => Promise<void>;
}

export default function SectionForm({
  setIsSectionFormOpen,
  setSection,
  section,
  handleAddSection,
}: Props) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSection({ ...section, [e.target.name]: e.target.value });
  };

  return (
    <div className='absolute w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <form
        onSubmit={handleAddSection}
        className='w-1/3 bg-white rounded-lg space-y-8 px-10 py-6'
      >
        <div className='flex items-center justify-between'>
          <p className='text-xl font-semibold'>Create new section</p>
          <div
            onClick={setIsSectionFormOpen}
            className='hover:bg-slate-200 rounded-full p-2 cursor-pointer'
          >
            <Image
              src='/assets/reject.png'
              alt='close icon'
              height={16}
              width={16}
            />
          </div>
        </div>
        <div className='flex flex-col space-y-1'>
          <label htmlFor='section-name' className='px-1 text-sm font-semibold'>
            Section name
          </label>
          <input
            id='section-name'
            type='text'
            name='name'
            required
            placeholder='Enter Section name...'
            className={`w-full px-1 p-2 border-b-[1px] border-[#B4B4B3] outline-none`}
            value={section.name}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex flex-col space-y-1'>
          <label htmlFor='title' className='px-1 text-sm font-semibold'>
            Section title
          </label>
          <input
            id='title'
            type='text'
            name='title'
            required
            placeholder='Enter Section title...'
            className={`w-full px-1 p-2 border-b-[1px] border-[#B4B4B3] outline-none`}
            value={section.title}
            onChange={handleInputChange}
          />
        </div>
        <FormActionButtons setIsFormOpen={setIsSectionFormOpen} />
      </form>
    </div>
  );
}
