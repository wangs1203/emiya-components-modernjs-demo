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
        'tw-gap-2',
        vertical ? 'tw-inline-flex' : 'tw-flex',
        {
          'tw-justify-center tw-items-center tw-w-full tw-h-full': center,
        },
        { 'tw-flex-col': vertical },
      ])}
    >
      <Spin {...spinProps} size={size} />
      <div
        style={{ color: token.colorPrimaryText }}
        className={clsx([
          'tw-flex tw-items-center',
          {
            'tw-text-xs': size === 'small',
            'tw-text-sm': size === 'default',
            'tw-text-base': size === 'large',
          },
        ])}
      >
        {tip}
      </div>
    </div>
  );
}
