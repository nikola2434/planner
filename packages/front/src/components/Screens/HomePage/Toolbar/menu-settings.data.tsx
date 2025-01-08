import { MenuProps } from 'antd';
import { Pen, Trash2 } from 'lucide-react';

export const MenuItemsSettings: MenuProps['items'] = [
  {
    label: 'Изменить вкладку',
    key: 'change',
    icon: <Pen size={20} />,
  },
  {
    label: 'Удалить вкладку',
    key: 'delete',
    icon: <Trash2 size={20} />,
    danger: true,
  },
];
