'use strict'

module.exports = {
  publicPath: '/app',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: 'http://demo.xghuifebg.com/'
  }
}
