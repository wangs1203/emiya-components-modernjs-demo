import { memo, forwardRef } from 'react';
import { Select as AntdSelect, SelectProps as AntdSelectProps } from 'antd';
import clsx from 'clsx';
import type { PropsWithChildren, ReactElement, ReactNode, Ref } from 'react';
import type {
  BaseOptionType,
  DefaultOptionType as AntdDefaultOptionType,
  RefSelectProps,
} from 'antd/es/select';

export type DefaultSelectOptionType = {
  name: ReactNode;
  id: string | number;
  children?: Omit<DefaultSelectOptionType, 'children'>[];
};

export interface SelectProps<
  ValueType,
  OptionType extends
    | BaseOptionType
    | AntdDefaultOptionType = DefaultSelectOptionType,
> extends AntdSelectProps<ValueType, OptionType> {
  block?: boolean;
}

function InternalSelect<
  ValueType = any,
  OptionType extends
    | BaseOptionType
    | AntdDefaultOptionType = DefaultSelectOptionType,
>(
  {
    fieldNames = { label: 'name', value: 'id' },
    allowClear = true,
    placeholder = '请选择',
    className,
    block = false,
    // notFoundContent = '暂无数据',
    size = 'middle',
    optionFilterProp = 'children',
    ...props
  }: SelectProps<ValueType, OptionType>,
  ref: Ref<RefSelectProps>,
) {
  const classNames = block ? clsx('w-full', className) : className;
  return (
    <AntdSelect
      {...props}
      ref={ref}
      className={classNames}
      allowClear={allowClear}
      placeholder={placeholder}
      // notFoundContent={notFoundContent}
      size={size}
      optionFilterProp={optionFilterProp}
      fieldNames={fieldNames}
    />
  );
}

const Select = memo(forwardRef(InternalSelect)) as unknown as (<
  ValueType = any,
  OptionType extends
    | BaseOptionType
    | AntdDefaultOptionType = DefaultSelectOptionType,
>(
  props: PropsWithChildren<
    SelectProps<ValueType, OptionType> & { ref?: Ref<RefSelectProps> }
  >,
) => ReactElement) & {
  Option: typeof AntdSelect.Option;
  OptGroup: typeof AntdSelect.OptGroup;
};

Select.OptGroup = AntdSelect.OptGroup;
Select.Option = AntdSelect.Option;

export default Select;
