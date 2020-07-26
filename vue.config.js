const proxyConfig = require('./proxy')

module.exports = {
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    proxy: proxyConfig
  },
  chainWebpack: config => {
    config.module.rule('eslint').use('eslint-loader').options({
      fix: true
    })
    config.module
      .rule('mjs')
      .test(/\.mjs$/)
      .type('javascript/auto')
      .end()
  }
}
