import { FC } from 'react';
import type { ISidebarItem } from '../sidebar.types';
import { MenuItem } from './MenuItem';

export const Menus: FC<{ menu: ISidebarItem[] }> = ({ menu }) => {
  return (
    <nav>
      <ul>
        {menu.map((menuItem) => (
          <MenuItem props={menuItem} key={menuItem.link}/>
        ))}
      </ul>
    </nav>
  );
};
