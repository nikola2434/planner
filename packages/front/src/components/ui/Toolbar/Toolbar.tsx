import { Space } from 'antd';
import { FC, PropsWithChildren } from 'react';

export const Toolbar: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  return (
    <Space size={'middle'} style={{ padding: '10px 25px', height: 50 }} className={className}>
      {children}
    </Space>
  );
};
