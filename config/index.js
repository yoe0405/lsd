'use strict'
const path = require('path')
const prodEnv = require('./prod.env')
const devEnv = require('./dev.env')

module.exports = {
  build: {
    env: prodEnv,
    // index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: devEnv,
    port: process.env.PORT || 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/v2': { // 豆瓣代理
        target: 'https://api.douban.com/',
        changeOrigin: true
      },
      '/fanbei-web': { // 51线上环境
        target: 'https://app.51fanbei.com/',
        changeOrigin: true
      },
      '/lsd-web': {
        target: 'https://tapp.ldxinyong.com/',
        changeOrigin: true
      }
      // '/lsd-web': {
      //   target: 'http://192.168.2.245:80',
      //   changeOrigin: true
      // }
    },
    cssSourceMap: false
  }
}