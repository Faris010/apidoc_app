import { TBLock } from '@/types/types';
import ImageBlockViewer from './block_viewer/ImageBlockViewer';
import ImageBlockEditor from './block_editor/ImageBlockEditor';

interface Props {
  blockImage: string | null;
  blockId: string;
  blockList: TBLock[];
  setBlockList: React.Dispatch<React.SetStateAction<TBLock[]>>;
  isViewer: boolean;
}

const ImageBlock = ({
  blockImage,
  blockId,
  blockList,
  setBlockList,
  isViewer,
}: Props) => {
  return (
    <>
      {isViewer ? (
        <ImageBlockViewer blockImage={blockImage} />
      ) : (
        <ImageBlockEditor
          blockImage={blockImage || null}
          blockId={blockId}
          blockList={blockList}
          setBlockList={setBlockList}
        />
      )}
    </>
  );
};

export default ImageBlock;
