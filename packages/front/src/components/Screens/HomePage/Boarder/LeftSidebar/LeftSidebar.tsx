import { COUNT_SEMESTER } from '@/src/share/constants.share';
import style from './LeftSidebar.module.scss';

const countRows = COUNT_SEMESTER || 12;

export const LeftSidebar = () => {
  const arr = Array(countRows).fill(0);
  return (
    <div className={style.left}>
      {arr.map((item, ind) => (
        <div key={ind}>{ind + 1}</div>
      ))}
    </div>
  );
};
