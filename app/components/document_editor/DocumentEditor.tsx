'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import { getSectionById } from '@/services/section';
import { TBLock, TSection } from '@/types/types';
import { useRouter, useSearchParams } from 'next/navigation';
import BlockTypeModal from '../modals/block_type_modals/BlockTypeModal';
import { editBlock, getSectionBlocks } from '@/services/block';
import DocumentEditorTitle from './DocumentEditorTitle';
import { getHighestSortOrderNumber } from '@/utils/GetHighestSortOrderNumber';
import RenderBlockComponent from '../block/BlockRenderer/RenderBlockComponent';
import DocumentViewerTitle from '../document_viewer/DocumentViewerTitle';
import handleSortOrderUpdate from '@/utils/HandleOnDrop';
import DocumentEditorSectionBreadcrumb from './DocumentEditorSectionBreadcrumb';

interface Props {
  projectId: string;
  isViewer: boolean;
  setIsSidebarOpenOnMobile: () => void;
  isSidebarOpenOnMobile: boolean;
}

export default function DocumentEditor({
  projectId,
  isViewer,
  setIsSidebarOpenOnMobile,
  isSidebarOpenOnMobile,
}: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const params = searchParams.get('sectionId');
  const sectionId = params;

  const [isBlockTypeModalOpen, setIsBlockTypeModalOpen] =
    useState<boolean>(false);
  const [targetedBlockId, setTargetedBlockId] = useState<string>('');

  const [blockList, setBlockList] = useState<TBLock[]>([]);
  const [section, setSection] = useState<TSection>({
    name: '',
    title: '',
  });

  const memoizedBlocks = useMemo(() => blockList, [blockList]);
  const highestSortOrder = getHighestSortOrderNumber(blockList);

  const getSection = async () => {
    if (sectionId) {
      const response = await getSectionById(sectionId);
      setSection(response.payload);
    }
  };

  const getBlocksBySectionId = async () => {
    if (sectionId) {
      const response = await getSectionBlocks(sectionId);
      setBlockList(response.payload);
    }
  };

  useEffect(() => {
    getSection();
    getBlocksBySectionId();
  }, [sectionId, router]);

  const newBlockRef = useRef<HTMLTextAreaElement | null>(null);

  const [blockTypeSearchFilter, setBlockTypeSearchFilter] =
    useState<string>('');

  const handleBlockTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (newBlockRef.current) {
      setBlockTypeSearchFilter(e.target.value);
      newBlockRef.current.style.height = 'auto';
      newBlockRef.current.style.height = `${e.target.scrollHeight}px`;
      if (e.target.value.endsWith('/')) {
        setIsBlockTypeModalOpen(true);
      } else {
        setIsBlockTypeModalOpen(false);
      }
    }
  };

  const handleOnDragStart = (e: React.DragEvent, blockId: string) => {
    if (!isViewer) {
      e.dataTransfer.setData('blockId', blockId);
    }
  };

  const handleOnDragOver = (e: React.DragEvent, blockId: string) => {
    e.preventDefault();
    if (blockId !== targetedBlockId) {
      setTargetedBlockId(blockId);
    }
  };

  const handleOnDrop = async (e: React.DragEvent, targetedBlockId: string) => {
    const block = e.dataTransfer.getData('blockId');
    const response = await handleSortOrderUpdate(
      blockList,
      block,
      targetedBlockId
    );
    if (response.success) {
      await editBlock(response.updatedBlockList!);
      setBlockList(response.updatedBlockList!);
    }
    setTargetedBlockId('');
  };

  return (
    <div className='w-4/5 max-lg:w-full bg-white'>
      {sectionId ? (
        <>
          {/* Document breadcrumb */}
          <div className='w-full p-3 flex items-center justify-start max-md:justify-between border-b-[1px] border-[#E1E1E1]'>
            <DocumentEditorSectionBreadcrumb sectionId={sectionId} />
            <div
              onClick={setIsSidebarOpenOnMobile}
              className='hidden max-md:flex z-50 flex-col items-center space-y-1'
            >
              {!isSidebarOpenOnMobile ? (
                <>
                  <div className={`h-0.5 w-6 bg-gray-600 rounded-lg`}></div>
                  <div className={`h-0.5 w-6 bg-gray-600 rounded-lg`}></div>
                  <div className={`h-0.5 w-6 bg-gray-600 rounded-lg`}></div>
                </>
              ) : (
                <svg
                  className='h-8 w-8 text-gray-600'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <line x1='18' y1='6' x2='6' y2='18' />
                  <line x1='6' y1='6' x2='18' y2='18' />
                </svg>
              )}
            </div>
          </div>

          <div className='w-full px-3 pt-20 pb-56 flex justify-center overflow-hidden'>
            <div className='w-2/3 flex-col'>
              {/* Document title */}
              {isViewer ? (
                <DocumentViewerTitle sectionTitle={section.title} />
              ) : (
                <DocumentEditorTitle section={section} />
              )}

              {/* Document body */}
              <div>
                {memoizedBlocks?.map((block) => (
                  <div key={block.id} className='w-full'>
                    <div
                      draggable={!isViewer}
                      onDrop={(e) => handleOnDrop(e, block.id!)}
                      onDragOver={(e) => handleOnDragOver(e, block.id!)}
                      className='h-full py-2 flex items-start group'
                    >
                      {!isViewer && (
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
                          <div
                            onDragStart={(e) => handleOnDragStart(e, block.id!)}
                            className='p-0.5 hover:bg-[#EBEBEA] rounded'
                          >
                            <Image
                              src='/assets/drag.png'
                              alt='add icon'
                              height={16}
                              width={16}
                              className='cursor-grab'
                            />
                          </div>
                        </div>
                      )}
                      {/* Render block based on block type id */}
                      <RenderBlockComponent
                        block={block}
                        blockList={blockList}
                        setBlockList={setBlockList}
                        isViewer={isViewer}
                      />
                    </div>
                    {!isViewer && (
                      <div
                        className={`w-full h-1 bg-blue-300 opacity-0 ${
                          targetedBlockId == block.id && 'opacity-100'
                        }`}
                      ></div>
                    )}
                  </div>
                ))}

                {/* New block placeholder */}
                {!isViewer && (
                  <div>
                    <textarea
                      rows={1}
                      ref={newBlockRef}
                      name='block'
                      value={blockTypeSearchFilter}
                      onChange={handleBlockTextarea}
                      className=' w-full rounded outline-none resize-none overflow-hidden text-[#3E4248]'
                      placeholder="Type '/' for commands"
                    />
                  </div>
                )}
                {isBlockTypeModalOpen && (
                  <BlockTypeModal
                    sectionId={sectionId}
                    highestSortOrder={highestSortOrder}
                    setBlockList={setBlockList}
                    setIsBlockTypeModalOpen={setIsBlockTypeModalOpen}
                    setBlockTypeSearchFilter={setBlockTypeSearchFilter}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className='h-full flex flex-col items-center justify-center space-y-3'>
          <div className='relative w-60 h-60'>
            <Image
              src='/assets/empty.png'
              fill
              className='grayscale'
              alt='Empty'
            />
          </div>
          <div className='text-sm font-semibold'>No sections found</div>
        </div>
      )}
    </div>
  );
}
