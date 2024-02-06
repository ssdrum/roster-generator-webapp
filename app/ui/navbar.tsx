// Component: https://www.hyperui.dev/components/application-ui/side-menu
'use client';

import { FC } from 'react';
import { signOut } from 'next-auth/react';
import NavbarMenuItem from '@/app/ui/navbar-menu-item';
import { Session } from '@/app/lib/types';
import Link from 'next/link';

type Props = { session: Session };

const Navbar: FC<Props> = ({ session }) => {
  const { image, name } = session;

  return (
    <div className='flex h-screen w-16 flex-col justify-between border-e bg-white'>
      <div>
        <div className='inline-flex h-16 w-16 items-center justify-center'>
          <Link href={'/dashboard'}>
            <span className='grid h-10 w-10 place-content-center rounded-lg bg-gray-100'>
              {/* User google image */}
              <img src={image} alt={name} className='rounded-lg' />
            </span>
          </Link>
        </div>

        <div className='border-t border-gray-100'>
          <div className='px-2'>
            <div className='py-4'>
              <a
                href=''
                className='t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 opacity-75'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>

                <span className='invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                  Dashboard
                </span>
              </a>
            </div>

            {/* Navbar menu links */}
            <ul className='space-y-1 border-t border-gray-100 pt-4'>
              <NavbarMenuItem title={'Employees'} />
            </ul>
          </div>
        </div>
      </div>

      {/* Logout button */}
      <div className='sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2'>
        <button
          type='submit'
          className='group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700'
          onClick={() => signOut()}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 opacity-75'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
            />
          </svg>

          <span
            className='invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible'
            onClick={() => signOut()}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
