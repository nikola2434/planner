import { useStateSelector } from '@/src/hooks';
import { Button, ColorPicker, Drawer, Form, Input, InputNumber, Select, SelectProps, Space, Tooltip } from 'antd';
import { useFormSubjectType } from './useFormSubjectType';
import { Controller } from 'react-hook-form';
import { Plus } from 'lucide-react';

export const DriverDisciplineType = () => {
  const {
    subjectType: { mode, open, isCallback, nameRecord },
    board: { subjects: data },
  } = useStateSelector((store) => store);

  const options: SelectProps['options'] = (data || []).map((item) => ({ label: item.name, value: item.id }));

  const { closeDrawer, control, errors, onSubmit, openSubjectForm } = useFormSubjectType();

  return (
    <Drawer
      title={mode === 'create' ? 'Создание вида дисциплины' : 'Редактирование вида дисциплины'}
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
          label={'Название дисциплины'}
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
            label={'Предметы'}
            validateStatus={errors.subject ? 'error' : 'success'}
            help={errors.subject && errors['subject']?.message}
            style={{ width: '100%' }}
          >
            <Controller
              control={control}
              name="subject"
              render={({ field }) => (
                <Select
                  {...field}
                  style={{ width: '100%' }}
                  mode="multiple"
                  options={options}
                  disabled={isCallback}
                  prefix={nameRecord}
                />
              )}
            />
          </Form.Item>
          <Tooltip title="Создать новый предмет">
            <Button icon={<Plus />} style={{ marginTop: 5 }} onClick={openSubjectForm} disabled={isCallback} />
          </Tooltip>
        </div>

        <Form.Item
          label={'Порядок'}
          validateStatus={errors.order ? 'error' : 'success'}
          help={errors.order && errors['order']?.message}
          style={{ width: '100%' }}
        >
          <Controller
            control={control}
            name="order"
            render={({ field }) => (
              <Select
                {...field}
                style={{ width: '100%' }}
                options={options}
                disabled={isCallback}
                prefix={nameRecord}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={'Цвет'}
          validateStatus={errors.color ? 'error' : 'success'}
          help={errors.color && errors['color']?.message}
        >
          <Controller
            control={control}
            name="color"
            render={({ field }) => (
              <ColorPicker value={field.value} onChange={field.onChange} disabled={field.disabled} showText />
            )}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
