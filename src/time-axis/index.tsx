/* eslint-disable max-lines */
import { useEffect, useMemo, useRef, useState, CSSProperties } from 'react';
import { useMount, useSetState, useUnmount } from 'ahooks';
import clsx from 'clsx';
import dayjs from 'dayjs';
import styles from './time-axis.module.less';
import { useEvent } from '@/hooks';

/**
 * 完整的时间 - HH:mm:ss
 * @type {string}
 */
export const FULL_TIME = 'HH:mm:ss';

const GRADUATED_LINE_COLOR = '#fff';

const HOVER_LINE_COLOR = '#ecf3ff';

const CURRENT_TIME_LINE_COLOR = '#000';

// 一小时的毫秒数
const ONE_HOUR_STAMP = 3600000; // 60 * 60 * 1000;
// 时间分辨率
const ZOOM = [12, 24];

// 时间分辨率对应的时间显示判断条件
const ZOOM_DATE_SHOW_RULE = [
  (date: any) => {
    // 显示整点小时
    return date.getMinutes() === 0;
  },
  (date: any) => {
    // 显示整点小时
    return date.getMinutes() === 0;
  },
  (date: any) => {
    // 显示2、4、6...整点小时
    return date.getHours() % 2 === 0 && date.getMinutes() === 0;
  },
];

const X_AXIS_OFFSET = 20;

// 时间分辨率对应的每格小时数
const ZOOM_HOUR_GRID = [1, 1];

// Tooltip宽度
const TOOL_TIP_WIDTH = 350;

// 等级
export enum WARNING_LEVEL {
  SAFE = 'SAFE',
  WARNING = 'WARNING',
  DANGER = 'DANGER',
}

const SEGMENTS_COLOR_MAP = {
  [WARNING_LEVEL.DANGER]: '#e90000',
  [WARNING_LEVEL.WARNING]: '#f2b900',
  [WARNING_LEVEL.SAFE]: '#00a728',
};

const graduationTitle = (datetime: string | number) => {
  const time = dayjs(datetime);
  if (time.hour() === 0 && time.minute() === 0 && time.millisecond() === 0) {
    return time.format('MM-DD');
  } else {
    return time.format('HH');
  }
};

const drawTimeSegmentFillRect = (
  canvasContext: CanvasRenderingContext2D,
  startX: number,
  height: number,
  width: number,
) => {
  canvasContext.fillRect(startX, 0, width, height);
};

const getDevicePixelRatio = () => {
  return (
    window.devicePixelRatio ||
    window.webkitDevicePixelRatio ||
    window.mozDevicePixelRatio ||
    1
  );
};

interface ISegmentDataItem {
  name: string;
  id: string;
  type: string;
  enterTime: number;
  leaveTime: number;
  level: WARNING_LEVEL;
}
interface ISegmentItem {
  startTime: number;
  endTime: number;
  data: ISegmentDataItem[];
  level: WARNING_LEVEL;
}

interface ITimeAxisProps {
  backgroundColor?: CSSProperties['backgroundColor'];
  data?: ISegmentItem[];
  timeAxisDuration?: 12 | 24;
  height: CSSProperties['height'];
}

/**
 * 时间轴组件
 * @returns
 */
