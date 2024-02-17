import { FC } from 'react';

type Props = { title: string };

const Title: FC<Props> = ({ title }) => {
  return <h1 className='mt-10 text-4xl font-bold mb-10'>{title}</h1>;
};

export default Title;
