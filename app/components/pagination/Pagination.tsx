'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  totalPages: number[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ totalPages, setCurrentPage }: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const pageQuery = params.get('page');
  const handlePageQuery = (pageNumber: number) => {
    router.push(`?page=${pageNumber}`);
    setCurrentPage(pageNumber);
  };

  return (
    <div className='space-x-2'>
      <button onClick={() => handlePageQuery(1)}>First</button>
      {totalPages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageQuery(page)}
          className={`py-1 px-3 rounded-sm ${
            pageQuery == page.toString() && 'bg-gray-900 text-white'
          } `}
        >
          {page}
        </button>
      ))}
      <button onClick={() => handlePageQuery(totalPages.length)}>Last</button>
    </div>
  );
};

export default Pagination;
