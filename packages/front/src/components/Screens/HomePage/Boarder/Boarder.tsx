import { useActionsCreators, useStateSelector } from '@/src/hooks';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { ColumnSubject } from '@/src/share/types';

import style from './boarder.module.scss';
import { ColumnSubjectsType } from './ColumnSubjectsType/ColumnSubjectsType';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCenter } from '@dnd-kit/core';
import { useLayoutEffect, useState } from 'react';
import { CardSubject } from './ColumnSubjectsType/Card';
import { allActionsBoard } from '@/src/store/boards';
import { ColorsCardType } from './ColumnSubjectsType/Card/Card.interface';

export const Boarder = () => {
  const { subjects, typeSubjects } = useStateSelector((state) => state.board);
  const [subjectsMap, setSubjectsMap] = useState<null | Record<string, ColumnSubject>>(null);
  const actionsBoard = useActionsCreators(allActionsBoard);

  useLayoutEffect(() => {
    if (!Array.isArray(subjects)) {
      return setSubjectsMap(null);
    }
    setSubjectsMap(
      subjects.reduce(
        (accumulator, currentValue) => {
          accumulator[currentValue.id] = currentValue;
          return accumulator;
        },
        {} as Record<string, ColumnSubject>,
      ),
    );
  }, [subjects]);

  const [active, setActive] = useState<({ card: ColumnSubject } & { colors: Partial<ColorsCardType> }) | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const itemCard = subjectsMap[active.id];
    const [x, y, subTypeId] = (over.id as string).split('_');

    if (itemCard && itemCard.x === Number(x) && itemCard.disciplineId === subTypeId && itemCard.y === Number(y)) return;
    const newIdSubType = itemCard.disciplineId === subTypeId ? undefined : subTypeId;
    actionsBoard.moveAsync({
      id: itemCard.id,
      data: { x: Number(x), y: Number(y), disciplineId: newIdSubType },
    });

    actionsBoard.moveSync({ subject: { ...itemCard, x: Number(x), y: Number(y) }, newSubjectTypeId: newIdSubType });
    actionsBoard.updateResultRow();
  };

  const handleDragStart = (event: DragStartEvent) => {
    const activeCard = subjectsMap?.[event.active.id];
    if (activeCard) {
      setActive(() => ({ card: activeCard, colors: event.active.data.current as Partial<ColorsCardType> }));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className={style.board}>
        <LeftSidebar />
        {typeSubjects.map((item) => (
          <ColumnSubjectsType {...item} key={item.id} />
        ))}
        <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
          {active?.card ? <CardSubject subject={active.card} colors={active.colors} /> : null}
        </DragOverlay>
        <RightSidebar />
      </div>
    </DndContext>
  );
};
