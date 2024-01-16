import { type ReactNode, memo, Fragment } from 'react';
import { isFunction } from 'lodash';
import { Button } from 'antd';
import styles from './toolbar.module.less';

const ACTIONS_LABEL_MAP: IBaseObject<string> = {
  insert: '新增',
  delete: '删除',
  batchDelete: '批量删除',
};

export interface IActions {
  search?: React.ReactElement;
  statistic?: React.ReactElement | null;
  reset?: React.ReactElement | null;
  [key: string]: ((...params: any[]) => void) | React.ReactNode;
}

export interface IActionBarProps {
  actions?: IActions;
}

function ActionBar({ actions }: IActionBarProps) {
  if (!actions) return null;

  const internalActionKeys = Object.getOwnPropertyNames(actions ?? {}).filter(
    key => !['search', 'reset'].includes(key),
  );

  return internalActionKeys.length ? (
    <div className={styles['toolbar-action-bar']}>
      {internalActionKeys.map((key: string, index: number) => {
        if (isFunction(actions[key])) {
          const element = (
            <Button
              type={
                ['delete', 'batchDelete'].includes(key) ? undefined : 'primary'
              }
              title={ACTIONS_LABEL_MAP[key]}
              onClick={actions[key] as (...params: any[]) => void}
            >
              {ACTIONS_LABEL_MAP[key]}
            </Button>
          );
          return <Fragment key={`action-${key}-${index}`}>{element}</Fragment>;
        }
        return (
          <Fragment key={`action-${key}-${index}`}>
            {actions[key] as ReactNode}
          </Fragment>
        );
      })}
    </div>
  ) : null;
}

export default memo(ActionBar);
