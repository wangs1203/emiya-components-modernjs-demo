import type { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './container.module.less';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  full?: boolean;
}

export default function Container({
  children,
  full,
  ...props
}: ContainerProps) {
  return (
    <div
      className={clsx([
        `flex flex-col overflow-hidden h-full${full ? ' p-5' : ''}`,
        styles.container,
      ])}
      {...props}
    >
      {children}
    </div>
  );
}
