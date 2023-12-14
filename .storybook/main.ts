// import path from 'path';
import type { StorybookConfig } from '@modern-js/storybook';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.css$/,
            sideEffects: true,
            // use: [
            //   require.resolve('style-loader'),
            //   {
            //     loader: require.resolve('css-loader'),
            //     options: {},
            //   },
            // ],
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: { importLoaders: 1 }
              },
              {
                // Gets options from `postcss.config.js` in your project root
                loader: 'postcss-loader',
                options: { implementation: require.resolve('postcss') }
              }
            ],
          },
        ],
      },
    },
    'storybook-dark-mode'
  ],
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
