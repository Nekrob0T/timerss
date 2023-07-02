const { resolve } = require('node:path');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: ['quasar'],
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  chainWebpack(webpackConfig) {
    webpackConfig.module
      .rule('pug')
      .oneOf('pug-vue')
      .use('deIndent')
      .before('pug')
      .loader(resolve(__dirname, './loader/deIndent.js'));
  }
});
