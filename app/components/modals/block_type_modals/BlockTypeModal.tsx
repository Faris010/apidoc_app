import { getBlockTypes } from '@/services/blockType';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { TBLock, TBlockType } from '@/types/types';
import { addBlock, getSectionBlocks } from '@/services/block';

interface Props {
  sectionId: string;
  highestSortOrder: number;
  setBlockList: React.Dispatch<React.SetStateAction<TBLock[]>>;
  setIsBlockTypeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BlockTypeModal({
  sectionId,
  highestSortOrder,
  setBlockList,
  setIsBlockTypeModalOpen,
}: Props) {
  const [blockTypeList, setBlockTypeList] = useState<TBlockType[]>([]);

  useEffect(() => {
    const getTypes = async () => {
      let response = await getBlockTypes();
      setBlockTypeList(response.data);
    };
    getTypes();
  }, []);

  const handleAddBlock = async (blockTypeId: number) => {
    const newBlock: TBLock = {
      content: blockTypeId === 3 ? null : '',
      image: blockTypeId === 3 ? '' : null,
      language: 'js',
      sortOrder: highestSortOrder + 1,
      sectionId: sectionId,
      blockTypeId: blockTypeId,
    };

    await addBlock(newBlock, sectionId);
    const response = await getSectionBlocks(sectionId);
    setBlockList(response.payload);
    setIsBlockTypeModalOpen(false);
  };

  return (
    <div className='absolute w-1/5 bg-white shadow-lg drop-shadow-md rounded-lg p-1 space-y-1'>
      <div className='px-2 pt-2 text-sm text-[#B4B4B3]'>Blocks</div>

      {blockTypeList.map((blockType) => (
        <div
          onClick={() => handleAddBlock(blockType.id)}
          key={blockType.id}
          className='py-1 px-2 flex items-center space-x-3 hover:bg-[#EBEBEA] rounded cursor-pointer'
        >
          <div className='w-12 h-12 object-cover rounded-md overflow-hidden border-[1px] border-[#EBEBEA]'>
            <Image
              src={`/assets/${blockType.name.toLowerCase()}-block.png`}
              alt='block image'
              height={46}
              width={46}
            />
          </div>
          <div>
            <div className='text-sm'>{blockType.name}</div>
            <div className='text-xs text-[#B4B4B3]'>
              {blockType.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
