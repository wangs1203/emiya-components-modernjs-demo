import type { Meta, StoryObj } from '@storybook/react';
import { BaseLoader } from 'emiya-components';

const storyMeta: Meta<typeof BaseLoader> = {
  title: 'Emiya Components/BaseLoader',
  component: BaseLoader,
  argTypes: {
    tip: { control: 'object' },
    size: { control: 'select', options: ['small', 'default', 'large'] },
    center: { control: 'boolean' },
    vertical: { control: 'boolean' },
    spinProps: { control: 'object' },
  },
  args: {
    tip: '加载中...',
    size: 'default',
  },
};
export default storyMeta;

type Story = StoryObj<typeof BaseLoader>;

export const Default: Story = {};
