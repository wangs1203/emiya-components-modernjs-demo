import { useState, type ReactElement, useMemo, memo, useCallback } from 'react';
import { useUpdateEffect } from 'ahooks';
import { Button, Row } from 'antd';
import {
  DownOutlined,
  LineChartOutlined,
  ReloadOutlined,
  SearchOutlined,
  UpOutlined,
} from '@ant-design/icons';
import clsx from 'clsx';
import styles from './toolbar.modules.less';
import FieldControl from './field-control';
import { useEvent } from '@/hooks';

const MORE_FILTERS_LIMIT = 8;

interface IFilters {
  [key: string]: {
    label: string;
    component: ReactElement;
  };
}
interface IActions {
  search?: React.ReactElement;
  statistic?: React.ReactElement | null;
  reset?: React.ReactElement | null;
  [key: string]: ((...params: any[]) => void) | React.ReactNode;
}

export interface IToolbarProps {
  columns?: 3 | 4;
  filters: IFilters;
  actions?: IActions;
  values?: IBaseObject;
  onSearch?: (values?: IBaseObject) => void;
  onChange?: (values: IBaseObject | undefined, key: keyof IFilters) => void;
  onReset?: () => void;
  divider?: boolean;
  className?: string;
  showOpenMore?: boolean;
  queryType?: 'search' | 'statists';
}

function Toolbar({
  columns = 4,
  filters,
  actions,
  values,
  onSearch,
  onChange,
  onReset,
  divider,
  className,
  showOpenMore,
  queryType = 'search',
}: IToolbarProps) {
  const [openMore, setOpenMore] = useState(Boolean(showOpenMore));
  const [internalValues, setInternalValues] = useState(values);

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

  const searchBtnProps = useMemo(
    () =>
      queryType === 'statists'
        ? {
            icon: <LineChartOutlined />,
            title: '统计',
          }
        : {
            icon: <SearchOutlined />,
            title: '查询',
          },
    [queryType],
  );

  const handleSearch = useEvent(() => {
    onSearch?.(values);
  });

  const handleOpenMore = useCallback(() => {
    setOpenMore(openMore => !openMore);
  }, []);

  const handleFieldsValueChange = useCallback(
    (key: string) => {
      return (param: any) => {
        const value =
          param?.target && param?.target instanceof HTMLElement
            ? param?.target.value
            : param;
        onChange?.({ ...values, [key]: value }, key);
        if (values !== undefined) return;
        setInternalValues(prev => ({ ...prev, [key]: value }));
      };
    },
    [onChange, values],
  );

  const handleReset = useEvent(() => {
    onReset?.();
    setInternalValues(undefined);
  });

  useUpdateEffect(() => {
    setInternalValues(values);
  }, [values]);

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
              <FieldControl
                key={`filter-${key}${index}`}
                wrapperClassName={fieldControlWrapperClassName}
                name={key}
                label={filters[key].label}
                value={internalValues?.[key]}
                onChange={handleFieldsValueChange(key)}
              >
                {filters[key].component}
              </FieldControl>
            ))}
        </Row>

        <div className={styles['toolbar-search-bar-minor']}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {actions?.search ? (
            actions.search
          ) : onSearch ? (
            <Button type="primary" {...searchBtnProps} onClick={handleSearch} />
          ) : null}

          {/* eslint-disable-next-line no-nested-ternary */}
          {actions?.reset ? (
            actions.reset
          ) : onReset ? (
            <Button
              icon={<ReloadOutlined />}
              title="重置"
              onClick={handleReset}
            />
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
    </div>
  );
}

export default memo(Toolbar);
