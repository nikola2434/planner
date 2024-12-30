import { ConfigProvider } from 'antd';
import { FC, PropsWithChildren } from 'react';

import { themeConfig } from '@/src/config/theme.config';

export const Theme: FC<PropsWithChildren> = ({ children }) => {
  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
};
