import type { ReactNode } from 'react';
import type { ModalProps as AntdModalProps } from 'antd';
import type { DraggableEvent, DraggableData } from 'react-draggable';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { Modal as AntdModal } from 'antd';
import Draggable from 'react-draggable';
import { useEvent } from '@/hooks';

export interface IBaseModalProps extends AntdModalProps {
  draggable?: boolean;
}

export default memo(function BaseModal({
  width = '55vw',
  maskClosable = false,
  closable = true,
  draggable = false,
  closeIcon,
  title,
  modalRender,
  ...props
}: IBaseModalProps) {
  const [dragDisabled, setDragDisabled] = useState(true);
  const draggleRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const titleMemozied = useMemo(
    () =>
      draggable ? (
        <div
          className="tw-w-full tw-cursor-move tw-draggable-handle"
          onMouseOver={() => {
            dragDisabled && setDragDisabled(false);
          }}
          onMouseOut={() => {
            setDragDisabled(true);
          }}
        >
          {title}
        </div>
      ) : (
        title
      ),
    [draggable, title, dragDisabled],
  );

  const handleDragStart = useEvent(
    (_e: DraggableEvent, data: DraggableData) => {
      const { clientWidth, clientHeight } =
        document.documentElement || document.body;
      const taregetRect = draggleRef.current?.getBoundingClientRect();
      if (!taregetRect) return;
      setBounds({
        left: -taregetRect.left + data.x,
        top: -taregetRect.top + data.y,
        right: clientWidth - (taregetRect.right - data.x),
        bottom: clientHeight - (taregetRect.bottom - data.y),
      });
    },
  );

  const renderModal = useCallback(
    (modal: ReactNode) => {
      const innerModal = modalRender ? modalRender(modal) : modal;
      return draggable ? (
        <Draggable
          handle=".draggable-handle"
          disabled={dragDisabled}
          bounds={bounds}
          onStart={handleDragStart}
        >
          <div ref={draggleRef}>{innerModal}</div>
        </Draggable>
      ) : (
        innerModal
      );
    },
    [bounds, dragDisabled, draggable, handleDragStart, modalRender],
  );

  return (
    <AntdModal
      {...props}
      title={titleMemozied}
      width={width}
      maskClosable={maskClosable}
      closable={closable}
      modalRender={renderModal}
      closeIcon={closeIcon}
    />
  );
});
