'use client';

interface Props {
  sectionTitle: string;
}

export default function DocumentViewerTitle({ sectionTitle }: Props) {
  return (
    <div className='pb-4 text-4xl font-bold'>
      <p className='w-full'>{sectionTitle || 'Untitled'}</p>
    </div>
  );
}
