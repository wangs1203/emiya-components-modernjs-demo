import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from 'emiya-components';

const storyMeta: Meta<typeof DatePicker> = {
  title: 'antd/DatePicker',
  component: DatePicker,
  argTypes: {
    allowClear: { control: 'boolean' },
    block: { control: 'boolean' },
    autoFocus: { control: 'boolean' },
    bordered: { control: 'boolean' },
    changeOnBlur: { control: 'boolean' },
    disabled: { control: 'boolean' },
    format: { control: 'text' },
    picker: {
      control: 'select',
      options: ['date', 'week', 'month', 'quarter', 'year'],
    },
    showTime: { control: 'boolean' },
    showNow: { control: 'boolean' },
    showToday: { control: 'boolean' },
  },
  args: {
    allowClear: true,
    autoFocus: false,
    bordered: true,
    changeOnBlur: false,
    disabled: false,
    showTime: false,
    // format: 'YYYY-MM-DD',
    picker: 'date',
    block: true,
  },
};

export default storyMeta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {};
