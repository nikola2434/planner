import { Toolbar } from '@/ui/Toolbar';
import { Button, Dropdown, MenuProps } from 'antd';
import { MenuItemsCreate } from './menu-create.data';
import { Plus } from 'lucide-react';
import { useActionsCreators } from '@/src/hooks';
import { subjectTypeActions } from '@/src/store/subjectType';
import { subjectActions } from '@/src/store/subject';

export const MainToolbar = () => {
  const actionsTypeSubject = useActionsCreators(subjectTypeActions);
  const actionsSubject = useActionsCreators(subjectActions);

  const onClickHandle: MenuProps['onClick'] = function ({ key }) {
    switch (key) {
      case 'typeDiscipline': {
        actionsTypeSubject.create();
        break;
      }

      case 'discipline': {
        actionsSubject.create();
        break;
      }

      default:
        break;
    }
  };

  return (
    <Toolbar>
      <Dropdown menu={{ items: MenuItemsCreate, onClick: onClickHandle }} placement="bottomLeft">
        <Button icon={<Plus />}>Создать</Button>
      </Dropdown>
    </Toolbar>
  );
};
