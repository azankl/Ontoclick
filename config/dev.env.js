var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var API = require("../api/dev.api.json")

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_KEY: JSON.stringify(API.key)
})
