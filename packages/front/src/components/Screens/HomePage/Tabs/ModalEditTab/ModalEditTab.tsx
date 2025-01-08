import { PUBLIC_PAGE } from '@/src/config/public-page.config';
import { useActionsCreators, useStateSelector } from '@/src/hooks';
import { allActionsTabs } from '@/src/store/tabs';
import { Input, Modal } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ModalEditTab: FC = () => {
  const { mode, values, showWindow } = useStateSelector((store) => store.tabs);
  const actionsTabs = useActionsCreators(allActionsTabs);
  const [nameValue, setNameValue] = useState<string>('');
  const navigate = useNavigate();

  const handleCancel = () => {
    setNameValue('');
    actionsTabs.closeWindow();
  };

  useEffect(() => {
    if (values?.name) {
      setNameValue(values.name);
    }
  }, [values, setNameValue]);

  const handleOk = async () => {
    if (mode === 'create') {
      const res = await actionsTabs.createTab({ disciplines: [], name: nameValue });
      if (allActionsTabs.createTab.fulfilled.match(res) && res.payload.id) {
        navigate(PUBLIC_PAGE.HOME + res.payload.id);
      }
    } else {
      await actionsTabs.editTab({ id: values.id, body: { name: nameValue } });
    }
    handleCancel();
  };

  return (
    <Modal
      title={mode === 'create' ? 'Создание вкладки' : 'Изменение вкладки'}
      open={showWindow}
      cancelText="Отмена"
      okText="Ок"
      onCancel={handleCancel}
      onOk={handleOk}
      centered={true}
      okButtonProps={{ disabled: !nameValue.trim() }}
    >
      <Input placeholder="название" width={'100%'} value={nameValue} onChange={(e) => setNameValue(e.target.value)} />
    </Modal>
  );
};
