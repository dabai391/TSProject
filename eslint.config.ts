import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"
import css from "@eslint/css"
import eslintConfigPrettier from "eslint-config-prettier"
import eslintPluginPrettier from "eslint-plugin-prettier"

/**
 * ESLint 配置文件 (使用 Flat Config 格式)
 * 结合了 TypeScript, Vue, CSS 和 Prettier 的校验规则
 */
export default tseslint.config(
  // 1. 基础配置和全局忽略
  {
    ignores: ["node_modules", "dist", "pnpm-lock.yaml"],
  },

  // 2. 通用 JavaScript 和 TypeScript 规则
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      semi: ["error", "never"],
      "@typescript-eslint/semi": ["error", "never"],
    },
  },

  // 3. Vue 相关配置
  // 使用 Vue 官方推荐的 "essential" 规则集
  ...pluginVue.configs["flat/essential"].map((config) => ({
    ...config,
    files: ["**/*.vue"],
  })),
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        // 在 .vue 文件中使用 TypeScript 解析器
        parser: tseslint.parser,
      },
    },
  },

  // 4. CSS 相关配置
  {
    files: ["**/*.css"],
    plugins: {
      css,
    },
    language: "css/css",
    extends: [css.configs.recommended],
    rules: {
      // 关闭基准特性检查，以支持 CSS 嵌套等现代语法
      "css/use-baseline": "off",
    },
  },

  // 5. Prettier 集成配置
  // 必须放在最后，以确保能够覆盖并禁用掉前面配置中可能冲突的格式化规则
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      // 启用 prettier 插件提供的规则，将格式问题报告为 ESLint 错误
      "prettier/prettier": "error",
      // 合并 prettier 官方配置，禁用所有与格式相关的 ESLint 规则
      ...eslintConfigPrettier.rules,
      "vue/no-multiple-template-root": "off",
      "vue/multi-word-component-names": "off",
    },
  },
)
