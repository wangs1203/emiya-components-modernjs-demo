import type { MouseEvent } from 'react';
import { memo, forwardRef, useImperativeHandle, useCallback } from 'react';
import BaseModal, { IBaseModalProps } from './base-modal';
import { useModalControl } from '@/hooks';

interface IModalProps extends Omit<IBaseModalProps, 'open'> {
  draggable?: boolean;
}

interface IModalRefAttributes {
  show: () => void;
  close: () => void;
  open: boolean;
}

export default memo(
  forwardRef<IModalRefAttributes, IModalProps>(function Modal(
    { maskClosable = false, onCancel, ...props }: IModalProps,
    ref,
  ) {
    const { modalProps, show, close } = useModalControl();

    const handleCancel = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        modalProps.onCancel();
        onCancel?.(e);
      },
      [modalProps, onCancel],
    );

    useImperativeHandle(ref, () => {
      return {
        open: modalProps.open,
        show,
        close,
      };
    });

    return (
      <BaseModal
        {...props}
        {...modalProps}
        onCancel={handleCancel}
        maskClosable={maskClosable}
      />
    );
  }),
);

export { BaseModal };
export type { IBaseModalProps, IModalProps, IModalRefAttributes };
