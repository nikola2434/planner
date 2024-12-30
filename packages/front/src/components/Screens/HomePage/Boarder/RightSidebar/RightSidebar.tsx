import { COUNT_SEMESTER } from '@/src/share/constants.share';
import style from './RightSidebar.module.scss';
import { RightSidebarResult } from './RightSidebarResult';
import { useStateSelector } from '@/src/hooks';
import { ReactNode } from 'react';

const countRows = COUNT_SEMESTER || 12;

export const RightSidebar = () => {
  const arr = Array(countRows).fill(0);
  const result = useStateSelector((state) => state.board.result);

  const items: ReactNode[] = [];
  for (let i = 0; i < arr.length; i += 2) {
    items.push(<RightSidebarResult key={i} items={[result[i], result[i + 1]]} />);
  }

  return <div className={style.right}>{items}</div>;
};
