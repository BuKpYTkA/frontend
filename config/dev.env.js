'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
    ROOT_API: '"http://smh.loc/api/"',
    X_API_KEY: '"123123"'
})
