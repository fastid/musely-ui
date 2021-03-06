/*
 * @Author: Victor wang
 * @Date: 2020-04-07 18:59:14
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-17 00:48:09
 * @Description:
 */
// 服务器版的jQuery
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cheerio = require('cheerio')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MarkdownItContainer = require('markdown-it-container')
// 引入markdown-it
// eslint-disable-next-line @typescript-eslint/no-var-requires
const md = require('markdown-it')

const { stripScript, stripTemplate, genInlineComponentText } = require('./utils')

const striptags = (str, tags) => {
  const $ = cheerio.load(str, { decodeEntities: false })
  if (!tags || tags.length === 0) {
    return str
  }

  tags = !Array.isArray(tags) ? [tags] : tags
  let len = tags.length

  while (len--) {
    $(tags[len]).remove()
  }

  return $.html()
}
/**
 * 获取标签中的文本内容
 * @param  {[String]} str e.g '<html><body><h1>header</h1></body><script></script></html>'
 * @param  {[String]} tag e.g 'h1'
 * @return {[String]}     e.g 'header'
 */
const stripfetch = (str, tag) => {
  const $ = cheerio.load(str, { decodeEntities: false })
  if (!tag) return str

  return $(tag).html()
}

/**
 * 增加 hljs 的 classname
 */
