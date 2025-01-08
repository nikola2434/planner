import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TabsState } from './tabs.interface';
import { createTab, deleteTab, editTab, loadTabs } from './tabsActions';
import type { TabName } from '@/src/share/types';

const initialState: TabsState = {
  isLoading: false,
  isError: false,
  tabs: [],
  activeTab: null,

  mode: 'create',
  showWindow: false,
  values: null,
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    showCreateWindow: (state) => {
      state.mode = 'create';
      state.showWindow = true;
      state.values = null;
    },

    showEditWindow: (state, action: PayloadAction<string>) => {
      state.mode = 'edit';
      state.showWindow = true;
      state.values = state.tabs.find((tab) => tab.id === action.payload) || null;
    },

    closeWindow: (state) => {
      state.mode = 'create';
      state.values = null;
      state.showWindow = false;
    },

    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTabs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(loadTabs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.tabs = action.payload;
      })
      .addCase(loadTabs.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(createTab.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createTab.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.tabs.push(action.payload);
      })
      .addCase(createTab.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(editTab.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(editTab.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.tabs = state.tabs.map((tab) => {
          if (tab.id === action.payload.id) {
            return action.payload;
          }
          return tab;
        });
      })
      .addCase(editTab.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteTab.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteTab.fulfilled, (state, { payload }) => {
        const filterTabs = [];
        for (let i = 0; i < state.tabs.length; i++) {
          const tab = state.tabs[i];
          if (tab.id !== payload.id) {
            filterTabs.push(tab);
          } else {
            let nextTab = state.tabs[i - 1];
            if (!nextTab) nextTab = state.tabs[i + 1];

            if (nextTab) {
              state.activeTab = nextTab.id;
            } else {
              state.activeTab = null;
            }
          }
        }
        state.tabs = filterTabs;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(deleteTab.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const { reducer: tabsReducer, actions: tabsActions } = tabsSlice;
