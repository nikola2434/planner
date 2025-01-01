export interface SubjectTypeInterface {
  id: string;
  createdAt: string;
  updatedAt: string;

  name: string;
  color?: string;

  subject: SubjectInterface[];
}

export interface SubjectInterface {
  id: string;
  createdAt: string;
  updatedAt: string;

  name: string;

  countLectures: number;
  countSeminars: number;
  countLaboratory: number;
  hoursLaboratory: number;

  countSelfWork: number;
  countText: number;
  countExam: number;

  disciplineId: string;

  x: number;
  y: number;
}

type typeOmitFields<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'subject'>;

export type SubjectFormInterface = typeOmitFields<SubjectInterface>;
export type SubjectTypeFormInterface = typeOmitFields<SubjectTypeInterface> & { subject: string[] };

export interface ColumnSubject extends SubjectInterface {
  totalCountHours: number;
  classroomCountHours: number;
  homeCountHours: number;
  rating: number;
}

export interface ColumnSubjectType extends SubjectTypeInterface {
  mapSemester: Record<number, (ColumnSubject | null)[]>;
  maxX: number;
}
