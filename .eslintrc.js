module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: 'vue-eslint-parser',
  extends: [
    // 'plugin:unicorn/recommended',
    'plugin:sonarjs/recommended',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/standard',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['vue', 'sonarjs', 'simple-import-sort', 'prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    ...require('./config/eslint-rules-general.js'),
    ...require('./config/eslint-rules-vue.js'),
    ...require('./config/eslint-rules-prettier.js'),
    ...require('./config/eslint-rules-sort.js'),
    // ...require('./config/eslint-rules-accessibility.js'),
    ...require('./config/eslint-rules-sonarjs.js'),
    // ...require('./config/eslint-rules-unicorn.js'),
    ...require('./config/eslint-rules-typescript.js')
  },
  overrides: [
    {
      files: ['.eslintrc.js', '*.config.js'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
        'unicorn/prefer-module': 'off'
      }
    }
  ]
}
