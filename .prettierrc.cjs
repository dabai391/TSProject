/**
 * Prettier 代码格式化配置
 * 更多选项请参考: https://prettier.io/docs/en/options.html
 */
module.exports = {
  // 每行代码的最大长度
  printWidth: 100,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用制表符缩进，而使用空格
  useTabs: false,
  // 在语句末尾打印分号
  semi: true,
  // 使用单引号而不是双引号
  singleQuote: false,
  // 在 JSX 中使用单引号而不是双引号
  jsxSingleQuote: false,
  // 在多行对象或数组的末尾是否打印逗号
  // 'es5': 在 ES5 中有效的尾随逗号 (对象、数组等)
  trailingComma: "all",
  // 在对象文字中的括号之间打印空格，例如 { foo: bar }
  bracketSpacing: true,
  // 将多行 HTML (HTML, JSX, Vue, Angular) 元素的 > 放在最后一行的末尾，而不是单独放在下一行
  bracketSameLine: false,
  // 在唯一的箭头函数参数周围包含括号。例如 (x) => x
  arrowParens: "always",
  // 仅格式化文件中已包含特定注释的文件（用于逐步采用）
  requirePragma: false,
  // 仅在文件顶部插入特定注释时才格式化（用于逐步采用）
  insertPragma: false,
  // 超过 printWidth 时是否折叠 Markdown 文本
  proseWrap: "preserve",
  // HTML, Vue, Angular 的空格敏感性
  htmlWhitespaceSensitivity: "css",
  // 换行符类型 (auto, lf, crlf, cr)
  endOfLine: "auto",
  // 是否格式化 Vue 文件中的 <script> 和 <style> 标签缩进
  vueIndentScriptAndStyle: false,
};
