import React, {
  type PropsWithChildren,
  useCallback,
  isValidElement,
  forwardRef,
  memo,
  useMemo,
} from 'react';
import { Table as AntdTable } from 'antd';
import Toolbar, { type IToolbarProps } from '../toolbar';
import BaseTable, {
  type BaseTableProps,
  type AntdTableRef,
} from './base-table';

export type {
  ColumnProps,
  ColumnGroupType,
  ColumnType,
  ColumnsType,
  TablePaginationConfig,
} from 'antd/es/table';

export * from './base-table';
export { BaseTable };

const DEFAULT_PAGE_SIZE = 20;

const DEFAULT_PAGINATION: BaseTableProps<any[]>['pagination'] = {
  defaultPageSize: DEFAULT_PAGE_SIZE,
  showQuickJumper: true,
  showSizeChanger: true,
  pageSizeOptions: [10, 20, 30, 50, 100],
  showTotal: (total: number) => `共 ${total} 条`,
};

interface ITableProps<RecordType extends object = any>
  extends Omit<BaseTableProps<RecordType>, 'pagination'> {
  toolbar?: IToolbarProps;
  pagingParams?: {
    page?: number;
    size?: number;
    total?: number;
  };
  onPaginationChange?: (
    params: Pick<
      Required<Required<ITableProps>['pagingParams']>,
      'page' | 'size'
    >,
  ) => void;
}

export type TableProps<RecordType extends object = any> =
  ITableProps<RecordType>;

function InternalTable<RecordType extends object = any>(
  {
    toolbar,
    pagingParams,
    onPaginationChange,
    ...props
  }: ITableProps<RecordType>,
  ref: AntdTableRef,
) {
  const showRenderToolbar = useCallback(() => Boolean(toolbar), [toolbar]);

  const pagination = useMemo(() => {
    const { total, page: current, size: pageSize } = pagingParams ?? {};

    const onChange = (page: number, pageSize: number) =>
      onPaginationChange?.({ page, size: pageSize });

    return {
      ...DEFAULT_PAGINATION,
      total,
      current,
      pageSize,
      onChange,
    };
  }, [pagingParams, onPaginationChange]);

  const renderToolbar = useCallback(() => {
    if (isValidElement(toolbar)) return toolbar;
    return <Toolbar {...(toolbar as IToolbarProps)} />;
  }, [toolbar]);

  return (
    <>
      {showRenderToolbar() && renderToolbar()}
      <BaseTable {...props} ref={ref} pagination={pagination} />
    </>
  );
}

const Table = memo(forwardRef(InternalTable)) as unknown as (<
  RecordType extends object = any,
>(
  props: PropsWithChildren<
    ITableProps<RecordType> & {
      ref?: AntdTableRef;
    }
  >,
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
