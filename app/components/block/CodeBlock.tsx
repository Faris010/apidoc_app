'use client';

import { TBLock } from '@/types/types';
import CodeBlockViewer from './block_viewer/CodeBlockViewer';
import CodeBlockEditor from './block_editor/CodeBlockEditor';

interface Props {
  block: TBLock;
  blockList: TBLock[];
  setBlockList: React.Dispatch<React.SetStateAction<TBLock[]>>;
  isViewer: boolean;
}

const CodeBlock = ({ block, blockList, setBlockList, isViewer }: Props) => {
  return (
    <>
      {isViewer ? (
        <CodeBlockViewer block={block} />
      ) : (
        <CodeBlockEditor
          block={block}
          blockList={blockList}
          setBlockList={setBlockList}
        />
      )}
    </>
  );
};

export default CodeBlock;
