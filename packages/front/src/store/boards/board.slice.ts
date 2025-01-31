import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { InitialStateBoard } from './board.interface';
import type { SubjectInterface, ColumnSubjectType, ColumnSubject, ResultRowType } from '@/src/share/types';
import {
  createSubject,
  createSubjectType,
  deleteSubject,
  deleteSubjectType,
  getTab,
  updateSubject,
  updateSubjectType,
} from './boardActions';
import { convertSubject, convertSubjectType } from './board.utils';
import { COUNT_SEMESTER } from '@/src/share/constants.share';

const initialState: InitialStateBoard = {
  isError: false,
  isLoading: false,
  subjects: [],
  typeSubjects: [],
  result: {},
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    moveSync: (state, action: PayloadAction<{ subject: SubjectInterface; newSubjectTypeId?: string }>) => {
      const { newSubjectTypeId, subject } = action.payload;
      state.subjects = state.subjects.map((sub) => {
        if (sub.id === subject.id) {
          return convertSubject({
            ...subject,
            disciplineId: newSubjectTypeId ? newSubjectTypeId : subject.disciplineId,
          });
        }
        return sub;
      });
      state.typeSubjects = state.typeSubjects.map((subjectType) => {
        if (subjectType.id === newSubjectTypeId) {
          subjectType.subject.push({ ...subject, disciplineId: newSubjectTypeId });
          const { maxX, mapSemester, ...props } = subjectType;

          return convertSubjectType({ ...props }, []);
        }

        if (subjectType.id === subject.disciplineId) {
          let subjects: SubjectInterface[] = [];

          if (!newSubjectTypeId) {
            subjects = subjectType.subject.map((item) => (item.id === subject.id ? subject : item));
          } else {
            subjects = subjectType.subject.filter((item) => item.id !== subject.id);
          }
          const { maxX, mapSemester, ...props } = subjectType;
          return convertSubjectType({ ...props, subject: subjects }, []);
        }
        return subjectType;
      });
    },

    changeOrderColumn: (state, action: PayloadAction<{ typeSubjectId: string; newOrder: number }>) => {
      const { typeSubjectId, newOrder } = action.payload;

      const prevSubjectType = state.typeSubjects.find((item) => item.id === typeSubjectId);
      if (!prevSubjectType) return;

      const prevOrder = prevSubjectType.order;
      const isMore = prevOrder < newOrder;

      state.typeSubjects = state.typeSubjects.map((item) => {
        if (item.id === typeSubjectId) {
          return { ...item, order: newOrder };
        }

        if (isMore) {
          if (item.order > prevOrder && item.order <= newOrder) {
            return { ...item, order: item.order - 1 };
          }
        } else {
          if (item.order >= newOrder && item.order < prevOrder) {
            return { ...item, order: item.order + 1 };
          }
        }

        return item;
      });

      state.typeSubjects.sort((a, b) => a.order - b.order);
    },

    updateResultRow: (state) => {
      const res: Record<number, ResultRowType> = {};
      for (let i = 0; i < COUNT_SEMESTER; i++) {
        res[i] = { value1: 0, value2: 0 };
      }
      for (let i = 0; i < state.typeSubjects.length; i++) {
        const typeSubject = state.typeSubjects[i];
        if (typeSubject.subject.length === 0) continue;

        for (const numberSem in typeSubject.mapSemester) {
          if (res[numberSem]) {
            const currentValue = res[numberSem];
            const resRow = typeSubject.mapSemester[numberSem].reduce(
              (accumulator, currentValue) => {
                accumulator.value1 += currentValue.classroomCountHours;
                accumulator.value2 += currentValue.rating;
                return accumulator;
              },
              { value1: 0, value2: 0 } as ResultRowType,
            );
            currentValue.value1 += resRow.value1;
            currentValue.value2 += resRow.value2;
          }
        }
      }
      for (let i = 0; i < COUNT_SEMESTER; i++) {
        if (res[i]?.value1) {
          res[i].value1 = Math.ceil(res[i].value1 / 17);
        }
      }

      state.result = res;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTab.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getTab.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(getTab.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;

        const subjectsType: ColumnSubjectType[] = [];
        const subjects: ColumnSubject[] = [];
        payload.disciplines.sort((a, b) => a.order - b.order);
        for (let i = 0; i < payload.disciplines.length; i++) {
          const item = payload.disciplines[i];
          const subjectTypeConvert = convertSubjectType(item, subjects);

          subjectsType.push(subjectTypeConvert);
        }
        state.subjects = subjects;
        state.typeSubjects = subjectsType;
        console.log(state.typeSubjects);
      })
      .addCase(updateSubjectType.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateSubjectType.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(updateSubjectType.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;

        state.typeSubjects = state.typeSubjects.map((item) =>
          item.id === payload.id ? convertSubjectType(item) : item,
        );
      })
      .addCase(createSubjectType.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createSubjectType.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(createSubjectType.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;

        state.typeSubjects.push(convertSubjectType(payload));
      })
      .addCase(deleteSubjectType.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(deleteSubjectType.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(deleteSubjectType.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;

        state.typeSubjects = state.typeSubjects.filter((item) => item.id !== payload.id);
      })
      .addCase(updateSubject.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(updateSubject.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(updateSubject.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;

        state.subjects = state.subjects.map((item) => (item.id === payload.id ? convertSubject(payload) : item));
        state.typeSubjects = state.typeSubjects.map((item) => {
          let isReload = false;
          const subjects = item.subject.map((sub) => {
            if (sub.id === payload.id) {
              isReload = true;
              return payload;
            }
            return sub;
          });

          const { maxX, mapSemester, ...props } = item;

          return isReload ? convertSubjectType({ ...props, subject: subjects }) : item;
        });
      })
      .addCase(createSubject.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createSubject.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(createSubject.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;

        state.subjects.push(convertSubject(payload));
        if (payload.disciplineId) {
          state.typeSubjects = state.typeSubjects.map((item) => {
            if (item.id === payload.disciplineId) {
              const { maxX, mapSemester, ...props } = item;
              props.subject.push(payload);
              return convertSubjectType(props);
            }
            return item;
          });
        }
      })
      .addCase(deleteSubject.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(deleteSubject.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(deleteSubject.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.subjects = state.subjects.filter((item) => item.id !== payload.id);

        state.typeSubjects = state.typeSubjects.map((item) => {
          let isReload = false;
          const subjects = item.subject.filter((sub) => {
            if (sub.id === payload.id) {
              isReload = true;
              return false;
            }
            return true;
          });

          const { maxX, mapSemester, ...props } = item;

          return isReload ? convertSubjectType({ ...props, subject: subjects }) : item;
        });
      });
  },
});

export const { actions: actionSync, reducer: boardReducer } = boardSlice;
