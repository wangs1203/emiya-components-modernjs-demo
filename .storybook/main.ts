// import path from 'path';
import type { StorybookConfig } from '@modern-js/storybook';

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

function getLoaderForStyle(isCssModule?: boolean) {
  return [
    'style-loader',
    {
      loader: 'css-loader',
      options: isCssModule
        ? {
            importLoaders: 1,
            modules: {
              auto: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          }
        : {},
    },
    {
      // Gets options from `postcss.config.js` in your project root
      loader: 'postcss-loader',
      options: { implementation: require.resolve('postcss') },
    },
    {
      loader: 'less-loader',
      options: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  ];
}

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    'storybook-dark-mode',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.css$/,
            sideEffects: true,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  modules: {
                    auto: true,
                    localIdentName: '[name]__[local]--[hash:base64:5]',
                  },
                },
              },
              {
                // Gets options from `postcss.config.js` in your project root
                loader: 'postcss-loader',
                options: { implementation: require.resolve('postcss') },
              },
            ],
          },
          // Replaces any existing Sass rules with given rules
          {
            test: lessRegex,
            exclude: lessModuleRegex,
            use: getLoaderForStyle(),
          },
          {
            test: lessModuleRegex,
            use: getLoaderForStyle(true),
          },
        ],
      },
    },
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
