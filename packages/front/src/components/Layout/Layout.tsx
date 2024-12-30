import { Content } from './Content';
import { Sidebar } from './Sidebar';
import cn from 'clsx';
import style from './Layout.module.scss';
import { useState, type FC, type PropsWithChildren } from 'react';
import { MainProvider } from '@/src/providers/main-provider.providers';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [isShowedSidebar, setIsSHowedSidebar] = useState(true);

  function toggleSidebar() {
    setIsSHowedSidebar(!isShowedSidebar);
  }
  return (
    <MainProvider>
      <main className={cn(style.main, isShowedSidebar ? style.showSidebar : style.hideSidebar)}>
        <Sidebar toggle={toggleSidebar} />
        <Content>{children}</Content>
      </main>
    </MainProvider>
  );
};
