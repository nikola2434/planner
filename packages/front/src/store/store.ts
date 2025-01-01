import { configureStore } from '@reduxjs/toolkit';
import { subjectTypeReducer } from './subjectType';
import { subjectReducer } from './subject';
import { boardReducer } from './boards';

export const store = configureStore({
  reducer: {
    subjectType: subjectTypeReducer,
    subject: subjectReducer,
    board: boardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;