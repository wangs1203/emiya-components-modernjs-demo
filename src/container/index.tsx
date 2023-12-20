import type { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './container.module.less';

export interface IContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  full?: boolean;
}

export default function Container({
  children,
  full,
  ...props
}: IContainerProps) {
  return (
    <div
      className={clsx([
        `tw-flex tw-flex-col tw-overflow-hidden tw-h-full${
          full ? ' tw-p-5' : ''
        }`,
        styles.container,
      ])}
      {...props}
    >
      {children}
    </div>
  );
}
