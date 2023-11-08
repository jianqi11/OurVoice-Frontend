module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "eslint:recommended", // 使用 ESLint 推荐的规则
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  rules: {
    // 在这里定义您的规则，例如：
    "no-useless-escape": "off", // 禁用 no-useless-escape 规则
    "no-unused-vars": "warn", // 警告未使用的变量
    "no-extra-boolean-cast": "warn",
    "no-constant-condition": "warn",
    "no-extra-boolean-cast": "off",
    "no-constant-condition": "off",
  },
};
