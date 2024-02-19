// Component: https://www.hyperui.dev/components/application-ui/side-menu
'use client';

import { FC } from 'react';
import { signOut } from 'next-auth/react';
import NavbarMenuItem from '@/app/ui/navbar-menu-item';
import { Session } from '@/app/lib/types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faClock,
  faUserGroup,
  faCalendarDays,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

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
              <Link
                href='/dashboard'
                className='t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700'
              >
                <FontAwesomeIcon icon={faHouse} size='lg' />

                <span className='invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                  Dashboard
                </span>
              </Link>
            </div>

            {/* Navbar menu links */}
            <ul className='space-y-1 border-t border-gray-100 pt-4'>
              <NavbarMenuItem
                title={'Shifts'}
                icon={faClock}
                link={'/dashboard/edit-shifts'}
              />
              <NavbarMenuItem
                title={'Employees'}
                icon={faUserGroup}
                link={'/dashboard/edit-employees'}
              />
              <NavbarMenuItem
                title={'Assignments'}
                icon={faCalendarDays}
                link={'/dashboard/edit-assignments'}
              />
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
          <FontAwesomeIcon icon={faRightFromBracket} size='lg' />

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
