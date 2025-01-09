import { ResultRowType } from '@/src/share/types';
import { FC, Fragment } from 'react';
import style from './RightSidebar.module.scss';
import { Tooltip } from 'antd';

export const RightSidebarResult: FC<{ items: [ResultRowType | undefined, ResultRowType | undefined] }> = ({
  items,
}) => {
  return (
    <div className={style.container}>
      <div className={style.empty_1}></div>
      <div className={style.empty_2}></div>
      {items.map((item, ind) => (
        <Fragment key={ind}>
          <Tooltip title="Академ. часов за неделю в семестре" mouseEnterDelay={0.3}>
            <div className={style[`value_1_${ind}`]}>{item?.value1 || 0}</div>
          </Tooltip>
          <Tooltip title="Зачетных единиц в семестре" mouseEnterDelay={0.3}>
            <div className={style[`value_2_${ind}`]}>{item?.value2 || 0}</div>
          </Tooltip>
        </Fragment>
      ))}
      <Tooltip title="Зачетных единиц в год" mouseEnterDelay={0.3}>
        <div className={style.value_3}>{items.reduce((acc, item) => acc + (item?.value2 || 0), 0)}</div>
      </Tooltip>
    </div>
  );
};
