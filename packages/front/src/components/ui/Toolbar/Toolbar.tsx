import { Space } from 'antd';
import { FC, PropsWithChildren } from 'react';

export const Toolbar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Space size={'middle'} style={{ padding: '20px 25px', height: 70 }}>
      {children}
    </Space>
  );
};
