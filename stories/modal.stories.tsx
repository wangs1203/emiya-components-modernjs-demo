import type { Meta, StoryObj } from '@storybook/react';
import { CloseOutlined } from '@ant-design/icons';
import { Modal } from 'emiya-components';

const storyMeta: Meta<typeof Modal> = {
  title: 'antd/Modal',
  component: Modal,
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
    draggable: { control: 'boolean' },
    closable: { control: 'boolean' },
    destroyOnClose: { control: 'boolean' },
    afterClose: { control: 'function' },
    okButtonProps: { control: 'object' },
    cancelButtonProps: { control: 'object' },
    cancelText: { control: 'text' },
    centered: { control: 'boolean' },
    // closeIcon 类型是 boolean | ReactNode
    closeIcon: { control: 'object' },
    confirmLoading: { control: 'boolean' },
    focusTriggerAfterClose: { control: 'boolean' },
    forceRender: { control: 'boolean' },
    keyboard: { control: 'boolean' },
    mask: { control: 'boolean' },
    maskClosable: { control: 'boolean' },
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
    maskClosable: false,
    centered: true,
    keyboard: true,
    zIndex: 1000,
    closable: false,
    closeIcon: <CloseOutlined />,
  },
};

export default storyMeta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {};

export const WithCloseIcon: Story = {
  args: {
    closable: true,
    children: 'WithCloseIcon',
    footer: null,
  },
};

export const WithDraggable: Story = {
  args: {
    closable: true,
    draggable: true,
    children: 'WithDraggable',
  },
};
