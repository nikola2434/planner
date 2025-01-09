import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';

import style from './boarder.module.scss';
import { ColumnSubjectsType } from './ColumnSubjectsType/ColumnSubjectsType';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import { CardSubject } from './ColumnSubjectsType/Card';
import { useBoarder } from './useBoarder';
import type { FC } from 'react';
import { MainToolbar } from '../Toolbar';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';

export const Boarder: FC<{ id: string }> = ({ id }) => {
  const { handleDragEnd, handleDragStart, typeSubjects, active, disabledDroppable } = useBoarder(id);
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <MainToolbar />
      <div className={style.board}>
        <LeftSidebar />
        <SortableContext items={typeSubjects} strategy={horizontalListSortingStrategy}>
          {typeSubjects.map((item) => (
            <ColumnSubjectsType item={item} disabled={disabledDroppable} key={item.id} />
          ))}
        </SortableContext>
        {!disabledDroppable && (
          <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
            {active?.card ? <CardSubject subject={active.card} colors={active.colors} /> : null}
          </DragOverlay>
        )}
        <RightSidebar />
      </div>
    </DndContext>
  );
};
