'use client';

import {
  addSection,
  getSectionById,
  getSectionByProjectId,
} from '@/services/section';
import { TSection } from '@/types/types';
import { GenerateSlug } from '@/utils/GenerateSlug';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DocumentEditor({ projectId }: { projectId: number }) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const params = searchParams.get('sectionId');
  const sectionId = parseInt(params);

  const [section, setSection] = useState<TSection>({
    name: 'Untitled',
    title: 'Untitled',
  });
  const [sectionLink, setSectionLink] = useState<TSection[]>([]);

  const getSection = async () => {
    if (sectionId) {
      const response = await getSectionById(sectionId);
      setSection(response);
    }
  };

  const getSectionLink = async (sectionId: number) => {
    if (sectionId) {
      const res = await getSectionById(sectionId);
      setSectionLink((prev) => [res, ...prev]);
      if (res.paredntId == null) {
        return;
      } else {
        getSectionLink(res.paredntId);
      }
    }
  };

  const createEmptySection = async () => {
    await addSection(section, projectId);
    router.refresh();
  };

  useEffect(() => {
    getSection();
    setSectionLink([]);
    getSectionLink(sectionId);
  }, [sectionId]);

  return (
    <div className='w-4/5 bg-white'>
      <div className='w-full p-3 flex items-center justify-between border-b-[1px] border-[#E1E1E1]'>
        <div className='flex items-center text-sm'>
          {sectionLink.length > 0 ? (
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
            ))
          ) : (
            <span>Untitled</span>
          )}
        </div>
        <div className='p-1 rounded cursor-pointer hover:bg-[#EBEBEA] '>
          <Image
            src='/assets/more.png'
            alt='more icon'
            height={16}
            width={16}
          />
        </div>
      </div>
      <div className='w-full p-3 flex justify-center overflow-hidden'>
        <div className='w-2/3 pt-20 flex-col'>
          <div className='pb-4 text-4xl font-bold'>
            <input
              type='text'
              value={section?.title || ''}
              placeholder='Untitled'
              onChange={(e) =>
                setSection((prev) => ({
                  ...prev,
                  title: e.target.value as string,
                }))
              }
              className='outline-none'
            />
          </div>
          <div>
            {sectionId ? (
              <textarea
                className='w-full p-0 rounded  outline-none resize-none overflow-hidden'
                placeholder="Type '/' for commands"
              ></textarea>
            ) : (
              <div
                onClick={createEmptySection}
                className='px-2 py-1 flex items-center justify-between rounded cursor-pointer group  text-[#9e9e9e] hover:bg-[#EBEBEA] hover:text-[#3E4248]'
              >
                <div className='flex items-center space-x-2'>
                  <Image
                    src='/assets/file.png'
                    alt='document icon'
                    height={24}
                    width={24}
                  />
                  <p>Empty page</p>
                </div>
                <Image
                  src='/assets/arrow-left.png'
                  alt='arrow icon'
                  height={24}
                  width={24}
                  className='hidden group-hover:block'
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
