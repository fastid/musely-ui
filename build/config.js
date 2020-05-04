/*
 * @Author: Victor wang
 * @Date: 2020-05-04 02:04:16
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-04 16:43:16
 * @Description:
 */
const Config = require('markdown-it')
const containers = require('./container')
const overWriteFenceRule = require('./fence')

const config = new Config().use(containers)

const md = config
overWriteFenceRule(md)

module.exports = md
