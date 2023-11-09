'use client';

import { login } from '@/services/auth';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, { setStatus }) => {
      try {
        const response = await login(values);
        localStorage.setItem('accessToken', response.data);
        router.push('/');
      } catch (error: any) {
        if (error.response?.status == 400) {
          setStatus('Incorrect credentials');
        } else {
          setStatus('Something went wrong');
        }
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='max-sm:w-full max-lg:w-2/3 w-1/3 h-screen py-10 px-14 flex flex-col items-center justify-center bg-white rounded-lg space-y-10'
    >
      <h1 className='text-3xl font-bold text-center uppercase'>Login</h1>
      <div className='w-full space-y-1'>
        <label htmlFor='username' className='text-sm px-1'>
          Username
        </label>
        <div
          className={`flex px-3 py-2 items-center space-x-2 rounded-md border-[1px] ${
            formik.status ? 'border-red-600' : 'border-[#B4B4B3]'
          }`}
        >
          <Image src='/assets/user.png' alt='user' height={16} width={16} />
          <input
            required
            id='username'
            type='text'
            placeholder='Username'
            value={formik.values.username}
            onChange={formik.handleChange}
            className='w-full outline-none'
          />
        </div>
      </div>
      <div className='w-full space-y-1'>
        <label htmlFor='password' className='text-sm px-1'>
          Password
        </label>
        <div
          className={`flex px-3 py-2 items-center space-x-2 rounded-md border-[1px] ${
            formik.status ? 'border-red-600' : 'border-[#B4B4B3]'
          }`}
        >
          <Image
            src='/assets/padlock.png'
            alt='padlock'
            height={16}
            width={16}
          />
          <input
            required
            id='password'
            type='password'
            placeholder='Password'
            value={formik.values.password}
            onChange={formik.handleChange}
            className='w-full outline-none'
          />
        </div>
        <div className='w-full'>
          {formik.status && (
            <p className='text-red-600 text-sm'>{formik.status}</p>
          )}
        </div>
      </div>
      <button
        type='submit'
        className='w-full py-2 flex items-center justify-center bg-gray-900 rounded-md text-white font-semibold uppercase transition hover:bg-gray-800'
      >
        Login
      </button>
    </form>
  );
}
