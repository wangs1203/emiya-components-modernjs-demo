import type { Preview, StoryContext } from '@storybook/react';
import React from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, theme } from 'antd';
import zh_CN from 'antd/locale/zh_CN';
import zh_TW from 'antd/locale/zh_TW';
import ja_JP from 'antd/locale/ja_JP';
import ko_KR from 'antd/locale/ko_KR';
import en_US from 'antd/locale/en_US';
import '../src/index.css';
import './index.css';

const switchMode = (theme: 'light' | 'dark') => {
  const body = document.body;
  body.setAttribute('theme-mode', theme);
};

const getLocale = code => {
  let language = {
    zh_CN,
    zh_TW,
    ja_JP,
    ko_KR,
    en_US,
  };

  return language[code];
};

const themeMap = {
  light: theme.defaultAlgorithm,
  dark: theme.darkAlgorithm,
};

export const globalTypes = {
  language: {
    name: 'Locale',
    description: 'Locale language',
    defaultValue: 'zh_CN',
    toolbar: {
      icon: 'globe',
      items: ['zh_CN', 'zh_TW', 'en_US', 'ko_KR', 'ja_JP'],
    },
  },
  theme: {
    name: 'Theme',
    description: 'Theme mode',
    defaultValue: 'light',
    toolbar: {
      icon: 'profile',
      items: ['light', 'dark'],
    },
  },
  direction: {
    name: 'Direction',
    description: 'RTL direction',
    defaultValue: 'ltr',
    toolbar: {
      icon: 'circle',
      items: ['ltr', 'rtl'],
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const withConfigProvider = (StoryFn, context: StoryContext) => {
  const { direction, theme, language } = context.globals;

  const locale = getLocale(language);
  const algorithm = themeMap[theme];
  switchMode(theme);
  let configProps = {
    direction,
    locale,
  };
  // const { componentId } = context;
  // if (['localeprovider'].includes(componentId)) {
  //   configProps.locale = null;
  // }

  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider
        {...configProps}
        theme={{
          algorithm,
        }}
      >
        <StoryFn />
      </ConfigProvider>
    </StyleProvider>
  );
};

export const decorators = [withConfigProvider];

export default {
  globalTypes,
  parameters,
  decorators,
} satisfies Preview;
