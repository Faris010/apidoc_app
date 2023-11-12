import Image from 'next/image';

interface Props {
  blockImage: string | null;
}

const ImageBlock = ({ blockImage }: Props) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
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

export default ImageBlock;
