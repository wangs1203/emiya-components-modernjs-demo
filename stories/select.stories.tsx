import type { Meta, StoryObj } from '@storybook/react';
import { Space } from 'antd';
import { Select } from 'emiya-components';

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const storyMeta: Meta<typeof Select> = {
  title: 'antd/Select',
  component: Select,
  argTypes: {
    allowClear: { control: 'boolean' },
    block: { control: 'boolean' },
    placeholder: { control: 'text' },
    size: { control: 'select', options: ['small', 'middle', 'large'] },
  },
};
export default storyMeta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const Base: Story = {
  render: () => (
    <Space>
      <Select placeholder="请选择" />
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { id: 'jack', name: 'Jack' },
          { id: 'lucy', name: 'Lucy' },
          { id: 'Yiminghe', name: 'yiminghe' },
          { id: 'disabled', name: 'Disabled', disabled: true },
        ]}
      />
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        disabled
        options={[{ id: 'lucy', name: 'Lucy' }]}
      />
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        loading
        options={[{ id: 'lucy', name: 'Lucy' }]}
      />
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        allowClear
        options={[{ id: 'lucy', name: 'Lucy' }]}
      />
    </Space>
  ),
};

export const Block: Story = {
  args: {
    block: true,
    allowClear: true,
    options: [
      { id: 'jack', name: 'Jack' },
      { id: 'lucy', name: 'Lucy' },
      { id: 'Yiminghe', name: 'yiminghe' },
      { id: 'disabled', name: 'Disabled', disabled: true },
    ],
  },
};
