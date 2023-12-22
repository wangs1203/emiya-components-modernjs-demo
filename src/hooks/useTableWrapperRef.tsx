import { RefObject, useRef } from 'react';
import useTableScroll from './useTableScroll';

const useTableWrapperRef = <T extends HTMLElement | null = HTMLElement>(
  withPagination = true,
  initialValue?: Parameters<typeof useTableScroll>[2],
): [RefObject<T>, Parameters<typeof useTableScroll>[2]] => {
  const tableWrapperRef = useRef<T>(null);
  const scroll = useTableScroll(tableWrapperRef, withPagination, initialValue);
  return [
    tableWrapperRef,
    // scrollX 需减去纵向（Y轴）滚动条宽度
    { ...scroll, x: scroll?.x ? scroll?.x - 18 : scroll?.x },
  ];
};

export default useTableWrapperRef;
