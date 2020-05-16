/*
 * @Author: Victor wang
 * @Date: 2020-05-15 23:01:43
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-16 15:23:18
 * @Description:
 */
const MK = require('markdown-it')
const fs = require('fs')
const vmd = require('../build/vueMarkdown')

const md = fs.readFileSync('./tests/t.md', 'utf8')
// const renders = mk.render(md)
const vmRenders = vmd(md)
console.log(vmRenders)
