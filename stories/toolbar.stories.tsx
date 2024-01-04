import type { Meta, StoryObj } from '@storybook/react';
import { Input } from 'antd';
import { Toolbar } from 'emiya-components';

const storyMeta: Meta<typeof Toolbar> = {
  title: 'Emiya Components/Toolbar',
  component: Toolbar,
  argTypes: {
    columns: { control: 'number' },
    filters: { control: 'object' },
    actions: { control: 'object' },
    values: { control: 'object' },
    onSearch: { control: 'function' },
    onChange: { control: 'function' },
    onReset: { control: 'function' },
    divider: { control: 'boolean' },
    queryType: { control: 'radio', options: ['search', 'statists'] },
  },
  args: {
    columns: 3,
    divider: true,
    filters: {
      name: {
        label: '名称',
        component: <Input />,
      },
      code: {
        label: '编号',
        component: <Input />,
      },
      description: {
        label: '描述',
        component: <Input />,
      },
      attrbuite1: {
        label: '属性1',
        component: <Input />,
      },
      attrbuite2: {
        label: '属性2',
        component: <Input />,
      },
      attrbuite3: {
        label: '属性3',
        component: <Input />,
      },
      attrbuite4: {
        label: '属性4',
        component: <Input />,
      },
      attrbuite5: {
        label: '属性5',
        component: <Input />,
      },
    },
  },
};
export default storyMeta;

type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {};