function TimeAxis({
  backgroundColor = '#9a9a9a',
  timeAxisDuration,
  data,
  height,
}: ITimeAxisProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [size, setSize] = useSetState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [canvasContext, setCanvasContext] = useState<
    CanvasRenderingContext2D | null | undefined
  >();

  // const [currentZoomIndex, _setCurrentZoomIndex] = useState(1);
  const currentZoomIndex = useMemo(() => {
    const zoomIndex = ZOOM.indexOf(timeAxisDuration ?? 24);
    return zoomIndex === -1 ? 1 : zoomIndex;
  }, [timeAxisDuration]);

  const [startTimestamp, setStartTimestamp] = useState(dayjs().valueOf());
  // 鼠标悬浮位置的x坐标
  const [mousemoveX, setMousemoveX] = useState(-1);

  const [toolTipTransform, setToolTipTransform] = useState<string>();

  const [hoveredTimeSegment, setHoveredTimeSegment] = useState<ISegmentItem>();

  const HOVER_LINE_AND_TIME_HEIGHT = size.height * 0.65;

  const CURRENT_TIME_LINE_MARKER_HEIGHT = size.height * 0.9;

  const dpr = useMemo(() => getDevicePixelRatio(), []);

  // 一共可以绘制的毫秒数
  const totalMS = useMemo(() => {
    return ZOOM[currentZoomIndex] * ONE_HOUR_STAMP;
  }, [currentZoomIndex]);

  // 一格多少毫秒，将每格代表的小时数转成毫秒数就可以了 一格（3600000）
  const msPerGrid = useMemo(() => {
    return ZOOM_HOUR_GRID[currentZoomIndex] * ONE_HOUR_STAMP;
  }, [currentZoomIndex]);

  /**
   * 计算偏移的毫秒数
   */
  const msOffset = useMemo(() => {
    return startTimestamp % msPerGrid;
  }, [startTimestamp, msPerGrid]);

  // 画布宽度减去左右偏移量
  const offsetWidth = useMemo(
    () => size.width - X_AXIS_OFFSET * 2,
    [size.width],
  );

  // 每毫秒对应的像素数 size.width / totalMS
  const pixelsPerMillisecond = useMemo(
    () => offsetWidth / totalMS,
    [offsetWidth, totalMS],
  );

  /**
   * 清除画布
   */
  const clearCanvas = useEvent((width, height) => {
    canvasContext?.clearRect(0, 0, width, height);
  });

  /**
   * 获取鼠标相对于容器的偏移量
   * @returns {Array<number>} 包含x和y坐标的数组
   */
  const getClientOffset = useEvent(e => {
    if (!containerRef.current || !e) {
      return [0, 0];
    }
    const { left, top } = containerRef.current.getBoundingClientRect();
    return [e.clientX - left, e.clientY - top];
  });

  /**
   * 通过设置画布大小和获取上下文来初始化 TimeAxis 组件
   */
  const init = useEvent(() => {
    const { width = 0, height = 0 } =
      containerRef.current?.getBoundingClientRect() ?? ({} as DOMRect);
    const canvasContext = canvasRef.current?.getContext('2d');
    const canvasWidth = width * dpr;
    setSize({
      width,
      height,
    });
    canvasRef.current && (canvasRef.current.width = canvasWidth);
    canvasRef.current && (canvasRef.current.height = height);
    canvasRef.current && (canvasRef.current.style.width = `${width}px`);
    canvasRef.current && (canvasRef.current.style.height = `${height}px`);
    setCanvasContext(canvasContext);
    canvasContext?.scale(dpr, 1);
  });

  /**
   * 绘制线段
   */
  const drawLine = useEvent((x1, y1, x2, y2, lineWidth = 1, color = '#fff') => {
    const context = canvasContext as CanvasRenderingContext2D;
    // 开始一段新路径
    context.beginPath();
    // 设置线段颜色
    context.strokeStyle = color;
    // 设置线段宽度
    context.lineWidth = lineWidth;
    // 将路径起点移到x1,y1
    context.moveTo(x1, y1);
    // 将路径移动到x2,y2
    context.lineTo(x2, y2);
    // 把路径画出来
    context.stroke();
  });

  /**
   * 绘制当前时间的竖线及时间
   * 计算出相对画布的位置，计算每小时的像素数，绘制实时的竖线及时间
   */
  const drawCurrentTimeLineMarker = useEvent((currentTimeX: number) => {
    const context = canvasContext as CanvasRenderingContext2D;
    const lineWidth = 2;
    drawLine(
      currentTimeX,
      0,
      currentTimeX,
      size.height,
      lineWidth,
      CURRENT_TIME_LINE_COLOR,
    );
    context.font =
      'bold 14px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"';
    context.fillStyle = '#fff';
    // 显示时间
    context.fillText(
      dayjs().format(FULL_TIME),
      currentTimeX - 28,
      CURRENT_TIME_LINE_MARKER_HEIGHT,
    );
  });

  /**
   * 绘制时间刻度
   */
  const drawGraduationLines = useEvent(() => {
    const context = canvasContext as CanvasRenderingContext2D;
    context.beginPath();
    // 一共可以绘制的格数 24 / 1
    const gridNum = ZOOM[currentZoomIndex] / ZOOM_HOUR_GRID[currentZoomIndex];
    // 每格间距，一格多少像素宽
    const pxPerGrid = offsetWidth / gridNum;
    context.font =
      '12px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"';

    for (let i = 0; i < gridNum + 1; i++) {
      // 横坐标就是当前索引乘每格宽度 右移20像素
      const x = i * pxPerGrid + X_AXIS_OFFSET;
      // 当前刻度的时间，时间轴起始时间加上当前格子数乘每格代表的毫秒数
      const graduationTime = startTimestamp + i * msPerGrid - msOffset;
      const date = new Date(graduationTime);
      let h = 0;
      // 0点显示日期
      if (date.getHours() === 0 && date.getMinutes() === 0) {
        h = size.height * 0.3;
        // 刻度线颜色
        context.fillStyle = GRADUATED_LINE_COLOR;
        // 显示时间
        context.fillText(graduationTitle(graduationTime), x - 13, h + 15);
        // 其他根据判断条件来显示
      } else if (ZOOM_DATE_SHOW_RULE[currentZoomIndex](date)) {
        // 刻度高度为时间轴高度的20%
        h = size.height * 0.2;
        // 刻度线颜色
        context.fillStyle = GRADUATED_LINE_COLOR;
        // 显示时间
        context.fillText(graduationTitle(graduationTime), x - 6, h + 15);
      } else {
        // 其他不显示时间
        h = size.height * 0.15;
      }
      drawLine(x, 0, x, h, 1, GRADUATED_LINE_COLOR);
    }
  });

  /**
   * 绘制时间轴, 包括时间段、时间刻度、当前时间线
   */
  const drawTimeAxis = useEvent(() => {
    // 计算出相对画布的位置，计算每小时的像素数，绘制实时的竖线及时间
    if (!canvasContext) return;
    // 计算当前时间在时间轴上的 x 坐标
    const currentTimeX =
      ((Date.now() - startTimestamp + msOffset) / totalMS) * offsetWidth +
      X_AXIS_OFFSET;
    // 注意顺序，顺序影响层级
    drawTimeSegments(currentTimeX);
    drawGraduationLines();
    drawCurrentTimeLineMarker(currentTimeX);
  });

  /**
   * 绘制时间段
   */
  const drawTimeSegments = useEvent((currentTimeX: number) => {
    const context = canvasContext as CanvasRenderingContext2D;
    // 清除画布
    clearCanvas(size.width, size.height);
    // 绘制时间段
    data?.forEach(segment => {
      if (
        segment.startTime <= startTimestamp + totalMS &&
        segment.endTime + msOffset >= startTimestamp
      ) {
        // 计算时间段的起始位置 添加20px的偏移量
        let segmentStartX =
          (segment.startTime - startTimestamp + msOffset) *
            pixelsPerMillisecond +
          X_AXIS_OFFSET;
        // console.group('segment');
        // console.log(segment.level);
        // console.log(dayjs(segment.startTime).format('YYYY-MM-DD HH:mm:ss'));
        // console.log(segment.startTime - startTimestamp + msOffset);
        // console.log((segment.startTime - startTimestamp + msOffset) * pixelsPerMillisecond);
        // console.groupEnd();
        // console.log('segmentStartX', segmentStartX);
        // 计算时间段的宽度
        let segmentWidth;
        // 如果时间段的起始位置小于偏移量（20），说明时间段的起始时间小于时间轴的起始时间，需要从20开始绘制
        if (segmentStartX < X_AXIS_OFFSET) {
          segmentStartX = X_AXIS_OFFSET;
          segmentWidth =
            (segment.endTime - startTimestamp + msOffset) *
            pixelsPerMillisecond;
        } else {
          segmentWidth =
            (segment.endTime - segment.startTime) * pixelsPerMillisecond;
        }
        context.fillStyle = SEGMENTS_COLOR_MAP[segment.level] || '#000';
        drawTimeSegmentFillRect(
          context,
          segmentStartX,
          size.height,
          segmentWidth,
        );
      }
    });

    // 绘制已过去时间添加蒙版
    context.fillStyle = 'rgba(255,255,255,0.6)';
    drawTimeSegmentFillRect(context, 0, size.height, currentTimeX);
  });

  /**
   * 显示鼠标悬浮的线和时间
   */
  const showHoverLineAndTime = useEvent((x, time, noDraw) => {
    if (canvasRef.current === null || !canvasContext) return;
    const context = canvasContext;
    if (!noDraw) {
      clearCanvas(size.width, size.height);
      drawTimeAxis();
    }
    drawLine(x, 0, x, size.height, 1, HOVER_LINE_COLOR);
    context.font =
      '14px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"';
    context.fillStyle = HOVER_LINE_COLOR;
    context.fillText(
      dayjs(time).format(FULL_TIME),
      x - 28,
      HOVER_LINE_AND_TIME_HEIGHT,
    );
  });

  const handleHoverTooltips = useEvent((clientX: number, time) => {
    const filtered = data?.filter(segment => {
      return segment.startTime <= time && segment.endTime >= time;
    });

    const hoveredTimeSegment = filtered?.[0] ?? ({} as ISegmentItem);
    setHoveredTimeSegment(hoveredTimeSegment);
    // 计算Tooltip的位置，如果鼠标悬浮位置加上Tooltip的宽度超过画布宽度，就将Tooltip向左移动
    const translateX =
      clientX + TOOL_TIP_WIDTH > size.width
        ? clientX - TOOL_TIP_WIDTH - 30
        : clientX + 30;

    // 获取页面高度
    const pageHeight =
      document.body.clientHeight || document.documentElement.clientHeight;
    // 获取tooltip高度
    const tooltipClientHeight = tooltipRef.current?.clientHeight ?? 0;
    const containerToPageTop =
      containerRef.current?.getBoundingClientRect()?.top ?? 0;
    // 获取容器顶部距离视口底部距离
    const containerToPageBottom = pageHeight - containerToPageTop;

    // 如果tooltip到窗口底部的距离小于tooltip的高度，就将tooltip向上移动
    const translateY =
      // eslint-disable-next-line no-nested-ternary
      tooltipClientHeight > pageHeight
        ? -containerToPageTop
        : tooltipClientHeight > containerToPageBottom
        ? -(tooltipClientHeight - containerToPageBottom)
        : 0;
    const tooltipTransform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    setToolTipTransform(tooltipTransform);
  });

  const handleMousemove = useEvent(event => {
    const clientX = getClientOffset(event)[0];
    setMousemoveX(clientX);
    // 计算鼠标悬浮位置的时间，时间偏移量加上鼠标悬浮位置除以每毫秒对应的像素数
    const time =
      startTimestamp -
      msOffset +
      (clientX - X_AXIS_OFFSET) / pixelsPerMillisecond;
    showHoverLineAndTime(clientX, time);
    handleHoverTooltips(clientX, time);
  });

  const handleMouseout = useEvent(() => {
    clearCanvas(size.width, size.height);
    drawTimeAxis();
  });
  const handleMouseleave = useEvent(() => {
    setMousemoveX(-1);
  });

  const handleResize = useEvent(() => {
    init();
    drawTimeAxis();
  });

  const updateTime = useEvent(time => {
    // eslint-disable-next-line no-param-reassign
    time = typeof time === 'number' ? time : new Date(time).getTime();
    setStartTimestamp(time);
    clearCanvas(size.width, size.height);
    drawTimeAxis();
    if (mousemoveX !== -1) {
      // 计算鼠标悬浮位置的时间，时间偏移量加上鼠标悬浮位置除以每毫秒对应的像素数
      const time =
        startTimestamp -
        msOffset +
        (mousemoveX - X_AXIS_OFFSET) / pixelsPerMillisecond;
      showHoverLineAndTime(mousemoveX, time, true);
    }
  });

  useEffect(() => {
    init();
    drawTimeAxis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasContext]);

  useEffect(() => {
    updateTime(Date.now());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useMount(() => {
    window.addEventListener('resize', handleResize);
    timerRef.current = setInterval(() => {
      updateTime(Date.now());
    }, 1000);
  });

  useUnmount(() => {
    window.removeEventListener('resize', handleResize);
    timerRef.current && clearInterval(timerRef.current);
  });

  return (
    <div
      className="tw-w-full tw-h-full tw-cursor-pointer tw-flex tw-flex-col tw-relative"
      style={{
        backgroundColor,
        height,
      }}
      ref={containerRef}
      onMouseMove={handleMousemove}
      onMouseOut={handleMouseout}
      onMouseLeave={handleMouseleave}
    >
      <canvas className="tw-flex-grow-0 tw-flex-shrink-0" ref={canvasRef} />
      {/* tooltip */}
      <div
        ref={tooltipRef}
        className="tw-absolute tw-left-0 tw-top-0 tw-bg-white tw-rounded tw-p-3"
        style={{
          display: hoveredTimeSegment?.level ? 'block' : 'none',
          visibility: mousemoveX !== -1 ? 'visible' : 'hidden',
          zIndex: 99999,
          boxShadow: 'rgba(0, 0, 0, 0.2) 1px 2px 10px',
          transform: toolTipTransform,
          transition:
            'opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, transform 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s',
          width: TOOL_TIP_WIDTH,
        }}
      >
        {hoveredTimeSegment?.data?.map(item => {
          return (
            <div
              key={JSON.stringify(item)}
              className={clsx([
                'tw-flex tw-flex-wrap',
                styles['time-axis-tooltip-item'],
              ])}
            >
              <div>
                <span>名称：</span>
                <span>{item.name}</span>
              </div>
              <div>
                <span>类别：</span>
                <span>{item.type}</span>
              </div>
              <div>
                <span>进入时间：</span>
                <span>{dayjs(item.enterTime).format(FULL_TIME)}</span>
              </div>
              <div>
                <span>离开时间：</span>
                <span>{dayjs(item.leaveTime).format(FULL_TIME)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TimeAxis;
