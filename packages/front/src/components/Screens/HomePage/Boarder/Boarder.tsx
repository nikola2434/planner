import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';

import style from './boarder.module.scss';
import { ColumnSubjectsType } from './ColumnSubjectsType/ColumnSubjectsType';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import { CardSubject } from './ColumnSubjectsType/Card';
import { useBoarder } from './useBoarder';

export const Boarder = () => {
  const { handleDragEnd, handleDragStart, typeSubjects, active } = useBoarder();
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
