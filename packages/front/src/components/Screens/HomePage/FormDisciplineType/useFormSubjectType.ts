import { useActionsCreators, useAppDispatch, useStateSelector } from '@/src/hooks';
import type { SubjectTypeFormInterface } from '@/src/share/types';
import { subjectTypeActions } from '@/src/store/subjectType';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Modal } from 'antd';
import { subjectActions } from '@/src/store/subject';
import { allActionsBoard } from '@/src/store/boards';
import { isObject } from '@/src/share/guards';
import { useParams } from 'react-router-dom';

const { confirm } = Modal;

function hasToHex(value: unknown): value is { toHex: () => string } {
  return isObject(value) && typeof value.toHex === 'function';
}

const defaultValues: Partial<SubjectTypeFormInterface> = {
  name: '',
  subject: [],
  color: '#1677FF',
};

export const useFormSubjectType = () => {
  const { values, idRecord, mode } = useStateSelector((store) => store.subjectType);
  const actionsTypeSubject = useActionsCreators(subjectTypeActions);
  const actionsSubject = useActionsCreators(subjectActions);
  const actionsBoard = useActionsCreators(allActionsBoard);
  const dispatch = useAppDispatch();
  const { tabId } = useParams<{ tabId?: string }>();

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { isDirty, errors },
  } = useForm<SubjectTypeFormInterface>({ mode: 'onChange', defaultValues });

  useEffect(() => {
    if (!values) return;
    reset({
      color: values.color,
      name: values.name,
      subject: values.subject?.map((item) => item.id),
      order: values.order,
    });
  }, [values, reset]);

  useEffect(() => {
    if (!idRecord) return;
    const prevValue = getValues('subject') || [];
    setValue('subject', [...prevValue, idRecord]);
  }, [idRecord, setValue, getValues]);

  const onSubmit = handleSubmit(async function (data) {
    let color = data.color;
    if (hasToHex(color)) {
      data.color = '#' + color.toHex();
    }
    if (mode === 'create') {
      const res = await dispatch(allActionsBoard.createSubjectType({ idTab: tabId, data }));
      if (allActionsBoard.createSubjectType.fulfilled.match(res) && res.payload.id) {
        actionsSubject.setIdRecord(res.payload.id);
      }
      close();
      if (tabId) actionsBoard.getTab(tabId);
    } else {
      dispatch(allActionsBoard.updateSubjectType({ id: values.id, data: data })).then(() => {
        close();
        if (tabId) actionsBoard.getTab(tabId);
      });
    }
  } as SubmitHandler<SubjectTypeFormInterface>);

  const close = function () {
    reset(defaultValues);
    actionsTypeSubject.close();
  };

  const openSubjectForm = () => {
    let name = getValues('name');
    if (!name) name = 'Новый вид дисциплины';

    actionsSubject.openRecord(name);
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

  return { control, errors, onSubmit, closeDrawer, openSubjectForm };
};
