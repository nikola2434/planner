import type { ColumnSubjectType, ColumnSubject, ResultRowType } from '@/src/share/types';

export interface InitialStateBoard {
  isLoading: boolean;
  isError: boolean;

  typeSubjects: ColumnSubjectType[];
  subjects: ColumnSubject[];

  result: Record<number, ResultRowType>;
}
