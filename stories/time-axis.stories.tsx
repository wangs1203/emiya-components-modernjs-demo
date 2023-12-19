import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import { TimeAxis, WARNING_LEVEL } from '../src';

const TIME_AXIS_MOCK = [
  {
    startTime: dayjs().subtract(30, 'minute').valueOf(),
    endTime: dayjs().valueOf(),
    data: [
      {
        id: 'hash11',
        name: 'js',
        type: 'ld',
        enterTime: dayjs().subtract(30, 'minute').valueOf(),
        leaveTime: dayjs().valueOf(),
        level: WARNING_LEVEL.SAFE,
      },
    ],
    level: WARNING_LEVEL.SAFE,
  },
  {
    startTime: dayjs().valueOf(),
    endTime: dayjs().add(4, 'hour').valueOf(),
    data: [
      {
        id: 'hash21',
        name: 'css',
        type: 'ld',
        enterTime: dayjs().valueOf(),
        leaveTime: dayjs().add(4, 'hour').valueOf(),
        level: WARNING_LEVEL.DANGER,
      },
    ],
    level: WARNING_LEVEL.DANGER,
  },
  {
    startTime: dayjs().add(4, 'hour').valueOf(),
    endTime: dayjs().add(4, 'hour').valueOf() + 600000,
    data: [
      {
        id: 'hash31',
        name: 'html',
        type: 'dz',
        enterTime: dayjs().add(4, 'hour').valueOf(),
        leaveTime: dayjs().add(4, 'hour').valueOf() + 600000,
        level: WARNING_LEVEL.SAFE,
      },
    ],
    level: WARNING_LEVEL.SAFE,
  },
  {
    startTime: dayjs().add(6, 'hour').valueOf(),
    endTime: dayjs().add(8, 'hour').valueOf(),
    data: [
      {
        id: 'hash41',
        name: 'docker',
        type: 'dz',
        enterTime: dayjs().add(6, 'hour').valueOf(),
        leaveTime: dayjs().add(8, 'hour').valueOf(),
        level: WARNING_LEVEL.SAFE,
      },
    ],
    level: WARNING_LEVEL.SAFE,
  },
  {
    startTime: dayjs().add(10, 'hour').valueOf(),
    endTime: dayjs().add(12, 'hour').valueOf(),
    data: [
      {
        id: 'hash51',
        name: 'java',
        type: 'dz',
        enterTime: dayjs().add(10, 'hour').valueOf(),
        leaveTime: dayjs().add(12, 'hour').valueOf(),
        level: WARNING_LEVEL.DANGER,
      },
      {
        id: 'hash52',
        name: 'typescript',
        type: 'dz',
        enterTime: dayjs().add(10, 'hour').valueOf(),
        leaveTime: dayjs().add(12, 'hour').valueOf(),
        level: WARNING_LEVEL.DANGER,
      },
    ],
    level: WARNING_LEVEL.DANGER,
  },
  {
    startTime: dayjs().add(14, 'hour').valueOf(),
    endTime: dayjs().add(16, 'hour').valueOf(),
    data: [
      {
        id: 'hash61',
        name: 'rust',
        type: 'dz',
        enterTime: dayjs().add(14, 'hour').valueOf(),
        leaveTime: dayjs().add(16, 'hour').valueOf(),
        level: WARNING_LEVEL.WARNING,
      },
    ],
    level: WARNING_LEVEL.WARNING,
  },
  {
    startTime: dayjs().add(18, 'hour').valueOf(),
    endTime: dayjs().add(20, 'hour').valueOf(),
    data: [
      {
        id: 'hash71',
        name: 'go',
        type: 'dz',
        enterTime: dayjs().add(18, 'hour').valueOf(),
        leaveTime: dayjs().add(20, 'hour').valueOf(),
        level: WARNING_LEVEL.WARNING,
      },
      {
        id: 'hash72',
        name: 'python',
        type: 'dz',
        enterTime: dayjs().add(18, 'hour').valueOf(),
        leaveTime: dayjs().add(20, 'hour').valueOf(),
        level: WARNING_LEVEL.DANGER,
      },
      {
        id: 'hash73',
        name: 'c++',
        type: 'gx',
        enterTime: dayjs().add(18, 'hour').valueOf(),
        leaveTime: dayjs().add(19, 'hour').valueOf(),
        level: WARNING_LEVEL.DANGER,
      },
    ],
    level: WARNING_LEVEL.DANGER,
  },
];

const storyMeta: Meta<typeof TimeAxis> = {
  title: 'Emiya Components/TimeAxis',
  component: TimeAxis,
  argTypes: {
    data: { control: 'object' },
    backgroundColor: { control: 'color' },
    timeAxisDuration: { control: 'number' },
    height: { control: 'number' },
  },
  args: {
    data: TIME_AXIS_MOCK,
    backgroundColor: '#9a9a9a',
    timeAxisDuration: 24,
    height: 70,
  },
};
export default storyMeta;

type Story = StoryObj<typeof TimeAxis>;

export const Default: Story = {};
