import React from 'react';
import { Col } from 'antd';
import clsx from 'clsx';
import { useSearchParams } from 'react-router-dom';
import { difference } from '../utils';
import styles from './table-control.module.less';

export interface ITableControlAccepterProps<ValueType = any> {
  value?: ValueType;
  onChange?: (newValue: ValueType, e?: React.SyntheticEvent) => void;
  className?: string;
}

export interface ITableControlProps<
  V = string,
  P extends ITableControlAccepterProps<V> = ITableControlAccepterProps<V>,
> {
  name: string;
  label: string;
  defaultValue?: V | null;
  /**
   * 是否将形如数值的 value 自动转换为 number 类型
   * 默认为 true
   */
  castNumber?: boolean;
  children: React.ReactElement<P>;
  wrapperClassName?: string;
}

export type TableControlProps<
  V = string,
  P extends ITableControlAccepterProps<V> = ITableControlAccepterProps<V>,
> = ITableControlProps<V, P>;

/**
 * FormControl-like
 * 用于 Table Toolbar 的表单控件
 */
const TableControl = <
  V = string,
  P extends ITableControlAccepterProps<V> = ITableControlAccepterProps<V>,
>({
  name,
  label,
  defaultValue = null,
  castNumber = true,
  children,
  wrapperClassName,
}: TableControlProps<V, P>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramValue = searchParams.get(name);
  // eslint-disable-next-line no-nested-ternary
  const value = searchParams.has(name)
    ? castNumber && !isNaN(paramValue as any)
      ? Number(paramValue)
      : paramValue
    : defaultValue;

  const onChange = (newValue: any) => {
    const value =
      newValue?.target && newValue?.target instanceof HTMLElement
        ? newValue?.target.value
        : newValue;
    // 传出 null | undefined |空字符串 则表示清空筛选
    if (value === null || value === undefined || value === '') {
      searchParams.delete(name);
    } else {
      searchParams.set(name, value);
    }
    if (name !== 'page') {
      searchParams.delete('page');
    }
    setSearchParams(searchParams);
  };

  const Component = children.type as React.JSXElementConstructor<any> & {
    defaultProps: any;
  };

  return (
    <Col className={clsx(styles['table-control-container'], wrapperClassName)}>
      <div className={styles['table-control-label']}>{label}:</div>
      <div className={styles['table-control__wrapper']}>
        <Component
          value={value}
          onChange={onChange}
          {...difference(children.props, Component.defaultProps ?? {})}
          className={clsx(styles.control, children.props.className)}
        />
      </div>
    </Col>
  );
};

export default TableControl;
