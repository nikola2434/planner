import { FC } from 'react';
import style from './HeaderColumn.module.scss';
import { Button, Dropdown, MenuProps, Modal } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { menuItems } from './menuItems';
import { useActionsCreators } from '@/src/hooks';
import { subjectTypeActions } from '@/src/store/subjectType';
import type { SubjectTypeInterface } from '@/src/share/types';
import { allActionsBoard } from '@/src/store/boards';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

interface HeaderColumnProps {
  backColor?: string;
  color?: string;
  title: string;
  values: SubjectTypeInterface;
  listeners?: SyntheticListenerMap;
}

const { confirm } = Modal;

export const HeaderColumn: FC<HeaderColumnProps> = ({ title, backColor, color, values, listeners }) => {
  const actionsTypeSubject = useActionsCreators(subjectTypeActions);
  const actionsBoards = useActionsCreators(allActionsBoard);

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'change': {
        actionsTypeSubject.edit(values);
        break;
      }

      case 'delete': {
        confirm({
          title: 'Удаление',
          centered: true,
          content: 'Данный вид дисциблин будет безвозвратно удалён. Продолжить?',
          okText: 'Да',
          cancelText: 'Нет',
          onOk() {
            actionsBoards.deleteSubjectType(values.id);
          },
        });
        break;
      }

      default:
        break;
    }
  };
  return (
    <div
      className={style.header}
      style={{
        backgroundColor: backColor,
        color: color,
      }}
    >
      <div className={style.container}>
        <span {...listeners}>{title}</span>
        <Dropdown placement="bottomLeft" menu={{ items: menuItems, onClick: handleMenuClick }}>
          <Button type="text" icon={<EllipsisVertical style={{ color }} />} />
        </Dropdown>
      </div>
    </div>
  );
};
