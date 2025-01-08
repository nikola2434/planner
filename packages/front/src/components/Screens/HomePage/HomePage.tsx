import { DriverDisciplineType } from './FormDisciplineType';
import { DriverDiscipline } from './FormSubject';

import style from './HomePage.module.scss';
import { Tab } from './Tabs';

export const HomePage = () => {
  return (
    <div className={style.homepage}>
      <Tab />

      <DriverDisciplineType />
      <DriverDiscipline />
    </div>
  );
};
