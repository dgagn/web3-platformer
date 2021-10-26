module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['google', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ignoreStrings: 'true',
  },
  rules: {
    'require-jsdoc': 'warn',
    'valid-jsdoc': 'warn',
    'no-unused-vars': 'warn',
    'max-len': 'off',
    'no-console': 'error',
  },
};
