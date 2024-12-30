import { subjectApi } from '@/src/services';
import type {
  MoveInterface,
  SubjectFormInterface,
  SubjectInterface,
  SubjectTypeFormInterface,
  SubjectTypeInterface,
} from '@/src/share/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllSubjects = createAsyncThunk<SubjectTypeInterface[]>('board/getAllSubjects', async (_, thunkApi) => {
  try {
    return await subjectApi.getAllSubjectsType();
  } catch (error) {
    console.error(error);
    return thunkApi.rejectWithValue(error);
  }
});

export const updateSubjectType = createAsyncThunk<SubjectTypeInterface, { id: string; data: SubjectTypeFormInterface }>(
  'board/updateSubjectType',
  async (params, thunkApi) => {
    try {
      return await subjectApi.updateSubjectType(params.id, params.data);
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const createSubjectType = createAsyncThunk<SubjectTypeInterface, SubjectTypeFormInterface>(
  'board/createSubjectType',
  async (params, thunkApi) => {
    try {
      return await subjectApi.createSubjectType(params);
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const deleteSubjectType = createAsyncThunk<SubjectTypeInterface, string>(
  'board/deleteSubjectType',
  async (params, thunkApi) => {
    try {
      return await subjectApi.deleteSubjectType(params);
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const updateSubject = createAsyncThunk<SubjectInterface, { id: string; data: SubjectFormInterface }>(
  'board/updateSubject',
  async (params, thunkApi) => {
    try {
      return await subjectApi.updateSubject(params.id, params.data);
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const createSubject = createAsyncThunk<SubjectInterface, SubjectFormInterface>(
  'board/createSubject',
  async (params, thunkApi) => {
    try {
      return await subjectApi.createSubject(params);
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const deleteSubject = createAsyncThunk<SubjectInterface, string>(
  'board/deleteSubject',
  async (params, thunkApi) => {
    try {
      return await subjectApi.deleteSubject(params);
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const moveAsync = createAsyncThunk<SubjectInterface, { id: string; data: MoveInterface }>(
  'board/moveAsync',
  async (params, thunkApi) => {
    try {
      return await subjectApi.moveSubject(params.id, params.data);
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error);
    }
  },
);
