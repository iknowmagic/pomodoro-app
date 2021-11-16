module.exports = {
  'vue/no-unused-vars': 'warn',
  'vue/name-property-casing': ['warn', 'PascalCase'],
  'vue/component-name-in-template-casing': ['warn', 'kebab-case'],
  'vue/component-tags-order': [
    'error',
    {
      order: [['template', 'script'], 'style']
    }
  ],
  'vue/no-empty-pattern': 'warn',
  'vue/no-unused-components': 'warn',
  'vue/no-multiple-template-root': 'off',
  'vue/v-on-event-hyphenation': 'off',
  'vue/custom-event-name-casing': 'off',
  'vue/no-v-model-argument': 'off',
  'vue/no-v-for-template-key': 'off',
  'vue/no-multiple-objects-in-class': 'off'
}
