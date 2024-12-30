import { Settings, SquareKanban } from 'lucide-react';
import { ISidebarItem } from './sidebar.types';

import { PUBLIC_PAGE } from '@/src/config/public-page.config';

export const SIDEBAR_DATA: ISidebarItem[] = [
  {
    label: 'Главная',
    icon: SquareKanban,
    link: PUBLIC_PAGE.HOME,
  },
  {
    label: 'Настройки',
    icon: Settings,
    link: PUBLIC_PAGE.SETTINGS,
  },
];
