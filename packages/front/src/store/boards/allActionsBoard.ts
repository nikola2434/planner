import * as actionAsync from './boardActions';
import { actionSync } from './board.slice';

export const allActionsBoard = { ...actionSync, ...actionAsync };
