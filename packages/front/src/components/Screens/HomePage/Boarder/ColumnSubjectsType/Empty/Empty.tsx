import { FC, PropsWithChildren } from 'react';

import type Color from 'color';
import style from './Empty.module.scss';
import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';

interface EmptyProps {
  id: string;
  isLast?: boolean;
  colorOver?: string;
}

export const Empty: FC<PropsWithChildren<EmptyProps>> = ({ children, id, isLast = false, colorOver }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <>
      {isLast ? (
        <div className={clsx(style.container, isOver && style.container_over)}>
          <div
            className={clsx(style.empty, isOver && style.over)}
            ref={setNodeRef}
            style={{
              backgroundColor: isOver ? colorOver : 'transparent',
            }}
          >
            {children}
          </div>
        </div>
      ) : (
        <div
          className={clsx(style.empty, isOver && style.over)}
          ref={setNodeRef}
          style={{
            backgroundColor: isOver ? colorOver : 'transparent',
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};
