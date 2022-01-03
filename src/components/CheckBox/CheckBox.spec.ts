import { createPinia, setActivePinia } from 'pinia'

import { mount } from '@cypress/vue'

import Component from './index'

before(() => {
  setActivePinia(createPinia())
})

it('renders a message', () => {
  // @ts-expect-error test component
  mount(Component, {
    propsData: {
      msg: 'Hello Cypress!'
    }
  })

  cy.get('h1').contains('Hello Cypress!')
})
