import React, {
  type PropsWithChildren,
  isValidElement,
  forwardRef,
  memo,
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

interface ITableProps<RecordType extends object = any>
  extends BaseTableProps<RecordType> {
  toolbar?: IToolbarProps;
}

export type TableProps<RecordType extends object = any> =
  ITableProps<RecordType>;

function InternalTable<RecordType extends object = any>(
  { toolbar, ...props }: ITableProps<RecordType>,
  ref: AntdTableRef,
) {
  const showRenderToolbar = () => Boolean(toolbar);

  const renderToolbar = React.useCallback(() => {
    if (isValidElement(toolbar)) return toolbar;
    return <Toolbar {...(toolbar as IToolbarProps)} />;
  }, [toolbar]);

  return (
    <>
      {showRenderToolbar() && renderToolbar()}
      <BaseTable {...props} ref={ref} />
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
