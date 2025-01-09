import { useStateSelector } from '@/src/hooks';
import { Button, Drawer, Form, Input, InputNumber, Select, SelectProps, Space, Tooltip } from 'antd';
import { useFormSubject } from './useFormSubject';
import { Controller } from 'react-hook-form';
import { Plus } from 'lucide-react';

export const DriverDiscipline = () => {
  const {
    subject: { mode, open, isCallback, nameRecord },
    board: { typeSubjects },
  } = useStateSelector((store) => store);

  const options: SelectProps['options'] = (typeSubjects || []).map((item) => ({ label: item.name, value: item.id }));

  const { closeDrawer, control, errors, onSubmit, openSubjectTypeForm } = useFormSubject();

  return (
    <Drawer
      title={mode === 'create' ? 'Создание дисциплины' : 'Редактирование дисциплины'}
      width={600}
      onClose={closeDrawer}
      open={open}
      maskClosable={false}
      destroyOnClose={true}
      extra={
        <Space>
          <Button style={{ width: 105 }} onClick={closeDrawer}>
            Закрыть
          </Button>
          <Button style={{ width: 105 }} onClick={onSubmit} type="primary">
            Сохранить
          </Button>
        </Space>
      }
    >
      <Form layout="vertical">
        <Form.Item
          label={'Название предмета'}
          validateStatus={errors.name ? 'error' : 'success'}
          help={errors.name && errors['name']?.message}
        >
          <Controller
            control={control}
            name="name"
            rules={{ required: { value: true, message: 'Поле обязательно для заполнения' } }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <div style={{ display: 'flex', width: '100%', gap: '8px', alignItems: 'center' }}>
          <Form.Item
            label={'Вид дисциплины'}
            validateStatus={errors.disciplineId ? 'error' : 'success'}
            help={errors.disciplineId && errors['disciplineId']?.message}
            style={{ width: '100%' }}
          >
            <Controller
              control={control}
              name="disciplineId"
              render={({ field }) => (
                <Select
                  {...field}
                  disabled={isCallback}
                  style={{ width: '100%' }}
                  options={options}
                  prefix={nameRecord}
                />
              )}
            />
          </Form.Item>
          <Tooltip title="Создать новый вид дисциплины">
            <Button icon={<Plus />} style={{ marginTop: 5 }} disabled={isCallback} onClick={openSubjectTypeForm} />
          </Tooltip>
        </div>
        <Form.Item
          label={'Академ. часов лекций'}
          validateStatus={errors.countLectures ? 'error' : 'success'}
          help={errors.countLectures && errors['countLectures']?.message}
        >
          <Controller
            control={control}
            name="countLectures"
            defaultValue={0}
            render={({ field }) => <InputNumber {...field} min={0} style={{ width: '100%' }} />}
          />
        </Form.Item>
        <Form.Item
          label={'Академ. часов семинаров'}
          validateStatus={errors.countSeminars ? 'error' : 'success'}
          help={errors.countSeminars && errors['countSeminars']?.message}
        >
          <Controller
            control={control}
            name="countSeminars"
            defaultValue={0}
            render={({ field }) => <InputNumber {...field} min={0} style={{ width: '100%' }} />}
          />
        </Form.Item>
        <Form.Item
          label={'Академ. часов лабораторных работ'}
          validateStatus={errors.countLaboratory ? 'error' : 'success'}
          help={errors.countLaboratory && errors['countLaboratory']?.message}
        >
          <Controller
            control={control}
            name="countLaboratory"
            defaultValue={0}
            render={({ field }) => <InputNumber {...field} min={0} style={{ width: '100%' }} />}
          />
        </Form.Item>
        <Form.Item
          label={'Количество лабораторных работ'}
          validateStatus={errors.hoursLaboratory ? 'error' : 'success'}
          help={errors.hoursLaboratory && errors['hoursLaboratory']?.message}
        >
          <Controller
            control={control}
            name="hoursLaboratory"
            defaultValue={0}
            render={({ field }) => <InputNumber {...field} min={0} style={{ width: '100%' }} />}
          />
        </Form.Item>

        <Form.Item
          label={'Академ. часов самостоятельной работы'}
          validateStatus={errors.countSelfWork ? 'error' : 'success'}
          help={errors.countSelfWork && errors['countSelfWork']?.message}
        >
          <Controller
            control={control}
            name="countSelfWork"
            defaultValue={0}
            render={({ field }) => <InputNumber {...field} min={0} style={{ width: '100%' }} />}
          />
        </Form.Item>
        <Form.Item
          label={'Академ. часов на контроные мероприятия'}
          validateStatus={errors.countText ? 'error' : 'success'}
          help={errors.countText && errors['countText']?.message}
        >
          <Controller
            control={control}
            name="countText"
            defaultValue={0}
            render={({ field }) => <InputNumber {...field} min={0} style={{ width: '100%' }} />}
          />
        </Form.Item>
        <Form.Item
          label={'Академ. часов на аттестацию'}
          validateStatus={errors.countExam ? 'error' : 'success'}
          help={errors.countExam && errors['countExam']?.message}
        >
          <Controller
            control={control}
            name="countExam"
            defaultValue={0}
            render={({ field }) => <InputNumber {...field} min={0} style={{ width: '100%' }} />}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
