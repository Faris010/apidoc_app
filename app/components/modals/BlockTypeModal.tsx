import Image from 'next/image';

export default function BlockTypeModal() {
  return (
    <div className='absolute w-1/5 bg-white shadow-lg drop-shadow-md rounded-lg p-1 space-y-1'>
      <div className='px-2 pt-2 text-sm text-[#B4B4B3]'>Blocks</div>

      <div className='py-1 px-2 flex items-center space-x-3 hover:bg-[#EBEBEA] rounded cursor-pointer'>
        <div className='w-12 h-12 object-cover rounded-md overflow-hidden border-[1px] border-[#EBEBEA]'>
          <Image
            src='/assets/paragraph-block.png'
            alt='block image'
            height={46}
            width={46}
          />
        </div>
        <div>
          <div className='text-sm'>Paragraph</div>
          <div className='text-xs text-[#B4B4B3]'>Start with plain text</div>
        </div>
      </div>

      <div className='py-1 px-2 flex items-center space-x-3 hover:bg-[#EBEBEA] rounded cursor-pointer'>
        <div className='w-12 h-12 object-cover rounded-md overflow-hidden border-[1px] border-[#EBEBEA]'>
          <Image
            src='/assets/image-block.png'
            alt='block image'
            height={46}
            width={46}
          />
        </div>
        <div>
          <div className='text-sm'>Image</div>
          <div className='text-xs text-[#B4B4B3]'>
            Upload or embed with a link
          </div>
        </div>
      </div>

      <div className='py-1 px-2 flex items-center space-x-3 hover:bg-[#EBEBEA] rounded cursor-pointer'>
        <div className='w-12 h-12 object-cover rounded-md overflow-hidden border-[1px] border-[#EBEBEA]'>
          <Image
            src='/assets/code-block.png'
            alt='block image'
            height={46}
            width={46}
          />
        </div>
        <div>
          <div className='text-sm'>Code-Block</div>
          <div className='text-xs text-[#B4B4B3]'>Capture a code snippet</div>
        </div>
      </div>
    </div>
  );
}
