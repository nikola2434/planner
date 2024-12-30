import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PUBLIC_PAGE } from '@/src/config/public-page.config';
import Logo from '@/public/iu10.webp';

import style from './HeaderSidebar.module.scss';
import { FC } from 'react';

export const HeaderSidebar: FC<{ toggle: () => void }> = ({ toggle }) => {
  return (
    <div className={style.header} onClick={toggle}>
      <button>
        <Menu />
      </button>
      <Link to={PUBLIC_PAGE.HOME} className={style.logo}>
        {/* <img alt="ИУ-10" loading="lazy" draggable={false} src={Logo} /> */}
        <span>Рассписание</span>
      </Link>
    </div>
  );
};
