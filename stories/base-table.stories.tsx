import type { Meta, StoryObj } from '@storybook/react';
import { BaseTable } from 'emiya-components';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
  },
];
const dataSource = [];

for (let i = 1; i <= 20; i++) {
  dataSource.push({
    id: String(i),
    name: `姓名${i}`,
    age: i + 20,
    address: `地址${i}`,
  });
}

const storyMeta: Meta<typeof BaseTable> = {
  title: 'Emiya Components/BaseTable',
  component: BaseTable,
  argTypes: {
    data: { control: 'object' },
    columns: { control: 'object' },
    rowKey: { control: 'string' },
  },
  args: {
    rowKey: 'id',
    columns,
    data: dataSource,
  },
};

export default storyMeta;

type Story = StoryObj<typeof BaseTable>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    data: [],
  },
};
