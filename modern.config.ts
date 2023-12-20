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
    // transformImport: [
    //   // babel-plugin-import 的 options 配置
    //   {
    //     libraryName: 'antd',
    //     style: true,
    //   },
    // ],
    transformLodash: true,
  },
});
