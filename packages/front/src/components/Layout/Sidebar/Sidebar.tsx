import { FC, SetStateAction } from 'react';
import { HeaderSidebar } from './HeaderSidebar';
import { Menus } from './Menus';
import { SIDEBAR_DATA } from './sidebar.data';
import style from './Sidebar.module.scss';
import { PrintVersion } from './PrintVersion';

export const Sidebar: FC<{ toggle: () => void }> = ({ toggle }) => {
  return (
    <aside className={style.sidebar}>
      <HeaderSidebar toggle={toggle} />
      <Menus menu={SIDEBAR_DATA} />
      <PrintVersion />
    </aside>
  );
};
