import type { ReactNode, HTMLAttributes } from 'react';
import type { SpinProps } from 'antd';
import { Spin, theme } from 'antd';
import clsx from 'clsx';

const { useToken } = theme;

interface IBaseLoaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  center?: boolean;
  vertical?: boolean;
  tip?: ReactNode;
  size?: SpinProps['size'];
  spinProps?: Omit<SpinProps, 'tip' | 'delay' | 'spinning' | 'size'>;
}

export default function BaseLoader({
  center = false,
  vertical = true,
  tip,
  spinProps,
  className,
  size = 'default',
  ...props
}: IBaseLoaderProps) {
  const { token } = useToken();
  return (
    <div
      {...props}
      className={clsx([
        'gap-2',
        vertical ? 'inline-flex' : 'flex',
        {
          'justify-center items-center w-full h-full': center,
        },
        { 'flex-col': vertical },
      ])}
    >
      <Spin {...spinProps} size={size} />
      <div
        style={{ color: token.colorPrimaryText }}
        className={clsx([
          'flex items-center',
          {
            'text-xs': size === 'small',
            'text-sm': size === 'default',
            'text-base': size === 'large',
          },
        ])}
      >
        {tip}
      </div>
    </div>
  );
}
