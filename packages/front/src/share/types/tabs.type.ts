import type { SubjectTypeInterface } from './subjects.type';

export interface TabName {
  name: string;
  id: string;
}

export interface Tab extends TabName {
  createdAt: string;
  updatedAt: string;
  disciplines: SubjectTypeInterface[];
}

export type TabDto = Pick<Tab, 'name' | 'disciplines'>;
