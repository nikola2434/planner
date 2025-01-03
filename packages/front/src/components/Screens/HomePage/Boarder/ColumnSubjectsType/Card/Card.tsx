import type { ColumnSubject } from '@/src/share/types';
import { Card } from 'antd';
import { FC } from 'react';
import style from './Card.module.scss';
import { useDraggable } from '@dnd-kit/core';
import clsx from 'clsx';
import { ColorsCardType } from './Card.interface';
import { CardTitle } from './CardTitle';

interface CardSubjectProps {
  subject: ColumnSubject;
  colors?: Partial<ColorsCardType>;
}

export const CardSubject: FC<CardSubjectProps> = ({ colors = {}, subject }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: subject.id,
    data: { ...colors },
  });

  return (
    <Card
      size="small"
      title={
        <CardTitle
          listeners={listeners}
          subject={subject}
          colorBack={colors.colorBackHead}
          colorTitle={colors.colorTitle}
        />
      }
      style={{ width: 300, height: 130 }}
      className={clsx(style.card, isDragging && style.isDragging)}
      ref={setNodeRef}
      {...attributes}
    >
      <div className={style.totalCountHours}>{subject.totalCountHours}</div>
      <div className={style.countLectures}>{subject.countLectures}</div>
      <div className={style.countSeminars}>{subject.countSeminars}</div>
      <div className={style.countLaboratory}>{subject.countLaboratory}</div>
      <div className={style.hoursLaboratory}>{subject.hoursLaboratory}</div>
      <div className={style.countSelfWork}>{subject.countSelfWork}</div>
      <div className={style.countText}>{subject.countText}</div>
      <div className={style.countExam}>{subject.countExam}</div>
      <div className={style.classroomCountHours}>{subject.classroomCountHours}</div>
      <div className={style.homeCountHours}>{subject.homeCountHours}</div>
      <div className={style.rating}>{subject.rating}</div>
    </Card>
  );
};
