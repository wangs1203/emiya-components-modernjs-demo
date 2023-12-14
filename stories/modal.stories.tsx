import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../src';

const storyMeta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
    draggable: { control: 'boolean' },
    destroyOnClose: { control: 'boolean' },
    afterClose: { control: 'function' },
    okButtonProps: { control: 'object' },
    cancelButtonProps: { control: 'object' },
    cancelText: { control: 'text' },
    centered: { control: 'boolean' },
    // closeIcon 类型是 boolean | ReactNode
    closeIcon: { control: 'boolean' },
    confirmLoading: { control: 'boolean' },
    focusTriggerAfterClose: { control: 'boolean' },
    forceRender: { control: 'boolean' },
    keyboard: { control: 'boolean' },
    mask: { control: 'boolean' },
    okText: { control: 'text' },
    okType: { control: 'text' },
    width: { control: 'text' },
    zIndex: { control: 'number' },
    onCancel: { control: 'function' },
  },
  args: {
    open: true,
    okText: '确定',
    cancelText: '取消',
    width: '540px',
    title: '标题',
    mask: true,
    centered: true,
    keyboard: true,
    zIndex: 1000,
    closeIcon: true,
  },
};

export default storyMeta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {};
