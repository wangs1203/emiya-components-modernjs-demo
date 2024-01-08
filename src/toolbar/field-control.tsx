import clsx from 'clsx';
import { Col } from 'antd';
import styles from './field-control.module.less';
import { difference } from '@/utils';
import { useEvent } from '@/hooks';

interface IFieldControlProps {
  children: React.ReactElement;
  onChange: (...args: any[]) => void;
  value?: any;
  name: string;
  label: string;
  wrapperClassName?: string;
}

export default function FieldControl({
  value,
  onChange,
  label,
  children,
  wrapperClassName,
}: IFieldControlProps) {
  const Component = children.type as React.JSXElementConstructor<any> & {
    defaultProps: any;
  };
  const handleFieldValueChange = useEvent((newValue, ...rest) => {
    onChange(newValue, ...rest);
  });
  return (
    <Col className={clsx(styles['field-control-container'], wrapperClassName)}>
      <div className={styles['field-label']}>{label}:</div>
      <div className={styles['field-control__wrapper']}>
        <Component
          {...difference(children.props, Component.defaultProps ?? {})}
          className={clsx(styles['field-control'], children.props.className)}
          value={value}
          onChange={handleFieldValueChange}
        />
      </div>
    </Col>
  );
}
