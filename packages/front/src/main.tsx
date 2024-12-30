import { FC } from 'react';
import './style/index.scss';
import { Layout } from './components/Layout';
import { Routing } from './components/Routes';

export const Main: FC = () => {
  return (
    <Layout>
      <Routing />
    </Layout>
  );
};
