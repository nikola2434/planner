import { modeFormType } from '@/src/share/types/modeForm';

export type FormStateType<T> = {
  mode: modeFormType;
  open: boolean;
  nameRecord?: string;
  isCallback: boolean;
  idRecord?: string;
  values?: T;
};
