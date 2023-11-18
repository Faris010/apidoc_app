'use client';

interface Props {
  blockContent: string | null;
}

const ParagraphBlockViewer = ({ blockContent }: Props) => {
  return (
    <div className=' w-full p-1'>
      <p>{blockContent}</p>
    </div>
  );
};

export default ParagraphBlockViewer;
