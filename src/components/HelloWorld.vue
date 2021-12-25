<template>
  <h1 class="pt-20">Hello Cypress!</h1>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

import api from '@/services'
import { test } from '@/store'

import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const testStore = test()
    console.log(
      '%cHelloWorld.vue line:13 test',
      'color: #007acc;',
      testStore.hello
    )

    const route = useRoute()
    route.meta = { title: 'Test' }
    console.log(
      '%cHelloWorld.vue line:24 route',
      'color: #007acc;',
      route.meta
    )

    const getData = async () => {
      const { data: result } = await api.test.getData()
      console.log('%cHelloWorld.vue line:23 result', 'color: #007acc;', result)
    }

    onMounted(() => {
      getData()
    })
  }
})
</script>
