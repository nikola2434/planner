import { Route, Routes } from 'react-router-dom';
import { PageError } from '@/screens/404Page';
import { HomePage } from '@/screens/HomePage';
import { PUBLIC_PAGE } from '@/src/config/public-page.config';
import { SettingsPage } from '@/screens/SettingsPage';

export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path={PUBLIC_PAGE.HOME} element={<HomePage />} />
        <Route path={PUBLIC_PAGE.SETTINGS} element={<SettingsPage />} />

        <Route path="*" element={<PageError />} />
      </Routes>
    </>
  );
};
