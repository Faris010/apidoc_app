import AddImageBlockModal from '@/components/modals/block_modals/AddImageBlockModal';
import CodeBlock from '../CodeBlock';
import ImageBlock from '../ImageBlock';
import ParagraphBlock from '../ParagraphBlock';
import { TBLock } from '@/types/types';

interface Props {
  block: TBLock;
  blockList: TBLock[];
  setBlockList: React.Dispatch<React.SetStateAction<TBLock[]>>;
  isViewer: boolean;
}

const RenderBlockComponent = ({
  block,
  blockList,
  setBlockList,
  isViewer,
}: Props) => {
  const { id, image, blockTypeId } = block;
  return (
    <>
      {blockTypeId === 1 && (
        <ParagraphBlock
          block={block}
          blockList={blockList}
          setBlockList={setBlockList}
          isViewer={isViewer}
        />
      )}
      {blockTypeId === 2 && (
        <CodeBlock
          block={block}
          blockList={blockList}
          setBlockList={setBlockList}
          isViewer={isViewer}
        />
      )}
      {blockTypeId === 3 && (
        <>
          {image !== '' ? (
            <ImageBlock
              blockImage={image || null}
              blockId={id || ''}
              blockList={blockList}
              setBlockList={setBlockList}
              isViewer={isViewer}
            />
          ) : (
            <AddImageBlockModal
              block={block}
              blockList={blockList}
              setBlockList={setBlockList}
            />
          )}
        </>
      )}
    </>
  );
};

export default RenderBlockComponent;
