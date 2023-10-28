'use client';

import { useSearchParams } from 'next/navigation';

export default function DocumentEditor() {
  const searchParams = useSearchParams();
  const sectionName = searchParams.get('section');
  return <div className='w-4/5 bg-white p-3'>{sectionName}</div>;
}
