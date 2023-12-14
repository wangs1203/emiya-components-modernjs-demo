// import Emiya from 'emiya-components';
import { Meta, StoryObj } from '@storybook/react';
import { TestDemo } from '../src';

// console.log(Emiya);

const storyMeta: Meta<typeof TestDemo> = {
  title: 'Components/TestDemo',
  component: TestDemo,
};
export default storyMeta;

type Story = StoryObj<typeof TestDemo>;

export const Template: Story = {};