const wrapCustomClass = (render) => {
  return (...args) => {
    const idx = args[1]
    const token = args[0][idx]
    const prevToken = args[0][idx - 1]
    // 判断该 fence 是否在 :::demo 内
    const isInDemoContainer = prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^demo\s*(.*)$/)
    if (token.info === 'html' && isInDemoContainer) {
      // 替换Mustache语法 https://github.com/highlightjs/highlight.js/issues/725
      token.content = token.content.replace(/{{(.*)}}/g, '{{ "\\{\\{$1\\}\\}" }}')
    }
    return render(...args)
  }
}
const convertHtml = (str) => {
  return str.replace(/(&#x)(\w{4});/gi, ($0) => String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16)))
}
const vueMarkdown = {
  preprocess: (MarkdownIt) => {
    // eslint-disable-next-line @typescript-eslint/camelcase
    MarkdownIt.renderer.rules.table_open = () => {
      return '<table class="table">'
    }

    // 对于代码块,添加高亮样式,并替换Mustache 语法
    MarkdownIt.renderer.rules.fence = wrapCustomClass(MarkdownIt.renderer.rules.fence, MarkdownIt)

    // ```code`` 给这种样式加个class code_inline
    const codeInline = MarkdownIt.renderer.rules.code_inline
    // eslint-disable-next-line @typescript-eslint/camelcase
    MarkdownIt.renderer.rules.code_inline = (...args) => {
      args[0][args[1]].attrJoin('class', 'code_inline')
      return codeInline(...args)
    }
    return MarkdownIt
  },
  use: [
    [require('markdown-it-anchor')],
    // [require('markdown-it-latex').default],
    [
      MarkdownItContainer,
      'demo',
      {
        validate: (params) => params.trim().match(/^demo\s*(.*)$/),
        render: (tokens, idx) => {
          const markdown = md()
          const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
          // nesting === 1表示标签开始
          if (tokens[idx].nesting === 1) {
            // 获取正则捕获组中的描述内容,即::: demo xxx中的xxx
            const description = m && m.length > 1 ? m[1] : ''
            // 获得内容
            const content = tokens[idx + 1].content
            // 解析过滤解码生成html字符串
            const html = convertHtml(striptags(content, ['style']))
            // 获取script中的内容
            const script = stripfetch(content, 'script')
            // 获取style中的内容
            const style = stripfetch(content, 'style')
            // 组合成prop参数,准备传入组件
            let jsfiddle = { html: html, script: script, style: style }
            // 是否有描述需要渲染
            const descriptionHTML = description ? markdown.render(description) : ''
            // 将jsfiddle对象转换为字符串,并将特殊字符转为转义序列
            // TODO into jsfiddle
            jsfiddle = markdown.utils.escapeHtml(JSON.stringify(jsfiddle))
            // 起始标签,写入code-view模板开头,并传入参数
            return `<code-view :jsfiddle="${jsfiddle}">
                      <!---demo:${html}:demo--->
                      <div slot="description" ${description ? " class='description'" : ''}>${descriptionHTML}</div>
                      <div slot="highlight">`
          }
          // 否则闭合标签
          return '</div></code-view>'
        }
      }
    ],
    [require('markdown-it-highlightjs')],
    [
      MarkdownItContainer,
      'tip',
      {
        validate: (params) => params.trim().match(/^tip\s*(.*)$/),
        render: (tokens, idx) => {
          if (tokens[idx].nesting === 1) {
            const icon =
              '<i class="markdown-it-vue-alert-icon markdown-it-vue-alert-icon-tip"><svg viewBox="64 64 896 896" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" class=""><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg></i>'
            return `<div class="markdown-it-vue-alter markdown-it-vue-alter-tip">${icon}`
          } else {
            return '</div>'
          }
        }
      }
    ],
    [
      MarkdownItContainer,
      'success',
      {
        validate: (params) => params.trim().match(/^success\s*(.*)$/),
        render: (tokens, idx) => {
          if (tokens[idx].nesting === 1) {
            const icon =
              '<i class="markdown-it-vue-alert-icon markdown-it-vue-alert-icon-success"><svg viewBox="64 64 896 896" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" class=""><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg></i>'
            return `<div class="markdown-it-vue-alter markdown-it-vue-alter-success">${icon}`
          } else {
            return '</div>'
          }
        }
      }
    ],
    [
      MarkdownItContainer,
      'warning',
      {
        validate: (params) => params.trim().match(/^warning\s*(.*)$/),
        render: (tokens, idx) => {
          if (tokens[idx].nesting === 1) {
            const icon =
              '<i class="markdown-it-vue-alert-icon markdown-it-vue-alert-icon-warning"><svg viewBox="64 64 896 896" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" class=""><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path></svg></i>'
            return `<div class="markdown-it-vue-alter markdown-it-vue-alter-warning">${icon}`
          } else {
            return '</div>'
          }
        }
      }
    ],
    [
      MarkdownItContainer,
      'info',
      {
        validate: (params) => params.trim().match(/^info\s*(.*)$/),
        render: (tokens, idx) => {
          if (tokens[idx].nesting === 1) {
            const icon =
              '<i class="markdown-it-vue-alert-icon markdown-it-vue-alert-icon-info"><svg viewBox="64 64 896 896" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" class=""><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path></svg></i>'
            return `<div class="markdown-it-vue-alter markdown-it-vue-alter-info">${icon}`
          } else {
            return '</div>'
          }
        }
      }
    ],
    [
      MarkdownItContainer,
      'error',
      {
        validate: (params) => params.trim().match(/^error\s*(.*)$/),
        render: (tokens, idx) => {
          if (tokens[idx].nesting === 1) {
            const icon =
              '<i class="markdown-it-vue-alert-icon markdown-it-vue-alert-icon-error"><svg viewBox="64 64 896 896" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" class=""><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg></i>'
            return `<div class="markdown-it-vue-alter markdown-it-vue-alter-error">${icon}`
          } else {
            return '</div>'
          }
        }
      }
    ]
  ]
}

const containers = (md) => {
  vueMarkdown.use.forEach((element) => {
    md.use(...element)
  })
}

let markdown = md({
  html: true
})
  // 定义自定义的块容器
  .use(containers)

markdown = vueMarkdown.preprocess(markdown)

module.exports = function(source) {
  const content = markdown.render(source)
  const startTag = '<!---demo:'
  const startTagLen = startTag.length
  const endTag = ':demo--->'
  const endTagLen = endTag.length

  let componenetsString = ''
  let id = 0 // demo 的 id
  const output = [] // 输出的内容
  let start = 0 // 字符串开始位置

  let commentStart = content.indexOf(startTag)
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen)
  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart))

    const commentContent = content.slice(commentStart + startTagLen, commentEnd)
    const html = stripTemplate(commentContent)
    const script = stripScript(commentContent)
    const demoComponentContent = genInlineComponentText(html, script)
    const demoComponentName = `compontent-doc${id}`
    output.push(`<template slot="source"><${demoComponentName} /></template>`)
    componenetsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`

    // 重新计算下一次的位置
    id++
    start = commentEnd + endTagLen
    commentStart = content.indexOf(startTag, start)
    commentEnd = content.indexOf(endTag, commentStart + startTagLen)
  }

  // 仅允许在 demo 不存在时，才可以在 Markdown 中写 script 标签
  // todo: 优化这段逻辑
  let pageScript = ''
  if (componenetsString) {
    pageScript = `<script>
      export default {
        name: 'component-doc',
        components: {
          ${componenetsString}
        }
      }
    </script>`
  } else if (content.indexOf('<script>') === 0) {
    // 硬编码，有待改善
    start = content.indexOf('</script>') + '</script>'.length
    pageScript = content.slice(0, start)
  }
  output.push(content.slice(start))
  return `
    <template>
      <section>
        ${output.join('')}
      </section>
    </template>
    <!-----component script----->
    ${pageScript}
  `
}
