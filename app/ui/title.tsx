import { FC } from 'react';

type Props = { title: string };

const Title: FC<Props> = ({ title }) => {
  return <h1 className='mb-10 mt-10 text-4xl font-bold'>{title}</h1>;
};

export default Title;
