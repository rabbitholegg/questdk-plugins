// babel.config.js
const sharedPresets = ['@babel/typescript'];
const shared = {
  ignore: ['src/**/*.spec.ts'],
  presets: sharedPresets
}

export default {
  env: {
    esmUnbundled: shared,
    esmBundled: {
      ...shared,
      presets: [['@babel/env', {
        targets: "> 0.25%, not dead"
      }], ...sharedPresets],
    },
    cjs: {
      ...shared,
      presets: [['@babel/env', {
        modules: 'commonjs'
      }], ...sharedPresets],
    }
  }
}