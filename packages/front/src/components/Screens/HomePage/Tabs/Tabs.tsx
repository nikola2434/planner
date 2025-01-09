import { Button, Tabs, Tooltip } from 'antd';
import { useTabs } from './useTabs';
import { Boarder } from '../Boarder';
import { ModalEditTab } from './ModalEditTab';
import style from './Tabs.module.scss';
import { Plus } from 'lucide-react';

const { TabPane } = Tabs;
export const Tab = () => {
  const { handleTabChange, isLoading, activeTab, tabs, onEdit } = useTabs();
  return (
    <>
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        tabBarExtraContent={{
          left: (
            <Tooltip title="Создать панель">
              <Button type="text" icon={<Plus />} style={{ margin: '0px 15px' }} onClick={onEdit} />
            </Tooltip>
          ),
        }}
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
