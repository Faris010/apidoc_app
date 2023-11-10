'use client';

import {
  addSection,
  editSection,
  getSectionById,
  getSectionByProjectId,
} from '@/services/section';
import { TBLock, TSection } from '@/types/types';
import { GenerateSlug } from '@/utils/GenerateSlug';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import BlockTypeModal from '../modals/BlockTypeModal';
import { useToggle } from '@/hooks/useToggle';
import useDebounce from '@/hooks/useDebounce';
import ParagraphBlock from '../block_type/ParagraphBlock';
import ImageBlock from '../block_type/ImageBlock';
import CodeBlock from '../block_type/CodeBlock';

export default function DocumentEditor({ projectId }: { projectId: string }) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const params = searchParams.get('sectionId');
  const sectionId = params;

  const [isBlockTypeModalOpen, setIsBlockTypeModalOpen] = useToggle(false);
  const [blockList, setBlockList] = useState<TBLock[]>([
    {
      id: 'asf32wf-23m4304-23gwgd1',
      content: '',
      image: null,
      sortOrder: 1,
      sectionId: '028904fa-33a2-4f9b-88d8-19efe9bf369b',
      blockTypeId: 1,
    },
    {
      id: 'jtr4w2s-pšth32a-ghmzt2a',
      content: '',
      image: null,
      sortOrder: 2,
      sectionId: '028904fa-33a2-4f9b-88d8-19efe9bf369b',
      blockTypeId: 2,
    },
    {
      id: 'aeth21da-ds23tf-gf3fg2',
      content: null,
      image: '',
      sortOrder: 3,
      sectionId: '028904fa-33a2-4f9b-88d8-19efe9bf369b',
      blockTypeId: 3,
    },
  ]);

  const [section, setSection] = useState<TSection>({
    name: '',
    title: '',
  });
  const [sectionLink, setSectionLink] = useState<TSection[]>([]);

  const getSection = async () => {
    if (sectionId) {
      const response = await getSectionById(sectionId);
      setSection(response);
      //setPrevTitle(section.title);
    }
  };

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

  // const createEmptySection = async () => {
  //   await addSection(section, projectId);
  //   router.refresh();
  // };
  //const [prevTitle, setPrevTitle] = useState<string>('');

  useEffect(() => {
    getSection();
    setSectionLink([]);
    getSectionLink(sectionId);
  }, [sectionId]);

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const blockRef = useRef<HTMLTextAreaElement>(null);
  //const debouncedValue = useDebounce<string>(section?.title, 1000);
  // if (section.id) console.log('1', section);
  // console.log('1', section.title);
  // console.log('1', prevTitle);

  // const updateSectionTitle = async () => {
  //   await editSection(section);
  // };

  // useEffect(() => {
  //   //setPrevTitle(section.title);
  //   const timer = setTimeout(async () => {
  //     if (section.title != '' && prevTitle != '' && prevTitle != section.title)
  //       console.log('Update');
  //     console.log('pt', prevTitle);
  //     console.log('st', section?.title);
  //     //console.log(section);
  //     //setPrevTitle(section?.title);
  //   }, 1000);
  //   //console.log('egwegweg');

  //   return () => {
  //     clearTimeout(timer);
  //   };

  //   //Fix: Send API only when you make title change not on mounting
  //   // if (debouncedValue !== 'Untitled') {
  //   //   console.log(section);
  //   //   const updateSectionTitle = async () => {
  //   //     //await editSection(section);
  //   //     console.log('This made call');
  //   //   };
  //   //   updateSectionTitle();
  //   // }
  // }, [section?.title]);

  const handleTitleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (titleRef.current) {
      titleRef.current.style.height = 'auto';
      titleRef.current.style.height = `${e.target.scrollHeight}px`;
      setSection((prev) => ({ ...prev, title: e.target.value }));
    }
  };

  // const blockTypeSearchFilter = () => {};

  const handleBlockTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (blockRef.current) {
      blockRef.current.style.height = 'auto';
      blockRef.current.style.height = `${e.target.scrollHeight}px`;
      if (blockRef.current.value.includes('/')) {
        setIsBlockTypeModalOpen();
      }
    }
  };

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
            <textarea
              rows={1}
              ref={titleRef}
              name='title'
              value={section?.title || ''}
              placeholder='Untitled'
              onChange={handleTitleTextarea}
              className='w-full resize-none overflow-hidden outline-none '
            />
          </div>
          <div className='space-y-4'>
            {sectionId ? (
              <>
                {blockList.map((block) => (
                  <div key={block.id} className='flex items-start group'>
                    <div className='hidden pr-2 group-hover:flex items-center group-hover:-ml-12'>
                      <div
                        onClick={setIsBlockTypeModalOpen}
                        className='p-0.5 hover:bg-[#EBEBEA] rounded'
                      >
                        <Image
                          src='/assets/add.png'
                          alt='add icon'
                          height={16}
                          width={16}
                          className='cursor-pointer'
                        />
                      </div>
                      <div className='p-0.5 hover:bg-[#EBEBEA] rounded'>
                        <Image
                          src='/assets/drag.png'
                          alt='add icon'
                          height={16}
                          width={16}
                          className='cursor-grab'
                        />
                      </div>
                    </div>
                    {block.blockTypeId == 1 ? (
                      <ParagraphBlock
                        handleBlockTextarea={handleBlockTextarea}
                        blockTypeId={block.blockTypeId}
                      />
                    ) : block.blockTypeId == 2 ? (
                      <ImageBlock />
                    ) : (
                      <CodeBlock />
                    )}
                    {/* <textarea
                    rows={1}
                    ref={blockRef}
                    name='block'
                    onChange={handleBlockTextarea}
                    className='w-full rounded outline-none resize-none overflow-hidden text-[#3E4248]'
                    placeholder="Type '/' for commands"
                  /> */}
                  </div>
                ))}
                {isBlockTypeModalOpen && <BlockTypeModal />}
              </>
            ) : (
              <div
                // onClick={createEmptySection}
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
