module.exports = {
  'sort-imports': 'off',
  'import/order': 'off',
  'simple-import-sort/imports': [
    'warn',
    {
      groups: [
        ['promise', 'polyfills', 'core-js', 'regenerator-runtime'],

        // vue import
        ['^vue$'],

        // Side effect imports.
        ['^\\u0000'],

        // Packages.
        // App Items
        ['^@vueuse', '^lodash', '^dayjs'],
        ['^uniqid', '^alasql'],
        ['^@/services', 'pinia', '@/store'],
        ['^@/helpers'],

        // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
        ['^@?\\w'],

        // Absolute imports and other imports such as Vue-style `@/foo`.
        // Anything that does not start with a dot.
        ['^[^.]'],
        // Relative imports.
        // Anything that starts with a dot.
        ['^\\.']
      ]
    }
  ]
}
