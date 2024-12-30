import { FC } from 'react';
import style from './PrintVersion.module.scss';

export const PrintVersion: FC<{ version?: string }> = ({ version = window.version }) => {
  if (!version.startsWith('v')) {
    version = 'v' + version;
  }
  return <div className={style.version}>{version}</div>;
};
