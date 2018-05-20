'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
<<<<<<< HEAD
  NODE_ENV: '"development"',    //开发环境
  API_HOST:"http://localhost:7001/"
=======
  NODE_ENV: '"development"'
>>>>>>> 86591e3646b79c3d1d13f83e62c4df2f80895797
})
