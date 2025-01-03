import { useActionsCreators, useStateSelector } from '@/src/hooks';
import type { ColumnSubject } from '@/src/share/types';
import { allActionsBoard } from '@/src/store/boards';
import { useLayoutEffect, useState } from 'react';
import type { ColorsCardType } from './ColumnSubjectsType/Card/Card.interface';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

export const useBoarder = () => {
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
    setActive(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const activeCard = subjectsMap?.[event.active.id];
    if (activeCard) {
      setActive(() => ({ card: activeCard, colors: event.active.data.current as Partial<ColorsCardType> }));
    }
  };

  return { typeSubjects, handleDragEnd, handleDragStart, active };
};
