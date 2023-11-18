import Image from 'next/image';

interface Props {
  blockImage: string | null;
}

const ImageBlockViewer = ({ blockImage }: Props) => {
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
    </div>
  );
};

export default ImageBlockViewer;
