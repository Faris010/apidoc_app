'use client';

import { TBLock } from '@/types/types';
import ParagraphBlockEditor from './block_editor/ParagraphBlockEditor';
import ParagraphBlockViewer from './block_viewer/ParagraphBlockViewer';

interface Props {
  block: TBLock;
  blockList: TBLock[];
  setBlockList: React.Dispatch<React.SetStateAction<TBLock[]>>;
  isViewer: boolean;
}

const ParagraphBlock = ({
  block,
  blockList,
  setBlockList,
  isViewer,
}: Props) => {
  return (
    <>
      {isViewer ? (
        <ParagraphBlockViewer blockContent={block.content || null} />
      ) : (
        <ParagraphBlockEditor
          block={block}
          blockList={blockList}
          setBlockList={setBlockList}
        />
      )}
    </>
  );
};

export default ParagraphBlock;
