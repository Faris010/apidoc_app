import { getSectionById } from '@/services/section';
import { TSection } from '@/types/types';
import { GenerateSlug } from '@/utils/GenerateSlug';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Props {
  sectionId: string | null;
}

export default function DocumentEditorSectionLink({ sectionId }: Props) {
  const [sectionLink, setSectionLink] = useState<TSection[]>([]);

  const getSectionLink = async (sectionId: string | null) => {
    if (sectionId) {
      const res = await getSectionById(sectionId);
      setSectionLink((prev) => [res, ...prev]);
      if (res.parentId == null) {
        return;
      } else {
        getSectionLink(res.parentId);
      }
    }
  };

  useEffect(() => {
    setSectionLink([]);
    getSectionLink(sectionId);
  }, [sectionId]);

  return (
    <div className='flex items-center text-sm'>
      {sectionLink.length > 0 &&
        sectionLink.map((sec, i) => (
          <Link
            href={{
              query: {
                section: GenerateSlug(sec.name.toLowerCase()),
                sectionId: sec?.id,
              },
            }}
            key={i}
          >
            {sec.name}{' '}
            {i !== sectionLink.length - 1 && <span>&nbsp;/&nbsp;</span>}
          </Link>
        ))}
    </div>
  );
}
