import { FC } from 'react';
import style from './PrintVersion.module.scss';
import clsx from 'clsx';

export const PrintVersion: FC<{ version?: string; hide?: boolean }> = ({ version = window.version, hide = false }) => {
  if (!version.startsWith('v')) {
    version = 'v' + version;
  }
  return <div className={clsx(style.version, hide && style.hide)}>{version}</div>;
};
