import type { ColumnSubject } from '@/src/share/types';
import { Card, Tooltip } from 'antd';
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
    id: `card_${subject.id}`,
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
      <Tooltip title="Сумма часов" mouseEnterDelay={0.3}>
        <div className={style.totalCountHours}>{subject.totalCountHours}</div>
      </Tooltip>
      <Tooltip title="Академ. часов лекций" mouseEnterDelay={0.3}>
        <div className={style.countLectures}>{subject.countLectures}</div>
      </Tooltip>
      <Tooltip title="Академ. часов семинаров" mouseEnterDelay={0.3}>
        <div className={style.countSeminars}>{subject.countSeminars}</div>
      </Tooltip>
      <Tooltip title="Академ. часов лабораторных работ" mouseEnterDelay={0.3}>
        <div className={style.countLaboratory}>{subject.countLaboratory}</div>
      </Tooltip>
      <Tooltip title="Количество лабораторных работ" mouseEnterDelay={0.3}>
        <div className={style.hoursLaboratory}>{subject.hoursLaboratory}</div>
      </Tooltip>
      <Tooltip title="Академ. часов самостоятельной работы" mouseEnterDelay={0.3}>
        <div className={style.countSelfWork}>{subject.countSelfWork}</div>
      </Tooltip>
      <Tooltip title="Академ. часов на контроные мероприятия" mouseEnterDelay={0.3}>
        <div className={style.countText}>{subject.countText}</div>
      </Tooltip>
      <Tooltip title="Академ. часов на аттестацию" mouseEnterDelay={0.3}>
        <div className={style.countExam}>{subject.countExam}</div>
      </Tooltip>
      <Tooltip title="Сумма часов в аудитории" mouseEnterDelay={0.3}>
        <div className={style.classroomCountHours}>{subject.classroomCountHours}</div>
      </Tooltip>
      <Tooltip title="Сумма часов самостоятельной работы" mouseEnterDelay={0.3}>
        <div className={style.homeCountHours}>{subject.homeCountHours}</div>
      </Tooltip>
      <div className={style.rating}>{subject.rating}</div>
    </Card>
  );
};
