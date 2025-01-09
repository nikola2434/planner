import { useActionsCreators, useStateSelector } from '@/src/hooks';
import type { ColumnSubject, ColumnSubjectType } from '@/src/share/types';
import { allActionsBoard } from '@/src/store/boards';
import { useEffect, useLayoutEffect, useState } from 'react';
import type { ColorsCardType } from './ColumnSubjectsType/Card/Card.interface';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

export const useBoarder = (id: string) => {
  const { subjects, typeSubjects, isLoading } = useStateSelector((state) => state.board);
  const [subjectsMap, setSubjectsMap] = useState<null | Record<string, ColumnSubject>>(null);
  const actionsBoard = useActionsCreators(allActionsBoard);

  useEffect(() => {
    actionsBoard.getTab(id).then(() => {
      actionsBoard.updateResultRow();
    });
  }, [id]);

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
  const [disabledDroppable, setDisabledDroppable] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActive(null);
    setDisabledDroppable(false);

    const [type, id] = (active.id as string).split('_');
    const itemCard = subjectsMap[id];
    const [typeOver, x, y, subTypeId] = (over.id as string).split('_');

    if (type === 'card' && typeOver === 'card') {
      if (itemCard && itemCard.x === Number(x) && itemCard.disciplineId === subTypeId && itemCard.y === Number(y))
        return;
      const newIdSubType = itemCard.disciplineId === subTypeId ? undefined : subTypeId;
      actionsBoard.moveAsync({
        id: itemCard.id,
        data: { x: Number(x), y: Number(y), disciplineId: newIdSubType },
      });

      actionsBoard.moveSync({ subject: { ...itemCard, x: Number(x), y: Number(y) }, newSubjectTypeId: newIdSubType });
      actionsBoard.updateResultRow();
    } else {
      if (active.id === over.id) return;

      const oldOrder = (active.data.current as ColumnSubjectType).order;
      const newOrder = (over.data.current as ColumnSubjectType).order;

      if (oldOrder === newOrder) return;

      actionsBoard.patchSubjectType({ id: String(active.id), data: { order: newOrder } });
      actionsBoard.changeOrderColumn({ typeSubjectId: String(active.id), newOrder });
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const [type, id] = (event.active.id as string).split('_');
    if (type !== 'card') {
      setDisabledDroppable(true);
    } else {
      setDisabledDroppable(false);
      const activeCard = subjectsMap?.[id];
      if (activeCard) {
        setActive(() => ({ card: activeCard, colors: event.active.data.current as Partial<ColorsCardType> }));
      }
    }
  };

  return { typeSubjects, handleDragEnd, handleDragStart, active, disabledDroppable };
};
