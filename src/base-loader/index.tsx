import type { ReactNode, HTMLAttributes } from 'react';
import type { SpinProps } from 'antd';
import { Spin, theme } from 'antd';
import clsx from 'clsx';

const { useToken } = theme;

interface IBaseLoaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  center?: boolean;
  vertical?: boolean;
  spinning?: boolean;
  tip?: ReactNode;
  size?: SpinProps['size'];
  spinProps?: Omit<SpinProps, 'tip' | 'delay' | 'spinning' | 'size'>;
}

export default function BaseLoader({
  spinning = true,
  center = false,
  vertical = true,
  tip = '加载中...',
  spinProps,
  className,
  size = 'default',
  ...props
}: IBaseLoaderProps) {
  const { token } = useToken();
  return spinning ? (
    <div
      {...props}
      className={clsx([
        'tw-gap-2',
        vertical ? 'tw-inline-flex' : 'tw-flex',
        {
          'tw-justify-center tw-items-center tw-w-full tw-h-full tw-absolute tw-z-10 tw-bg-opacity-70 tw-bg-white':
            center,
        },
        { 'tw-flex-col': vertical },
        className,
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
  ) : null;
}
