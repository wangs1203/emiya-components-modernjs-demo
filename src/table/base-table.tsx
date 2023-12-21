import type { HTMLAttributes, Ref } from 'react';
import type { TableProps as AntdTableProps } from 'antd';
import { forwardRef, memo, useMemo } from 'react';
import { Table as AntdTable, theme } from 'antd';
// import { merge } from 'lodash';
import clsx from 'clsx';
import styles from './base-table.module.less';

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

export interface ITableProps<T> extends Omit<AntdTableProps<T>, 'dataSource'> {
  wrapProps?: HTMLAttributes<HTMLDivElement>;
  data: T[] | undefined;
}

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
  }: ITableProps<T>,
  ref: Ref<HTMLDivElement>,
) {
  // const [wrapperRef, wrapperSize] = useTableWrapperRef<HTMLDivElement>(
  //   Boolean(pagination),
  // );
  // const tableScroll = useMemo(
  //   () => merge({}, wrapperSize, scroll),
  //   [scroll, wrapperSize],
  // );
  const { token } = useToken();
  const styleMerged = useMemo(() => {
    const internalStyle = {
      flex: 1,
      '--primary-color': token.colorPrimary,
      '--disable-bg-color': token.colorBgContainerDisabled,
    };
    return wrapProps?.style
      ? { ...wrapProps.style, ...internalStyle }
      : internalStyle;
  }, [wrapProps?.style, token.colorPrimary, token.colorBgContainerDisabled]);

  const internalRowSelection = useMemo(
    () => (rowSelection ? { ...rowSelection, fixed: true } : undefined),
    [rowSelection],
  );

  const internalLoading = useMemo(
    () =>
      loading === true
        ? {
            tip: '加载中...',
          }
        : loading,
    [loading],
  );

  const dataSource = data ?? [];

  return (
    <div
      {...wrapProps}
      // ref={wrapperRef}
      className={clsx(['tw-min-h-0', styles['base-table-wrapper']])}
      style={styleMerged}
    >
      <AntdTable
        ref={ref}
        size={size}
        rowKey={rowKey}
        dataSource={dataSource}
        pagination={pagination}
        // scroll={tableScroll}
        bordered={bordered}
        rowSelection={internalRowSelection}
        loading={internalLoading}
        {...props}
      />
    </div>
  );
}

const Table = memo(forwardRef(InternalBaseTable)) as unknown as (<
  RecordType extends object = any,
>(
  props: React.PropsWithChildren<ITableProps<RecordType>> & {
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
