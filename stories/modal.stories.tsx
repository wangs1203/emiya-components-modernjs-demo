import type { Meta, StoryObj } from '@storybook/react';
import type { IModalRefAttributes } from 'emiya-components';
import { useRef } from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Modal, BaseModal } from 'emiya-components';

const storyMeta: Meta<typeof BaseModal> = {
  title: 'antd/Modal',
  component: BaseModal,
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
    centered: false,
    keyboard: true,
    zIndex: 1000,
    closable: false,
    closeIcon: <CloseOutlined />,
  },
};

export default storyMeta;

type Story = StoryObj<typeof BaseModal>;

export const DefaultBaseModal: Story = {};

export const BaseModalWithCloseIcon: Story = {
  args: {
    closable: true,
    children: 'WithCloseIcon',
    footer: null,
  },
};

export const BaseModalWithDraggable: Story = {
  args: {
    closable: true,
    draggable: true,
    children: 'WithDraggable',
  },
};

export const ModalWithRef = (props: any) => {
  const modalRef = useRef<IModalRefAttributes>(null);
  const handleShow = () => {
    modalRef.current?.show();
  };
  const handleClose = () => {
    modalRef.current?.close();
  };
  return (
    <div>
      <Button type="primary" onClick={handleShow}>
        show
      </Button>
      <Button onClick={handleClose} style={{ marginLeft: 10 }}>
        close
      </Button>
      <Modal {...props} ref={modalRef} title="WithRef">
        WithRef
      </Modal>
    </div>
  );
};
