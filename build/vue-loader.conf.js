'use strict'
const utils = require('./utils')
const config = require('../config')
var env = process.env.NODE_ENV
var isProduction = env === 'production' || env === 'pre' || env === 'test'
var sourceMapEnabled
if (env === 'production') {
  sourceMapEnabled = config.build.productionSourceMap
} else if (env === 'pre') {
  sourceMapEnabled = config.pre.productionSourceMap
} else if (env === 'test') {
  sourceMapEnabled = config.test.productionSourceMap
} else {
  sourceMapEnabled = config.dev.cssSourceMap
}
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
