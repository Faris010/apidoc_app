'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { getSectionById } from '@/services/section';
import { TBLock, TSection } from '@/types/types';
import { useRouter, useSearchParams } from 'next/navigation';
import BlockTypeModal from '../modals/block_type_modals/BlockTypeModal';
import { getSectionBlocks } from '@/services/block';
import DocumentEditorTitle from './DocumentEditorTitle';
import { getHighestSortOrderNumber } from '@/utils/GetHighestSortOrderNumber';
import DocumentEditorSectionLink from './DocumentEditorSectionLink';
import RenderBlockComponent from '../block/BlockRenderer/RenderBlockComponent';

export default function DocumentEditor({ projectId }: { projectId: string }) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const params = searchParams.get('sectionId');
  const sectionId = params;

  const [isBlockTypeModalOpen, setIsBlockTypeModalOpen] =
    useState<boolean>(false);
  const [blockList, setBlockList] = useState<TBLock[]>([]);
  const highestSortOrder = getHighestSortOrderNumber(blockList);

  const [section, setSection] = useState<TSection>({
    name: '',
    title: '',
  });

  const getSection = async () => {
    if (sectionId) {
      const response = await getSectionById(sectionId);
      setSection(response);
    }
  };

  const getBlocksBySectionId = async () => {
    if (sectionId) {
      const res = await getSectionBlocks(sectionId);
      setBlockList(res.data);
    }
  };

  // const createEmptySection = async () => {
  //   await addSection(section, projectId);
  //   router.refresh();
  // };
  //const [prevTitle, setPrevTitle] = useState<string>('');

  useEffect(() => {
    getSection();
    getBlocksBySectionId();
  }, [sectionId]);

  const blockRef = useRef<HTMLTextAreaElement>(null);

  const [blockTypeSearchFilter, setBlockTypeSearchFilter] =
    useState<string>('');

  const handleBlockTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (blockRef.current) {
      setBlockTypeSearchFilter(e.target.value);
      blockRef.current.style.height = 'auto';
      blockRef.current.style.height = `${e.target.scrollHeight}px`;
      if (e.target.value[e.target.value.length - 1] == '/') {
        setIsBlockTypeModalOpen(true);
      } else {
        setIsBlockTypeModalOpen(false);
      }
    }
  };

  return (
    <div className='w-4/5 bg-white'>
      <div className='w-full p-3 flex items-center justify-between border-b-[1px] border-[#E1E1E1]'>
        {/* Document link */}
        <DocumentEditorSectionLink sectionId={sectionId} />

        <div className='p-1 rounded cursor-pointer hover:bg-[#EBEBEA] '>
          <Image
            src='/assets/more.png'
            alt='more icon'
            height={16}
            width={16}
          />
        </div>
      </div>
      <div className='w-full px-3 pt-20 pb-56 flex justify-center overflow-hidden'>
        <div className='w-2/3  flex-col'>
          {/* Document title */}
          {section.title != '' && <DocumentEditorTitle section={section} />}

          {/* Document body */}
          <div className='space-y-6'>
            {sectionId ? (
              <>
                {blockList.map((block) => (
                  <div key={block.id} className='h-full flex items-start group'>
                    <div className='hidden pr-2 group-hover:flex items-center group-hover:-ml-12'>
                      <div
                        onClick={() => setIsBlockTypeModalOpen(true)}
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
                    {/* Render block based on block type id */}
                    <RenderBlockComponent
                      block={block}
                      blockList={blockList}
                      setBlockList={setBlockList}
                    />
                  </div>
                ))}
                {/* New block placeholder */}
                <div>
                  <textarea
                    rows={1}
                    ref={blockRef}
                    name='block'
                    value={blockTypeSearchFilter}
                    onChange={handleBlockTextarea}
                    className=' w-full rounded outline-none resize-none overflow-hidden text-[#3E4248]'
                    placeholder="Type '/' for commands"
                  />
                </div>
                {isBlockTypeModalOpen && (
                  <BlockTypeModal
                    sectionId={sectionId}
                    highestSortOrder={highestSortOrder}
                    setBlockList={setBlockList}
                    setIsBlockTypeModalOpen={setIsBlockTypeModalOpen}
                  />
                )}
              </>
            ) : (
              <>
                {/* Create empty page button */}
                <div
                  // onClick={createEmptySection}
                  className='px-2 py-1 flex items-center justify-between rounded cursor-pointer group text-[#9e9e9e] hover:bg-[#EBEBEA] hover:text-[#3E4248]'
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
