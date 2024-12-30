import { FC } from 'react';
import { CardSubject } from './Card';
import type { ColumnSubject, ColumnSubjectType } from '@/src/share/types';
import { COUNT_SEMESTER } from '@/src/share/constants.share';
import style from './ColumnSubjectType.module.scss';
import { Empty } from './Empty';
import { fillArray } from '@/src/utils/fillArray';

const countRows = COUNT_SEMESTER || 12;
const arrRows = Array(countRows).fill(0);

export const ColumnSubjectsType: FC<ColumnSubjectType> = (props) => {
  return (
    <div className={style.column}>
      <div className={style.header}>{props.name}</div>
      <div className={style.rows}>
        {arrRows.map((_, ind) => {
          let row: ColumnSubject[] | undefined = props.mapSemester[ind];
          if (row) {
            row = fillArray(row, props.maxX, null);
          } else {
            row = Array(props.maxX).fill(null);
          }
          return (
            <div className={style.row} key={ind}>
              {row.map((item, indX) => (
                <Empty key={indX} id={`${indX}_${ind}_${props.id}`}>
                  {item && <CardSubject subject={item} key={item.id} />}
                </Empty>
              ))}
              <Empty isLast key={row.length} id={`${row.length}_${ind}_${props.id}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
