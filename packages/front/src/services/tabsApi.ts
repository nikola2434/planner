import type { TabName, Tab, TabDto } from '../share/types';
import { classicAxios } from './axios';

export const tabsApi = {
  async getAllTabs() {
    return classicAxios.get<TabName[]>('tabs').then((data) => data.data);
  },

  async getTab(id: string) {
    return classicAxios.get<Tab>(`tabs/byId/${id}`).then((data) => data.data);
  },

  async createTab(body: TabDto) {
    return classicAxios.post<Tab>('tabs', body).then((data) => data.data);
  },

  async editTab(id: string, body: Partial<TabDto>) {
    return classicAxios.put<Tab>(`tabs/${id}`, body).then((data) => data.data);
  },

  async deleteTab(id: string) {
    return classicAxios.delete<Tab>(`tabs/${id}`).then((data) => data.data);
  },
};
