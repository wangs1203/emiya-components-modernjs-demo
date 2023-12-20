import { Meta, StoryObj } from '@storybook/react';
import { TestDemo } from 'emiya-components';

const storyMeta: Meta<typeof TestDemo> = {
  title: 'Emiya Components/TestDemo',
  component: TestDemo,
};
export default storyMeta;

type Story = StoryObj<typeof TestDemo>;

export const Template: Story = {};
