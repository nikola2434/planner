import { Boarder } from './Boarder';
import { DriverDisciplineType } from './FormDisciplineType';
import { DriverDiscipline } from './FormSubject';
import { MainToolbar } from './Toolbar';

import style from './HomePage.module.scss';
import { useActionsCreators, useAppDispatch } from '@/src/hooks';
import { allActionsBoard } from '@/src/store/boards';
import { useEffect } from 'react';

export const HomePage = () => {
  const actionsBoard = useActionsCreators(allActionsBoard);
  //   const dispatch = useAppDispatch();

  useEffect(() => {
    actionsBoard.getAllSubjects().then(() => actionsBoard.updateResultRow());
  }, [actionsBoard]);
  return (
    <div className={style.homepage}>
      <MainToolbar />

      <Boarder />

      <DriverDisciplineType />
      <DriverDiscipline />
    </div>
  );
};
