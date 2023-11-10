import Image from 'next/image';

const ImageBlock = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Image
        src='/assets/image-block.png'
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
