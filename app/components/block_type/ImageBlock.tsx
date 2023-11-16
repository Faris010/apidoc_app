import { TBLock } from '@/types/types';
import deleteBlock from '@/utils/HandleDeleteBlock';
import Image from 'next/image';

interface Props {
  blockImage: string | null;
  blockId: string;
  blockList: TBLock[];
  setBlockList: React.Dispatch<React.SetStateAction<TBLock[]>>;
}

const ImageBlock = ({
  blockImage,
  blockId,
  blockList,
  setBlockList,
}: Props) => {
  const handleDeleteBlock = () => {
    if (blockId) {
      deleteBlock(blockId);
      const updatedBlockList = blockList.filter((b) => b.id !== blockId);
      setBlockList(updatedBlockList);
    }
  };
  return (
    <div className='relative w-full h-full group'>
      <Image
        src={blockImage || ''}
        alt='image block'
        width={0}
        height={0}
        sizes='100vw'
        style={{ width: 'auto', height: '100%' }}
      />
      <div
        onClick={handleDeleteBlock}
        className='absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 bg-black bg-opacity-75 rounded'
      >
        <Image
          src='/assets/delete-white.png'
          alt='icon'
          width={16}
          height={16}
          style={{ width: 'auto', height: 'auto' }}
          className='cursor-pointer'
        />
      </div>
    </div>
  );
};

export default ImageBlock;
