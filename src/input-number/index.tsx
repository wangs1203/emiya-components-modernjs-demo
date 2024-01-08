import { forwardRef, memo, ReactElement, ReactNode, Ref } from 'react';
import {
  InputNumber as AntdInputNumber,
  InputNumberProps as AntdInputNumberProps,
} from 'antd';
import clsx from 'clsx';

type ValueType = string | number;

export interface IInputNumberProps<T extends ValueType = ValueType>
  extends AntdInputNumberProps<T> {
  block?: boolean;
}

function InternalInputNumber<T extends ValueType = ValueType>(
  { block = true, className, ...props }: IInputNumberProps<T>,
  ref?: Ref<HTMLInputElement> | undefined,
) {
  return (
    <AntdInputNumber
      {...props}
      ref={ref}
      className={clsx([className, { '!tw-w-full': block }])}
    />
  );
}

const InputNumber = memo(forwardRef(InternalInputNumber)) as unknown as <
  T extends ValueType = ValueType,
>(
  props: IInputNumberProps<T> & {
    children?: ReactNode;
  } & {
    ref?: Ref<HTMLInputElement> | undefined;
  },
) => ReactElement;

export default InputNumber;
