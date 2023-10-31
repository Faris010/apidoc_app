import Image from 'next/image';

export default function ErrorNotification() {
  return (
    <div className='fixed bottom-4 right-4 p-4 flex items-center space-x-2 bg-white rounded-lg'>
      <div>
        <Image
          src='/assets/decline.png'
          alt='decline icon'
          height={24}
          width={24}
        />
      </div>
      <p className='text-lg'>Something went wrong</p>
    </div>
  );
}
