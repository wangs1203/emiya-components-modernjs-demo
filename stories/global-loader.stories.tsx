import type { Meta, StoryObj } from '@storybook/react';
import { GlobalLoader } from 'emiya-components';

const storyMeta: Meta<typeof GlobalLoader> = {
  title: 'Emiya Components/GlobalLoader',
  component: GlobalLoader,
  argTypes: {
    type: { control: 'select', options: ['line', 'circle'] },
  },
  args: {
    type: 'line',
  },
};

export default storyMeta;

type Story = StoryObj<typeof GlobalLoader>;

export const DefaultLineLoader: Story = {};

export const WithCircleLoader: Story = {
  args: {
    type: 'circle',
  },
};
