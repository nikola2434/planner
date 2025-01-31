import { Content } from './Content';
import { Sidebar } from './Sidebar';
import cn from 'clsx';
import style from './Layout.module.scss';
import { useState, type FC, type PropsWithChildren } from 'react';
import { MainProvider } from '@/src/providers/main-provider.providers';
import { isBoolean } from '@/src/share/guards';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [isShowedSidebar, setIsSHowedSidebar] = useState<null | boolean>(null);

  function toggleSidebar() {
    setIsSHowedSidebar((prev) => (isBoolean(prev) ? !prev : false));
  }
  return (
    <MainProvider>
      <main
        className={cn(
          style.main,
          isBoolean(isShowedSidebar) ? (isShowedSidebar ? style.showSidebar : style.hideSidebar) : '',
        )}
      >
        <Sidebar toggle={toggleSidebar} show={isShowedSidebar} />
        <Content>{children}</Content>
      </main>
    </MainProvider>
  );
};
