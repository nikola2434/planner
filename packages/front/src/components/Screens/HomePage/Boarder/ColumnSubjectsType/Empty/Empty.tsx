import { FC, PropsWithChildren } from 'react';

import style from './Empty.module.scss';
import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';

export const Empty: FC<PropsWithChildren<{ id: string; isLast?: boolean }>> = ({ children, id, isLast = false }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <>
      {isLast ? (
        <div className={clsx(style.container, isOver && style.container_over)}>
          <div className={clsx(style.empty, isOver && style.over)} ref={setNodeRef}>
            {children}
          </div>
        </div>
      ) : (
        <div className={clsx(style.empty, isOver && style.over)} ref={setNodeRef}>
          {children}
        </div>
      )}
    </>
  );
};
