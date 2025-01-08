import { useActionsCreators, useStateSelector } from '@/src/hooks';
import { allActionsTabs } from '@/src/store/tabs';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PUBLIC_PAGE } from '@/src/config/public-page.config';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export const useTabs = () => {
  const { isLoading, tabs, activeTab } = useStateSelector((store) => store.tabs);

  const navigate = useNavigate();

  const { tabId } = useParams<{ tabId?: string }>();

  useEffect(() => {
    if (tabId) actionsTabs.setActiveTab(tabId);
  }, [tabId]);

  useEffect(() => {
    if (!tabId && tabs[0]) {
      navigate(PUBLIC_PAGE.HOME + tabs[0].id);
    }
  }, [tabs]);

  const actionsTabs = useActionsCreators(allActionsTabs);
  useEffect(() => {
    actionsTabs.loadTabs();
  }, []);

  const handleTabChange = (id: string) => {
    navigate(PUBLIC_PAGE.HOME + id);
  };

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'add') {
      actionsTabs.showCreateWindow();
    }
  };

  return { isLoading, tabs, handleTabChange, onEdit, activeTab };
};
