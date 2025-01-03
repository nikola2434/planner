import type { MenuProps } from 'antd';
import { Pen, Trash2 } from 'lucide-react';

export const menuItems: MenuProps['items'] = [
  {
    label: 'Изменить',
    key: 'change',
    icon: <Pen size={20} />,
  },
  {
    label: 'Удалить',
    key: 'delete',
    icon: <Trash2 size={20} />,
    danger: true,
  },
];
