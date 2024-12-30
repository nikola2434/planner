import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { FormStateType } from '../types/form-state.inderface';
import type { SubjectTypeFormInterface, SubjectTypeInterface } from '@/src/share/types';

const initialState: FormStateType<Partial<SubjectTypeInterface>> = {
  open: false,
  mode: 'create',
  values: null,
  isCallback: false,
  idRecord: null,
  nameRecord: null,
};

export const subjectTypeSlice = createSlice({
  name: 'subjectType',
  initialState,
  reducers: {
    create: (state) => {
      state.mode = 'create';
      state.open = true;
    },

    openRecord: (state, action: PayloadAction<string>) => {
      state.mode = 'create';
      state.open = true;
      state.isCallback = true;
      state.nameRecord = action.payload;
    },

    setIdRecord: (state, action: PayloadAction<string | null>) => {
      state.idRecord = action.payload;
    },

    edit: (state, action: PayloadAction<Partial<SubjectTypeInterface>>) => {
      state.mode = 'edit';
      state.open = true;
      state.values = action.payload;
    },

    close: (state) => {
      state.mode = 'create';
      state.open = false;
      state.values = null;
      state.isCallback = false;
      state.nameRecord = null;
      state.idRecord = null;
    },
  },
});

export const { reducer: subjectTypeReducer, actions: subjectTypeActions } = subjectTypeSlice;
