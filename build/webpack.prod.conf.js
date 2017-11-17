'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')  // 一个可以合并数组和对象的插件
const baseWebpackConfig = require('./webpack.base.conf')  // 用于从webpack生成的bundle中提取文本到特定文件中的插件
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')  // 一个用于生成HTML文件并自动注入依赖文件（link/script）的webpack插件
const ExtractTextPlugin = require('extract-text-webpack-plugin')  //如果我们想用webpack打包成一个文件，css js分离开，需要这个插件
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const env = config.build.env

const webpackConfig = merge(baseWebpackConfig, {  // 合并基础的webpack配置
  module: {  // 配置样式文件的处理规则，使用styleLoaders
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,  // 开启source-map，生产环境下推荐使用cheap-source-map或source-map，后者得到的.map文件体积比较大，但是能够完全还原以前的js代码
  output: {
    path: config.build.assetsRoot,  // 编译输出目录
    filename: utils.assetsPath('js/[name].[chunkhash].js'),  // 编译输出文件名格式
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')  // 没有指定输出名的文件输出的文件名格式
  },
  plugins: [  // 重新配置插件项
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({  // 丑化压缩代码
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new ExtractTextPlugin({  // 抽离css文件
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new CopyWebpackPlugin([  //  复制对应的文件到另外一个文件
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ].concat(utils.htmlPlugin)
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
        ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
