'use client';

import Image from 'next/image';
import { useState } from 'react';

type TUserLoginData = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const [userLoginData, setUserLoginData] = useState<TUserLoginData>({
    username: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLoginData({ ...userLoginData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //TODO: Make auth API call
    //reset state data
    //redirect to home page if true
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className='w-1/3 py-10 px-14 flex flex-col items-center justify-center bg-white rounded-lg space-y-10 shadow-lg'
    >
      <h1 className='text-3xl font-bold text-center'>Login</h1>
      <div className='w-full'>
        <label htmlFor='username' className='text-sm px-1'>
          Username
        </label>
        <div className='flex p-2 items-center space-x-2 border-b-2 border-[#B4B4B3]'>
          <Image src='/assets/user.png' alt='user' height={16} width={16} />
          <input
            id='username'
            name='username'
            type='text'
            placeholder='Username'
            className='w-full outline-none'
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className='w-full'>
        <label htmlFor='password' className='text-sm px-1'>
          Password
        </label>
        <div className='flex p-2 items-center space-x-2 border-b-2 border-[#B4B4B3]'>
          <Image
            src='/assets/padlock.png'
            alt='padlock'
            height={16}
            width={16}
          />
          <input
            id='password'
            name='password'
            type='password'
            placeholder='Password'
            className='w-full outline-none'
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button className='w-full py-2 flex items-center justify-center bg-blue-600 rounded-md text-white uppercase hover:bg-blue-700'>
        Login
      </button>
    </form>
  );
}
