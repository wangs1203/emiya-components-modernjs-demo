import React, {
  type PropsWithChildren,
  forwardRef,
  memo,
  useCallback,
  useMemo,
  isValidElement,
} from 'react';
import { Table as AntdTable } from 'antd';
import { useSearchParams } from 'react-router-dom';
import TableToolbar, { type TableToolbarProps } from '../toolbar/table-toolbar';
import BaseTable, {
  type AntdTableRef,
  type BaseTableProps,
} from './base-table';

const DEFAULT_PAGE_SIZE = 20;

const DEFAULT_PAGINATION: BaseTableProps<any[]>['pagination'] = {
  defaultPageSize: DEFAULT_PAGE_SIZE,
  showQuickJumper: true,
  showSizeChanger: true,
  pageSizeOptions: [10, 20, 30, 50, 100],
  showTotal: (total: number) => `共 ${total} 条`,
};

interface IURLParamTableProps<RecordType extends object = any>
  extends Omit<BaseTableProps<RecordType>, 'pagination'> {
  toolbar?: TableToolbarProps | React.ReactElement<TableToolbarProps>;
  pagingParams?: {
    page?: number;
    size?: number;
    total?: number;
  };
  onPaginationChange?: (
    params: Pick<
      Required<Required<IURLParamTableProps>['pagingParams']>,
      'page' | 'size'
    >,
  ) => void;
}

export type URLParamsTableProps<RecordType extends object = any> =
  IURLParamTableProps<RecordType>;

function InternalTable<RecordType extends object = any>(
  {
    toolbar,
    pagingParams,
    onPaginationChange,
    ...props
  }: URLParamsTableProps<RecordType>,
  ref: AntdTableRef,
) {
  const showRenderToolbar = useCallback(() => Boolean(toolbar), [toolbar]);
  const [, setSearchParams] = useSearchParams();

  const pagination = useMemo(() => {
    const { total, page: current, size: pageSize } = pagingParams ?? {};

    const onChange = (page: number, size: number) => {
      onPaginationChange?.({ page, size });
      setSearchParams(prev => {
        prev.set('page', page.toString());
        prev.set('size', size.toString());
        return prev;
      });
    };

    return {
      ...DEFAULT_PAGINATION,
      total,
      current,
      pageSize,
      onChange,
    };
  }, [pagingParams, onPaginationChange, setSearchParams]);

  const renderToolbar = useCallback(() => {
    if (isValidElement(toolbar)) return toolbar;
    return <TableToolbar {...(toolbar as TableToolbarProps)} />;
  }, [toolbar]);

  return (
    <>
      {showRenderToolbar() && renderToolbar()}
      <BaseTable {...props} ref={ref} pagination={pagination} />
    </>
  );
}

const URLParamsTable = memo(forwardRef(InternalTable)) as unknown as (<
  RecordType extends object = any,
>(
  props: PropsWithChildren<
    URLParamsTableProps<RecordType> & {
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

URLParamsTable.SELECTION_COLUMN = AntdTable.SELECTION_COLUMN;
URLParamsTable.EXPAND_COLUMN = AntdTable.EXPAND_COLUMN;
URLParamsTable.SELECTION_ALL = AntdTable.SELECTION_ALL;
URLParamsTable.SELECTION_INVERT = AntdTable.SELECTION_INVERT;
URLParamsTable.SELECTION_NONE = AntdTable.SELECTION_NONE;
URLParamsTable.Column = AntdTable.Column;
URLParamsTable.ColumnGroup = AntdTable.ColumnGroup;
URLParamsTable.Summary = AntdTable.Summary;

export default URLParamsTable;
