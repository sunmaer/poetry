'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',    //开发环境
//  API_HOST:'"//www.vidahaha.top:7002/"'
  API_HOST:'"/localhost:7002/"'
})
