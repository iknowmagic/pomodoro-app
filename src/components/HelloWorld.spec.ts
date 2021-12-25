import { createPinia, setActivePinia } from 'pinia'

import { mount } from '@cypress/vue'

import HelloWorld from './HelloWorld.vue'

before(() => {
  setActivePinia(createPinia())
})

it('renders a message', () => {
  mount(HelloWorld, {
    propsData: {
      msg: 'Hello Cypress!'
    }
  })

  cy.get('h1').contains('Hello Cypress!')
})
