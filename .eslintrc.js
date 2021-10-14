module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['google', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ignoreStrings: 'true',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'require-jsdoc': 'warn',
    'no-unused-vars': 'warn',
    'max-len': 'off',
  },
};
