import { useActionsCreators, useAppDispatch, useStateSelector } from '@/src/hooks';
import type { SubjectFormInterface } from '@/src/share/types';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Modal } from 'antd';
import { subjectActions } from '@/src/store/subject';
import { subjectTypeActions } from '@/src/store/subjectType';
import { allActionsBoard } from '@/src/store/boards';

const { confirm } = Modal;

const defaultValues: Partial<SubjectFormInterface> = {
  name: '',
  countExam: 0,
  countLaboratory: 0,
  disciplineId: null,
  countLectures: 0,
  countSelfWork: 0,
  countSeminars: 0,
  countText: 0,
  hoursLaboratory: 0,
};

export const useFormSubject = () => {
  const { values, mode, idRecord } = useStateSelector((store) => store.subject);
  const actionsSubject = useActionsCreators(subjectActions);
  const actionsTypeSubject = useActionsCreators(subjectTypeActions);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { isDirty, errors },
  } = useForm<SubjectFormInterface>({ mode: 'onChange', defaultValues });

  useEffect(() => {
    if (!values) return;
    reset({
      name: values.name,
      countExam: values.countExam,
      countLaboratory: values.countLaboratory,
      disciplineId: values.disciplineId,
      countLectures: values.countLectures,
      countSelfWork: values.countSelfWork,
      countSeminars: values.countSeminars,
      countText: values.countText,
      hoursLaboratory: values.hoursLaboratory,
    });
  }, [values, reset]);

  useEffect(() => {
    if (!idRecord) return;
    setValue('disciplineId', idRecord);
  }, [idRecord, setValue, getValues]);

  const onSubmit = handleSubmit(async function (data) {
    if (mode === 'create') {
      const res = await dispatch(allActionsBoard.createSubject(data));
      if (allActionsBoard.createSubject.fulfilled.match(res) && res.payload.id) {
        actionsTypeSubject.setIdRecord(res.payload.id);
      }
      close();
    } else {
      dispatch(allActionsBoard.updateSubject({ id: values.id, data })).then(() => close());
    }
  } as SubmitHandler<SubjectFormInterface>);

  const close = function () {
    reset(defaultValues);
    actionsSubject.close();
  };

  const openSubjectTypeForm = () => {
    let name = getValues('name');
    if (!name) name = 'Новый предмет';

    actionsTypeSubject.openRecord(name);
  };

  const closeDrawer = () => {
    if (isDirty) {
      confirm({
        title: 'Несохраненные изменения',
        centered: true,
        content: 'Форма содержит несохраненные изменения.\nВы уверены, что хотите отменить изменения?',
        okText: 'Да',
        cancelText: 'Нет',
        onOk() {
          close();
        },
      });
    } else {
      close();
    }
  };

  return { control, errors, onSubmit, closeDrawer, openSubjectTypeForm };
};
