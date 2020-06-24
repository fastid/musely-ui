module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard', '@vue/typescript/recommended'],
  parserOptions: {
    // 设置 js 的解析器为 @typescript-eslint/parser
    // https://juejin.im/post/5cf5dfe2f265da1bd522baaa
    parser: '@typescript-eslint/parser',
    // parser: 'babel-eslint',
    ecmaVersion: 2019,
    // ECMAScript modules 模式
    sourceType: 'module',
    ecmaFeatures: {
      // 不允许 return 语句出现在 global 环境下
      globalReturn: false,
      // 开启全局 script 模式
      impliedStrict: true,
      jsx: true
    },
    // 仅允许 import export 语句出现在模块的顶层
    allowImportExportEverywhere: false
  },
  rules: {
    // 0 = off, 1 = warn, 2 = error
    // https://cn.eslint.org/docs/rules/multiline-ternary
    'multiline-ternary': ['error', 'always-multiline'],
    // https://cn.eslint.org/docs/rules/indent
    indent: ['off', 2, { flatTernaryExpressions: false, SwitchCase: 1 }],
    '@typescript-eslint/no-var-requires': 'off',
    'space-before-function-paren': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-empty-function': 'off',
    // interface 末尾不加分号
    '@typescript-eslint/member-delimiter-style': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        mocha: true
      }
    }
  ]
}
