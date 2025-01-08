import { modeFormType, TabName } from '@/src/share/types';

export interface TabsState {
  isLoading: boolean;
  isError: boolean;
  tabs: TabName[];
  activeTab: string | null;

  mode: modeFormType;
  showWindow: boolean;
  values: TabName | null;
}
