import { FC } from 'react';
import { Link, useLocation, useMatch } from 'react-router-dom';
import type { ISidebarItem } from '../../sidebar.types';
import cn from 'clsx';

import style from './MenuItem.module.scss';

export const MenuItem: FC<{ props: ISidebarItem }> = ({ props }) => {
  const location = useLocation();
  const isActive = location.pathname === props.link || location.pathname.startsWith(props.link);
  return (
    <li>
      <Link to={props.link} className={cn(style.link, { [style.active]: isActive })}>
        <span className={style.icon}>
          <props.icon />
        </span>
        <span>{props.label}</span>
      </Link>
    </li>
  );
};
