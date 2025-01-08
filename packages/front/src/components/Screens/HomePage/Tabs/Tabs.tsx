import { Tabs } from 'antd';
import { useTabs } from './useTabs';
import { Boarder } from '../Boarder';
import { ModalEditTab } from './ModalEditTab';
import style from './Tabs.module.scss';

const { TabPane } = Tabs;
export const Tab = () => {
  const { handleTabChange, isLoading, activeTab, tabs, onEdit } = useTabs();
  return (
    <>
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        type="editable-card"
        onEdit={onEdit}
        size="large"
        className={style.tabs_custom}
      >
        {tabs.map((tab) => (
          <TabPane tab={tab.name} key={tab.id} tabKey={tab.id} closable={false} />
        ))}
      </Tabs>

      {activeTab && <Boarder id={activeTab} />}
      <ModalEditTab />
    </>
  );
};
