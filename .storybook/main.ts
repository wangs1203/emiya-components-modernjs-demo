// import path from 'path';
import type { StorybookConfig } from '@modern-js/storybook';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-styling-webpack'],
  framework: {
    name: '@modern-js/storybook',
    options: {
      bundler: 'webpack',
      // bundler: 'rspack',
    },
  },
  // typescript: {
  //   reactDocgen: 'react-docgen-typescript' // webpack
  //   reactDocgen: 'react-docgen', //rspack
  // },
};

export default config;
