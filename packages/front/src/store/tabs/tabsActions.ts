import { tabsApi } from '@/src/services';
import type { Tab, TabDto, TabName } from '@/src/share/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadTabs = createAsyncThunk<TabName[]>('tabs/loadTabs', async (_, thunkApi) => {
  try {
    return await tabsApi.getAllTabs();
  } catch (error) {
    console.error(error);
    return thunkApi.rejectWithValue(error);
  }
});

export const createTab = createAsyncThunk<TabName, TabDto>('tabs/createTab', async (body, thunkApi) => {
  try {
    return await tabsApi.createTab(body);
  } catch (error) {
    console.error(error);
    return thunkApi.rejectWithValue(error);
  }
});

export const editTab = createAsyncThunk<TabName, { id: string; body: Partial<TabDto> }>(
  'tabs/editTab',
  async (params, thunkApi) => {
    try {
      return await tabsApi.editTab(params.id, params.body);
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const deleteTab = createAsyncThunk<TabName, string>('tabs/deleteTab', async (params, thunkApi) => {
  try {
    return await tabsApi.deleteTab(params);
  } catch (error) {
    console.error(error);
    return thunkApi.rejectWithValue(error);
  }
});
