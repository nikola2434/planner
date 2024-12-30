import { ResultRowType } from '@/src/share/types';
import { FC, Fragment } from 'react';
import style from './RightSidebar.module.scss';

export const RightSidebarResult: FC<{ items: [ResultRowType | undefined, ResultRowType | undefined] }> = ({
  items,
}) => {
  return (
    <div className={style.container}>
      {items.map((item, ind) => (
        <Fragment key={ind}>
          <div className={style[`value_1_${ind}`]}>{item?.value1 || 0}</div>
          <div className={style[`value_2_${ind}`]}>{item?.value2 || 0}</div>
        </Fragment>
      ))}
      <div className={style.value_3}>{items.reduce((acc, item) => acc + (item?.value2 || 0), 0)}</div>
    </div>
  );
};
