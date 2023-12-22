import clsx from 'clsx';
import styles from './global-loader.module.less';

interface IGlobalLoaderProps {
  type?: 'line' | 'circle';
}

export default function GlobalLoader({ type = 'line' }: IGlobalLoaderProps) {
  if (type === 'line') return <GlobalLoaderLine />;
  return <GlobalLoaderCircle />;
}

export function GlobalLoaderLine() {
  return (
    <div
      className={clsx([
        styles['global-loading-line'],
        'tw-box-border tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full',
      ])}
    >
      <div className={styles['line-scale']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
export function GlobalLoaderCircle() {
  return (
    <div
      className={clsx([
        styles['global-loading-circle'],
        'tw-flex tw-justify-center tw-items-center tw-absolute tw-w-full tw-h-screen tw-top-0 tw-bottom-0 tw-left-0 tw-right-0 tw-m-auto tw-text-center',
      ])}
    >
      <div className={styles['tb-bounce1']}></div>
      <div className={styles['tb-bounce2']}></div>
      <div className={styles['tb-bounce3']}></div>
    </div>
  );
}
