import type { Meta, StoryObj } from '@storybook/react';
import { InputNumber } from 'emiya-components';

const storyMeta: Meta<typeof InputNumber> = {
  title: 'antd/InputNumber',
  component: InputNumber,
  argTypes: {
    block: { control: 'boolean' },
    placeholder: { control: 'text' },
    size: { control: 'select', options: ['small', 'middle', 'large'] },
  },
  args: {
    block: true,
  },
};
export default storyMeta;

type Story = StoryObj<typeof InputNumber>;

export const Default: Story = {};
