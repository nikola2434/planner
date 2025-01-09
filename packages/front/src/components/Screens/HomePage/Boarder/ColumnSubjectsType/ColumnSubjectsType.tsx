import type { CSSProperties, FC } from 'react';
import { CardSubject } from './Card';
import type { ColumnSubject, ColumnSubjectType } from '@/src/share/types';
import { COUNT_SEMESTER } from '@/src/share/constants.share';
import style from './ColumnSubjectType.module.scss';
import { Empty } from './Empty';
import { fillArray } from '@/src/utils/fillArray';
import Color from 'color';
import { HeaderColumn } from './HeaderColumn';
import { useSortable } from '@dnd-kit/sortable';

const countRows = COUNT_SEMESTER || 12;
const arrRows = Array(countRows).fill(0);

export const ColumnSubjectsType: FC<{ item: ColumnSubjectType; disabled: boolean }> = ({ item: props, disabled }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.id,
    data: { ...props },
  });

  const color: Color | null = props.color ? Color(props.color) : null;
  const backColorColumn = color ? Color(color).alpha(0.1).rgb().string() : null;
  const colorText = color ? (color.isDark() ? Color(color).lighten(0.8).hex() : Color(color).darken(0.8).hex()) : null;
  const backOver = color ? Color(color).alpha(0.2).rgb().string() : null;

  const styleTransform: CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0) scaleY(${transform.scaleY})` : '',
    transition,
  };

  return (
    <div className={style.column} style={styleTransform} ref={setNodeRef} {...attributes}>
      <HeaderColumn title={props.name} backColor={color.hex()} color={colorText} values={props} listeners={listeners} />
      <div className={style.rows} style={{ backgroundColor: backColorColumn }}>
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
                <Empty key={indX} id={`card_${indX}_${ind}_${props.id}`} colorOver={backOver} disabled={disabled}>
                  {item && (
                    <CardSubject
                      subject={item}
                      key={item.id}
                      colors={{ colorBackHead: color.hex(), colorTitle: colorText }}
                    />
                  )}
                </Empty>
              ))}
              <Empty
                isLast
                key={row.length}
                id={`card_${row.length}_${ind}_${props.id}`}
                colorOver={backOver}
                disabled={disabled}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
