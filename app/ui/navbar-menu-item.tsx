import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

type Props = {
  title: string;
  icon: IconDefinition;
  link: string;
};

const NavbarMenuItem: FC<Props> = ({ title, icon, link }) => {
  return (
    <li className='p-2'>
      <Link
        href={link}
        className='group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700'
      >
        <FontAwesomeIcon
          icon={icon}
          size='lg'
          className='group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700'
        />

        <span className='invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
          {title}
        </span>
      </Link>
    </li>
  );
};

export default NavbarMenuItem;
