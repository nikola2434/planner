import { PUBLIC_PAGE } from '@/src/config/public-page.config';
import { useActionsCreators } from '@/src/hooks';
import { subjectActions } from '@/src/store/subject';
import { subjectTypeActions } from '@/src/store/subjectType';
import { allActionsTabs } from '@/src/store/tabs';
import { MenuProps, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const { confirm } = Modal;

export const useToolbar = () => {
  const actionsTypeSubject = useActionsCreators(subjectTypeActions);
  const actionsSubject = useActionsCreators(subjectActions);
  const actionsTabs = useActionsCreators(allActionsTabs);

  const navigate = useNavigate();

  const { tabId } = useParams<{ tabId?: string }>();

  const onClickHandleCreateBtn: MenuProps['onClick'] = function ({ key }) {
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

  const onClickHandleSettingsBtn: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'change': {
        actionsTabs.showEditWindow(tabId);
        break;
      }

      case 'delete': {
        confirm({
          title: 'Удаление',
          centered: true,
          content: 'Данная вкладка будет безвозвратно удалена. Продолжить?',
          okText: 'Да',
          cancelText: 'Нет',
          onOk: async () => {
            navigate(PUBLIC_PAGE.HOME);
            await actionsTabs.deleteTab(tabId);
          },
        });
        break;
      }

      default:
        break;
    }
  };

  return { onClickHandleCreateBtn, onClickHandleSettingsBtn };
};
