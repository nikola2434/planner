import type { ColumnSubject, SubjectInterface, SubjectTypeInterface } from '@/src/share/types';

export const convertSubjectType = function (subjectType: SubjectTypeInterface, subjects: ColumnSubject[] = []) {
  let maxX = 1;
  const mapSemester: Record<number, (ColumnSubject | null)[]> = {};

  const subjectsSort = subjectType.subject.sort((a, b) => a.y - b.y || a.x - b.x);
  subjectsSort.forEach((sub) => {
    const convertSub = convertSubject(sub);
    subjects.push(convertSub);
    if (sub.x > maxX) {
      maxX = sub.x;
    }
    if (!mapSemester[sub.y]) {
      mapSemester[sub.y] = [];
    }
    mapSemester[sub.y].push(convertSub);
  });

  const subjectTypeConvert = { ...subjectType, maxX, mapSemester };

  return subjectTypeConvert;
};

export const convertSubject = function (subject: SubjectInterface): ColumnSubject {
  const classroomCountHours =
    subject.countLectures + subject.countSeminars + subject.countLaboratory + subject.hoursLaboratory;

  const homeCountHours = subject.countSelfWork + subject.countText + subject.countExam;
  const totalCountHours = classroomCountHours + homeCountHours;

  const rating = Math.ceil(totalCountHours / 36);

  return { ...subject, classroomCountHours, homeCountHours, totalCountHours, rating };
};
