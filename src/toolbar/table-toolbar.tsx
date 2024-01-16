import { useState, type ReactElement, useMemo, memo, useCallback } from 'react';
import { Button, Row } from 'antd';
import { DownOutlined, ReloadOutlined, UpOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import TableControl from './table-control';
import styles from './toolbar.module.less';
import ActionBar, { IActionBarProps } from './action-bar';

export * from './table-control';

const MORE_FILTERS_LIMIT = 8;

interface IFilters {
  [key: string]: {
    label: string;
    component: ReactElement;
  };
}

export interface ITableToolbarProps {
  columns?: 3 | 4;
  filters: IFilters;
  actions?: IActionBarProps['actions'];
  values?: IBaseObject;
  onReset?: () => void;
  divider?: boolean;
  className?: string;
  showOpenMore?: boolean;
  initialValues?: IBaseObject;
}
export type TableToolbarProps = ITableToolbarProps;

function TableToolbar({
  columns = 4,
  filters,
  actions,
  onReset,
  divider,
  className,
  showOpenMore,
}: TableToolbarProps) {
  const [openMore, setOpenMore] = useState(Boolean(showOpenMore));

  const filterKeys = useMemo(
    () => Object.getOwnPropertyNames(filters ?? {}),
    [filters],
  );

  const shouldShowOpenMore = useMemo(() => {
    const overLimit =
      columns === 4
        ? filterKeys.length > MORE_FILTERS_LIMIT
        : filterKeys.length > 6;
    return showOpenMore ? showOpenMore && overLimit : overLimit;
  }, [filterKeys.length, showOpenMore, columns]);

  const showFilterKeys = useMemo(() => {
    if (openMore) return filterKeys;
    if (columns === 3)
      return filterKeys.length > 6 ? filterKeys.slice(0, 6) : filterKeys;

    return filterKeys.length > MORE_FILTERS_LIMIT
      ? filterKeys.slice(0, MORE_FILTERS_LIMIT)
      : filterKeys;
  }, [columns, filterKeys, openMore]);

  const fieldControlWrapperClassName = useMemo(
    () => (columns === 3 ? 'columns-3' : ''),
    [columns],
  );

  const handleOpenMore = useCallback(() => {
    setOpenMore(openMore => !openMore);
  }, []);

  return (
    <div
      className={clsx([
        styles['toolbar-container'],
        className,
        { [styles.spacing]: !actions },
      ])}
    >
      <div
        className={clsx([
          styles['toolbar-search-bar'],
          { [styles.divider]: divider },
        ])}
      >
        <Row className={styles['toolbar-search-bar-primary']} align="top">
          {Boolean(filters) &&
            showFilterKeys.map((key, index) => (
              <TableControl
                key={`filter-${key}${index}`}
                wrapperClassName={fieldControlWrapperClassName}
                name={key}
                label={filters[key].label}
              >
                {filters[key].component}
              </TableControl>
            ))}
        </Row>

        <div className={styles['toolbar-search-bar-minor']}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {actions?.reset ? (
            actions.reset
          ) : onReset ? (
            <Button icon={<ReloadOutlined />} title="重置" onClick={onReset} />
          ) : null}

          <div
            className={clsx(styles['open-more'], {
              'tw-invisible': !shouldShowOpenMore,
            })}
          >
            <div onClick={handleOpenMore}>
              {openMore ? '收起' : '更多'}
              {openMore ? <UpOutlined /> : <DownOutlined />}
            </div>
          </div>
        </div>
      </div>
      <ActionBar actions={actions} />
    </div>
  );
}

TableToolbar.ActionsBar = ActionBar;
TableToolbar.TableControl = TableControl;

export default memo(TableToolbar);
