import { MutableRefObject, useState, useLayoutEffect } from 'react';
import { __DEBUG__ } from '@/constants/config';

/**
 * DOM 元素大小变化监听hook
 * @param ele
 * @returns [width, height]
 */
export const useResizeObserver = (
  ele: HTMLElement | MutableRefObject<HTMLElement | null>,
) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useLayoutEffect(() => {
    const targetOb = new ResizeObserver(e => {
      setWidth(e?.[0]?.contentRect.width);
      setHeight(e?.[0]?.contentRect.height);
    });
    const element =
      // eslint-disable-next-line no-nested-ternary
      ele instanceof window.HTMLElement
        ? ele
        : ele.current instanceof window.HTMLElement
        ? ele.current
        : null;

    element && targetOb.observe(element);
    return () => {
      element && targetOb.disconnect();
    };
  }, [ele]);

  return [width, height];
};

/**
 * 获取dom元素大小
 * @param ele
 * @param outer
 * @returns
 */
const getEleSize = (ele: HTMLElement, outer: boolean) => {
  if (outer && ele instanceof window.Element) {
    const { marginLeft, marginRight, marginTop, marginBottom } =
      window.getComputedStyle(ele);
    const marginX =
      parseFloat(marginLeft || '0') + parseFloat(marginRight || '0');
    const marginY =
      parseFloat(marginTop || '0') + parseFloat(marginBottom || '0');
    return {
      width: ele.offsetWidth + marginX,
      height: ele.offsetHeight + marginY,
    };
  }
  return { width: ele.offsetWidth, height: ele.offsetHeight };
};

/**
 * Table 滚动条 x/y 大小
 * @param ele
 * @param tableWidth
 * @param tableHeight
 * @param withPagination
 * @returns
 */
const getScroll = (
  ele: HTMLElement,
  tableWidth: number,
  tableHeight: number,
  withPagination: boolean,
) => {
  const scrollX = tableWidth;
  let scrollY = tableHeight;
  const antdThead = ele.querySelector('.ant-table-header') as HTMLElement;
  if (antdThead) {
    const { height } = getEleSize(antdThead, true);
    scrollY -= height;
  } else {
    __DEBUG__ && console.warn('cannot fund antdThead');
  }
  // const antdPagination = ele.querySelector('.ant-pagination') as HTMLElement;
  // if (antdPagination) {
  //   const { height } = getEleSize(antdPagination, true);
  //   // 分页组件上下边距过高，只减去一个边距的值
  //   scrollY = scrollY - height + 16;
  // } else {
  //   __DEBUG__ && withPagination && console.warn('cannot find antdPagination');
  // }
  // 比计算值缩小2，避免溢出
  return { x: scrollX - 2, y: withPagination ? scrollY - 2 : scrollY };
};

/**
 * Table 滚动条hook
 * @param ref
 * @param initialValue
 * @returns
 */
const useTableScroll = (
  ref: Parameters<typeof useResizeObserver>[0],
  withPagination = true,
  initialValue?: { x?: number; y?: number },
) => {
  const [width, height] = useResizeObserver(ref);
  const [result, setResult] = useState<{ x?: number; y?: number }>(
    initialValue ?? { y: 200 },
  );

  useLayoutEffect(() => {
    const element =
      // eslint-disable-next-line no-nested-ternary
      ref instanceof window.HTMLElement
        ? ref
        : ref?.current instanceof window.HTMLElement
        ? ref.current
        : null;
    if (element) setResult(getScroll(element, width, height, withPagination));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, withPagination]);

  return result;
};

export default useTableScroll;
