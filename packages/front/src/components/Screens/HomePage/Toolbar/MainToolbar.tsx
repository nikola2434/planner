import { Toolbar } from '@/ui/Toolbar';
import { Button, Dropdown } from 'antd';
import { MenuItemsCreate } from './menu-create.data';
import { EllipsisVertical, Plus } from 'lucide-react';
import { useToolbar } from './useToolbar';
import { MenuItemsSettings } from './menu-settings.data';
import style from './Toolbar.module.scss';

export const MainToolbar = () => {
  const { onClickHandleCreateBtn, onClickHandleSettingsBtn } = useToolbar();

  return (
    <Toolbar className={style.main_toolbar}>
      <Dropdown menu={{ items: MenuItemsCreate, onClick: onClickHandleCreateBtn }} placement="bottomLeft">
        <Button icon={<Plus />}>Создать</Button>
      </Dropdown>
      <Dropdown placement="bottomLeft" menu={{ items: MenuItemsSettings, onClick: onClickHandleSettingsBtn }}>
        <Button type="text" icon={<EllipsisVertical />} />
      </Dropdown>
    </Toolbar>
  );
};
