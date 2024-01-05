import { isValidElement, memo, useCallback } from 'react';
import BaseTable, { BaseTableProps } from './base-table';
import Toolbar from '@/toolbar';

export * from './base-table';
export { BaseTable };

interface ITableProps<RecordType extends object = any>
  extends BaseTableProps<RecordType> {
  toolbar?: any;
}

function Table<RecordType extends object = any>({
  toolbar,
  ...props
}: ITableProps<RecordType>) {
  const showRenderToolbar = () => Boolean(toolbar);

  const renderToolbar = useCallback(() => {
    if (isValidElement(toolbar)) return toolbar;
    return <Toolbar {...toolbar} />;
  }, [toolbar]);

  return (
    <>
      {showRenderToolbar() && renderToolbar()}
      <BaseTable {...props} />
    </>
  );
}

export type TableProps<RecordType extends object = any> =
  ITableProps<RecordType>;

export default memo(Table);
