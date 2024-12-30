import { FC, PropsWithChildren } from 'react';
import style from './Content.module.scss';

export const Content: FC<PropsWithChildren> = ({ children }) => {
  return <div className={style.content}>{children}</div>;
};
