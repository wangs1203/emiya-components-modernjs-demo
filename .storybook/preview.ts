import type { Preview } from '@storybook/react';
import '../dist/es/index.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export default {
  parameters,
} satisfies Preview;
