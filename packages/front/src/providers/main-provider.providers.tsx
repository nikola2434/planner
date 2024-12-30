import { FC, PropsWithChildren } from 'react';
import { RouterProvider } from './router.provider';
import { Theme } from './theme.provider';
import { ReduxProvider } from './redux.provider';

export const MainProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <RouterProvider>
      <ReduxProvider>
        <Theme>{children}</Theme>
      </ReduxProvider>
    </RouterProvider>
  );
};
