import type { HTMLAttributes, Ref } from 'react';
import type { TableProps as AntdTableProps, PaginationProps } from 'antd';
import { forwardRef, memo, useMemo } from 'react';
import { Table as AntdTable, theme, Pagination } from 'antd';
import { merge } from 'lodash';
import clsx from 'clsx';
import BaseLoader from '../base-loader';
import styles from './base-table.module.less';
import { useTableWrapperRef } from '@/hooks';

const { useToken } = theme;

export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_PAGE_KEY = 'page';
export const DEFAULT_PAGE_SIZE_KEY = 'size';

export const DEFAULT_PAGINATION: AntdTableProps<any[]>['pagination'] = {
  defaultPageSize: DEFAULT_PAGE_SIZE,
  showQuickJumper: true,
  showSizeChanger: true,
  pageSizeOptions: [10, 20, 30, 50, 100],
  showTotal: (total: number) => `共 ${total} 条`,
};

interface IBaseTableProps<T>
  extends Omit<AntdTableProps<T>, 'dataSource' | 'loading'> {
  wrapProps?: HTMLAttributes<HTMLDivElement>;
  data: T[] | undefined;
  loading?: boolean;
}

export type BaseTableProps<RecordType extends object = any> =
  IBaseTableProps<RecordType>;

function InternalBaseTable<T extends IBaseObject = any>(
  {
    data,
    wrapProps,
    size = 'small',
    rowKey = 'id',
    pagination = DEFAULT_PAGINATION,
    bordered = true,
    scroll,
    rowSelection,
    loading,
    ...props
  }: IBaseTableProps<T>,
  ref: Ref<HTMLDivElement>,
) {
  const [wrapperRef, wrapperSize] = useTableWrapperRef<HTMLDivElement>(
    Boolean(pagination),
  );
  const tableScroll = useMemo(
    () => merge({}, wrapperSize, scroll),
    [scroll, wrapperSize],
  );

  const { token } = useToken();

  const styleMerged = useMemo(() => {
    const internalStyle = {
      flex: 1,
      '--primary-color': token.colorPrimary,
      '--disable-bg-color': token.colorBgContainerDisabled,
      '--scroll-height': `${tableScroll.y}px`,
    };
    return wrapProps?.style
      ? { ...wrapProps.style, ...internalStyle }
      : internalStyle;
  }, [
    wrapProps?.style,
    token.colorPrimary,
    token.colorBgContainerDisabled,
    tableScroll.y,
  ]);

  const internalRowSelection = useMemo(
    () => (rowSelection ? { ...rowSelection, fixed: true } : undefined),
    [rowSelection],
  );

  const paginationSize = useMemo(
    () =>
      (['large', 'middle'].includes(size)
        ? 'default'
        : size) as PaginationProps['size'],
    [size],
  );

  const dataSource = data ?? [];

  return (
    <div className="tw-flex tw-flex-col tw-flex-1 tw-min-h-0 tw-h-full tw-relative">
      <BaseLoader spinning={loading} center />
      <div
        {...wrapProps}
        ref={wrapperRef}
        className={clsx([
          'tw-min-h-0',
          styles['base-table-wrapper'],
          { [styles.empty]: dataSource.length === 0 },
        ])}
        style={styleMerged}
      >
        <AntdTable
          ref={ref}
          size={size}
          rowKey={rowKey}
          dataSource={dataSource}
          scroll={tableScroll}
          bordered={bordered}
          rowSelection={internalRowSelection}
          pagination={false}
          // pagination={pagination}
          // loading={internalLoading}
          {...props}
        />
      </div>
      {(pagination as any)?.current && (
        <Pagination
          className={clsx(
            'tw-flex tw-justify-end tw-flex-wrap tw-gap-y-2',
            paginationSize === 'small' ? '!tw-my-2' : '!tw-my-4',
          )}
          size={paginationSize}
          showSizeChanger
          showQuickJumper
          {...pagination}
        />
      )}
    </div>
  );
}

const Table = memo(forwardRef(InternalBaseTable)) as unknown as (<
  RecordType extends object = any,
>(
  props: React.PropsWithChildren<IBaseTableProps<RecordType>> & {
    ref?: React.Ref<HTMLDivElement>;
  },
) => React.ReactElement) & {
  SELECTION_COLUMN: typeof AntdTable.SELECTION_COLUMN;
  EXPAND_COLUMN: typeof AntdTable.EXPAND_COLUMN;
  SELECTION_ALL: typeof AntdTable.SELECTION_ALL;
  SELECTION_INVERT: typeof AntdTable.SELECTION_INVERT;
  SELECTION_NONE: typeof AntdTable.SELECTION_NONE;
  Column: typeof AntdTable.Column;
  ColumnGroup: typeof AntdTable.ColumnGroup;
  Summary: typeof AntdTable.Summary;
};

Table.SELECTION_COLUMN = AntdTable.SELECTION_COLUMN;
Table.EXPAND_COLUMN = AntdTable.EXPAND_COLUMN;
Table.SELECTION_ALL = AntdTable.SELECTION_ALL;
Table.SELECTION_INVERT = AntdTable.SELECTION_INVERT;
Table.SELECTION_NONE = AntdTable.SELECTION_NONE;
Table.Column = AntdTable.Column;
Table.ColumnGroup = AntdTable.ColumnGroup;
Table.Summary = AntdTable.Summary;

export default Table;
