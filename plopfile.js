const fs = require('fs')

module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Vue Component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name'
      }
    ],
    actions: [
      function createComponentDir(answers) {
        if (!fs.existsSync(`src/components/${answers.name}`)) {
          fs.mkdirSync(`src/components/${answers.name}`)
        }
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.vue',
        templateFile: '_templates/component/component.vue.hbs'
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/index.ts',
        templateFile: '_templates/component/component.index.hbs'
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/_{{dashCase name}}.scss',
        templateFile: '_templates/component/component.scss.hbs'
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.spec.ts',
        templateFile: '_templates/component/component.spec.hbs'
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.stories.ts',
        templateFile: '_templates/component/component.stories.hbs'
      }
    ]
  })

  plop.setGenerator('module', {
    description: 'Vuex Module',
    prompts: [
      {
        type: 'input',
        name: 'dir',
        message: 'dir name'
      },
      {
        type: 'input',
        name: 'name',
        message: 'module name'
      }
    ],
    actions: [
      function createModuleDir(answers) {
        if (!fs.existsSync(`src/state/modules/${answers.dir}`)) {
          fs.mkdirSync(`src/state/modules/${answers.dir}`)
        }
      },
      function createTestsDir(answers) {
        if (!fs.existsSync(`src/state/modules/${answers.dir}/__tests__`)) {
          fs.mkdirSync(`src/state/modules/${answers.dir}/__tests__`)
        }
      },
      {
        type: 'add',
        path: 'src/state/modules/{{dir}}/{{name}}.js',
        templateFile: '_templates/module/module.hbs'
      }
    ]
  })

  plop.setActionType('dxCustom', () => {
    customDx.init()
  })

  plop.setGenerator('dx.custom', {
    description: 'custom dx stylesheet',
    prompts: [],
    actions: [
      {
        type: 'dxCustom'
      }
    ]
  })
}
