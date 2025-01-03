import { Button, Dropdown, MenuProps, Modal } from 'antd';
import style from './Card.module.scss';
import { menuItems } from './menuItems';
import { EllipsisVertical } from 'lucide-react';
import { ColumnSubject } from '@/src/share/types';
import { FC } from 'react';
import { useActionsCreators } from '@/src/hooks';
import { subjectActions } from '@/src/store/subject';
import { allActionsBoard } from '@/src/store/boards';

interface CardTitleProps {
  colorTitle?: string;
  colorBack?: string;
  subject: ColumnSubject;
  listeners: Record<string, Function>;
}

const { confirm } = Modal;

export const CardTitle: FC<CardTitleProps> = ({ listeners, subject, colorBack, colorTitle }) => {
  const actionsSubject = useActionsCreators(subjectActions);
  const actionsBoards = useActionsCreators(allActionsBoard);
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'change': {
        actionsSubject.edit(subject);
        break;
      }

      case 'delete': {
        confirm({
          title: 'Удаление',
          centered: true,
          content: 'Данная дисциблина будет безвозвратно удалена. Продолжить?',
          okText: 'Да',
          cancelText: 'Нет',
          onOk() {
            actionsBoards.deleteSubject(subject.id);
          },
        });
        break;
      }

      default:
        break;
    }
  };

  return (
    <div style={{ backgroundColor: colorBack, color: colorTitle }} className={style.title}>
      <span {...listeners}>{subject.name}</span>
      <Dropdown placement="bottomLeft" menu={{ items: menuItems, onClick: handleMenuClick }}>
        <Button type="text" icon={<EllipsisVertical style={{ color: colorTitle }} size={20} />} />
      </Dropdown>
    </div>
  );
};
