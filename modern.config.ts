import { moduleTools, defineConfig } from '@modern-js/module-tools';
import { tailwindcssPlugin } from '@modern-js/plugin-tailwindcss';

export default defineConfig({
  plugins: [moduleTools(), tailwindcssPlugin()],
  buildPreset: 'npm-component-es5',
  // buildPreset: 'npm-component',
  // buildConfig: {
  //   target: 'es5',
  // },

  buildConfig: {
    externals: ['react', 'react-dom'],
    transformLodash: true,
  },
});
