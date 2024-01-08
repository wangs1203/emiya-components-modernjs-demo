import { useState, useCallback } from 'react';

export interface IUseModalControlConfig {
  defaultOpen?: boolean;
}
const useModalControl = (config?: IUseModalControlConfig) => {
  const modalConfig = config || ({} as IUseModalControlConfig);
  const { defaultOpen = false } = modalConfig;
  const [visible, setVisible] = useState(defaultOpen);
  const show = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);
  const modalProps = {
    open: visible,
    onCancel: close,
  };
  return {
    show,
    close,
    modalProps,
  };
};

export default useModalControl;
