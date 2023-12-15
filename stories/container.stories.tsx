import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '../src';

const storyMeta: Meta<typeof Container> = {
  title: 'Components/Container',
  component: Container,
  argTypes: {
    children: { control: 'object' },
    full: { control: 'boolean' },
  },
  args: {
    children: <div>content</div>,
  },
};

export default storyMeta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {};
