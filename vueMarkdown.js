/*
 * @Author: Victor wang
 * @Date: 2020-04-07 18:59:14
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-08 17:18:35
 * @Description:
 */
const cheerio = require('cheerio')
const MarkdownItContainer = require('markdown-it-container')
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
 * 增加 hljs 的 classname
 */
const wrapCustomClass = (render) => {
  return function (...args) {
    return render(...args)
      .replace('<code class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">')
  }
}
const convertHtml = (str) => {
  return str.replace(/(&#x)(\w{4});/gi, ($0) =>
    String.fromCharCode(
      parseInt(
        encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'),
        16
      )
    )
  )
}

const vueMarkdown = {
  preprocess: (MarkdownIt, source) => {
    MarkdownIt.renderer.rules.tableOpen = () => {
      return '<table class="table">'
    }
    MarkdownIt.renderer.rules.fence = wrapCustomClass(
      MarkdownIt.renderer.rules.fence
    )

    // ```code`` 给这种样式加个class code_inline
    const codeInline = MarkdownIt.renderer.rules.codeInline
    MarkdownIt.renderer.rules.codeInline = (...args) => {
      args[0][args[1]].attrJoin('class', 'code_inline')
      return codeInline(...args)
    }
    return source
  },
  use: [
    [
      MarkdownItContainer,
      'demo',
      {
        validate: (params) => params.trim().match(/^demo\s*(.*)$/),
        render: (tokens, idx) => {
          if (tokens[idx].nesting === 1) {
            const html = convertHtml(
              striptags(tokens[idx + 1].content, 'script')
            )
            // 移除描述，防止被添加到代码块
            tokens[idx + 2].children = []
            return `<code-view>
                        <div slot="desc">${html}</div>
                        <div slot="highlight">`
          }
          return '</div></code-view>\n'
        }
      }
    ]
  ]
}

module.exports = vueMarkdown
