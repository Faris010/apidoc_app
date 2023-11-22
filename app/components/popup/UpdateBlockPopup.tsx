import Image from 'next/image';

export default function UpdateBlockPopup({ text }: { text: string }) {
  return (
    <div className='fixed right-6 bottom-6 z-50 py-4 pl-4 pr-20 flex items-center justify-start bg-[#FBFBFA] space-x-3 drop-shadow-lg rounded'>
      <Image src='/assets/checked.png' alt='Checked' height={20} width={20} />
      <div>{text} updated</div>
    </div>
  );
}
