import {
  forwardRef,
  memo,
  ForwardRefExoticComponent,
  MemoExoticComponent,
  RefAttributes,
  Ref,
} from 'react';
import {
  DatePicker as AntdDatePicker,
  DatePickerProps as AntdDatePickerProps,
} from 'antd';
import dayjs, { ManipulateType } from 'dayjs';
import type { RangePickerProps as AntdRangePickerProps } from 'antd/es/date-picker';
import type {
  DatePickRef as AntdDatePickerRef,
  RangePickerRef as AntdRangePickerRef,
} from 'antd/es/date-picker/generatePicker/interface';
import clsx from 'clsx';

export enum TIME_VALUE {
  TODAY = 'TODAY',
  YESTERDAY = 'YESTERDAY',
  NEARLY_A_WEEK = 'NEARLY_A_WEEK',
  NEARLY_A_MONTH = 'NEARLY_A_MONTH',
}

const data = [
  {
    label: '今天',
    value: TIME_VALUE.TODAY,
  },
  {
    label: '昨天',
    value: TIME_VALUE.YESTERDAY,
  },
  {
    label: '最近 7 天',
    value: TIME_VALUE.NEARLY_A_WEEK,
  },
  {
    label: '最近 30 天',
    value: TIME_VALUE.NEARLY_A_MONTH,
  },
];

type DateValueManipulateType = [
  [number, ManipulateType],
  [number, ManipulateType],
];

const ENDING_TIME_MAPPING: Record<TIME_VALUE, DateValueManipulateType> = {
  [TIME_VALUE.TODAY]: [
    [0, 'd'],
    [0, 'd'],
  ],
  [TIME_VALUE.YESTERDAY]: [
    [1, 'd'],
    [1, 'd'],
  ],
  [TIME_VALUE.NEARLY_A_WEEK]: [
    [6, 'd'],
    [0, 'd'],
  ],
  [TIME_VALUE.NEARLY_A_MONTH]: [
    [29, 'd'],
    [0, 'd'],
  ],
};

// const EXCLUDE_ENDING_TIME_MAPPING: Record<
//   Exclude<TIME_VALUE, 'TODAY'>,
//   DateValueManipulateType
// > = {
//   [TIME_VALUE.YESTERDAY]: [
//     [1, 'd'],
//     [1, 'd'],
//   ],
//   [TIME_VALUE.NEARLY_A_WEEK]: [
//     [7, 'd'],
//     [1, 'd'],
//   ],
//   [TIME_VALUE.NEARLY_A_MONTH]: [
//     [1, 'M'],
//     [1, 'd'],
//   ],
// };

function arrToDate([start, end]: DateValueManipulateType): [
  dayjs.Dayjs,
  dayjs.Dayjs,
] {
  return [dayjs().subtract(...start), dayjs().subtract(...end)];
}

const DEFAULT_RANGE_PRESETS = data.map(({ label, value }) => ({
  label,
  value: arrToDate(ENDING_TIME_MAPPING[value]),
}));

// const DefaultExcludingDateRanges = data
//   .filter(
//     ({ value }) =>
//       !_.isNil(
//         EXCLUDE_ENDING_TIME_MAPPING?.[value as Exclude<TIME_VALUE, 'TODAY'>],
//       ),
//   )
//   .map(({ label, value }) => ({
//     label,
//     value: arrToDate(
//       EXCLUDE_ENDING_TIME_MAPPING[value as Exclude<TIME_VALUE, 'TODAY'>],
//     ),
//   }));

const DEFAULT_PRESETS = [
  { label: '昨天', value: dayjs().add(-1, 'd') },
  { label: '7 天前', value: dayjs().add(-7, 'd') },
  { label: '30 天前', value: dayjs().add(-1, 'month') },
];

interface IExtraProps {
  block?: boolean;
}

export type DatePickerProps = AntdDatePickerProps & IExtraProps;

interface ICompoundedComponent<DateType>
  extends MemoExoticComponent<
    ForwardRefExoticComponent<
      DatePickerProps & RefAttributes<AntdDatePickerRef<DateType>>
    >
  > {
  RangePicker: typeof DateRangePicker;
  MonthPicker: typeof MonthPicker;
}

const DatePicker = memo(
  forwardRef(function InternalDatePicker(
    {
      allowClear = true,
      block = true,
      className,
      presets = DEFAULT_PRESETS,
      ...props
    }: DatePickerProps,
    ref: AntdDatePickerRef<dayjs.Dayjs>,
  ) {
    return (
      <AntdDatePicker
        {...props}
        presets={presets}
        className={clsx([className, { 'tw-w-full': block }])}
        ref={ref}
        allowClear={allowClear}
      />
    );
  }),
) as ICompoundedComponent<dayjs.Dayjs>;

export type DateRangePickerProps = AntdRangePickerProps & IExtraProps;

const DateRangePicker = memo(
  forwardRef(function InternalDateRangePicker(
    {
      allowClear = true,
      block = true,
      className,
      presets = DEFAULT_RANGE_PRESETS as any,
      ...props
    }: DateRangePickerProps,
    ref: AntdRangePickerRef<dayjs.Dayjs>,
  ) {
    return (
      <AntdDatePicker.RangePicker
        {...props}
        presets={presets}
        className={clsx([className, { 'tw-w-full': block }])}
        ref={ref}
        allowClear={allowClear}
      />
    );
  }),
) as MemoExoticComponent<
  ForwardRefExoticComponent<
    DateRangePickerProps & RefAttributes<AntdRangePickerRef<dayjs.Dayjs>>
  >
>;

type MonthPickerProps = Omit<
  DateRangePickerProps | DatePickerProps,
  'picker'
> & {
  /** 区间 */
  range?: boolean;
};

const MonthPicker = memo(
  forwardRef(function InternalMonthPicker(
    { range = false, ...props }: MonthPickerProps,
    ref:
      | Ref<AntdDatePickerRef<dayjs.Dayjs>>
      | Ref<AntdRangePickerRef<dayjs.Dayjs>>,
  ) {
    if (range) {
      return (
        <DateRangePicker
          {...(props as DateRangePickerProps)}
          ref={ref as Ref<AntdRangePickerRef<dayjs.Dayjs>>}
          picker="month"
        />
      );
    }
    return (
      <DatePicker
        {...(props as DatePickerProps)}
        ref={ref as Ref<AntdDatePickerRef<dayjs.Dayjs>>}
        picker="month"
      />
    );
  }),
) as MemoExoticComponent<
  ForwardRefExoticComponent<
    MonthPickerProps &
      RefAttributes<
        | Ref<AntdDatePickerRef<dayjs.Dayjs>>
        | Ref<AntdRangePickerRef<dayjs.Dayjs>>
      >
  >
>;

DatePicker.RangePicker = DateRangePicker;
DatePicker.MonthPicker = MonthPicker;

export default DatePicker;
