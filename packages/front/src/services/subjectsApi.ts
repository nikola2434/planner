import type {
  SubjectInterface,
  SubjectTypeFormInterface,
  SubjectFormInterface,
  SubjectTypeInterface,
  MoveInterface,
} from '../share/types';
import { classicAxios } from './axios';

export const subjectApi = {
  async getAllSubjectsType() {
    return classicAxios.get<SubjectTypeInterface[]>('disciplines').then((data) => data.data);
  },

  async updateSubjectType(id: string, data: SubjectTypeFormInterface) {
    return classicAxios.put<SubjectTypeInterface>(`disciplines/${id}`, data).then((data) => data.data);
  },

  async patchSubjectType(id: string, data: Partial<SubjectFormInterface>) {
    return classicAxios.patch<SubjectTypeInterface>(`disciplines/${id}`, data).then((data) => data.data);
  },

  async deleteSubjectType(id: string) {
    return classicAxios.delete<SubjectTypeInterface>(`disciplines/${id}`).then((data) => data.data);
  },

  async createSubjectType(tabId: string, data: SubjectTypeFormInterface) {
    return classicAxios.post<SubjectTypeInterface>(`disciplines/${tabId}`, data).then((data) => data.data);
  },

  async moveSubject(id: string, data: MoveInterface) {
    return classicAxios.put<SubjectInterface>(`subjects/move/${id}`, data).then((data) => data.data);
  },

  async deleteSubject(id: string) {
    return classicAxios.delete<SubjectInterface>(`subjects/${id}`).then((data) => data.data);
  },

  async createSubject(data: SubjectFormInterface) {
    return classicAxios.post<SubjectInterface>('subjects', data).then((data) => data.data);
  },

  async updateSubject(id: string, data: SubjectFormInterface) {
    return classicAxios.put<SubjectInterface>(`subjects/${id}`, data).then((data) => data.data);
  },
};
