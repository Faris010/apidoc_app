import { getSectionById } from '@/services/section';
import { TSection } from '@/types/types';
import { GenerateSlug } from '@/utils/GenerateSlug';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Props {
  sectionId: string | null;
}

export default function DocumentEditorSectionBreadcrumb({ sectionId }: Props) {
  const [sectionLink, setSectionLink] = useState<TSection[]>([]);

  let prevId: string[] = [];
  const getSectionLink = async (sectionId: string | null) => {
    if (sectionId) {
      const response = await getSectionById(sectionId);
      const { payload } = response;
      if (!prevId.includes(payload.id)) {
        prevId.push(payload.id);
        setSectionLink((prev) => [payload, ...prev]);
        if (payload.parentId == null) {
          return;
        } else {
          getSectionLink(payload.parentId);
        }
      }
    }
  };

  useEffect(() => {
    prevId = [];
    setSectionLink([]);
    getSectionLink(sectionId);
  }, [sectionId]);

  return (
    <div className='flex items-center text-sm'>
      {sectionLink.length > 0 ? (
        sectionLink.map((sec, i) => (
          <Link
            href={{
              query: {
                section: GenerateSlug(sec?.name?.toLowerCase()),
                sectionId: sec?.id,
              },
            }}
            key={sec?.id}
          >
            {sec?.name}{' '}
            {i !== sectionLink.length - 1 && <span>&nbsp;/&nbsp;</span>}
          </Link>
        ))
      ) : (
        <p>Untitled</p>
      )}
    </div>
  );
}
