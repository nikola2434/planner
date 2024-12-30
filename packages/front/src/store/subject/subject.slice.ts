import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { FormStateType } from '../types/form-state.inderface';
import type { SubjectFormInterface, SubjectInterface } from '@/src/share/types';

const initialState: FormStateType<Partial<SubjectInterface>> = {
  open: false,
  mode: 'create',
  values: null,
  isCallback: false,
  idRecord: null,
  nameRecord: null,
};

export const subjectSlice = createSlice({
  name: 'subject',
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

    edit: (state, action: PayloadAction<Partial<SubjectInterface>>) => {
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

export const { reducer: subjectReducer, actions: subjectActions } = subjectSlice;
