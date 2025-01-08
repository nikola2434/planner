import * as actionAsync from './tabsActions';
import { tabsActions } from './tabs.slice';

export const allActionsTabs = { ...tabsActions, ...actionAsync };
