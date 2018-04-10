'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = {
  NODE_ENV: '"development"',
  API_HOST: '"http://uip-test.yingjiashenghuo.com/test/api/InnjiaUip"',
  PAY_URL: '"http://wx.innjia.com/h5v2/shouyintai/yuxiaoerpay/WEB-INF/views/default/checkstandIdcTest.html"'
}
