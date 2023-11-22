'use client';

import useDebounce from '@/hooks/useDebounce';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
  setProjectSearchFilter: React.Dispatch<React.SetStateAction<string>>;
  projectSearchFilter: string;
}

export default function Navbar({
  setProjectSearchFilter,
  projectSearchFilter,
}: Props) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/login');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectSearchFilter(e.target.value);
  };

  return (
    <div className='w-full px-10 max-md:px-4 py-4 flex items-center justify-between shadow-md bg-white'>
      <div className='font-bold text-xl z-20'>API DOC</div>
      <div className='max-sm:hidden max-md:hidden w-1/2 px-3 py-2 flex items-center space-x-3 bg-slate-100 rounded-md'>
        <Image
          src='/assets/search.png'
          alt='search-icon'
          height={14}
          width={14}
        />
        <input
          id='search'
          type='text'
          placeholder='Search Projects...'
          onChange={handleSearch}
          className='w-full outline-none bg-transparent'
        />
      </div>
      <div
        onClick={handleLogout}
        className='flex items-center space-x-2 cursor-pointer'
      >
        <Image
          src='/assets/logout.png'
          alt='logout-icon'
          height={16}
          width={16}
        />
        <p className='text-red-600'>Log out</p>
      </div>
    </div>
  );
}
