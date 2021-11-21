<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { test } from '@/store'

export default defineComponent({
  name: 'HelloWorld',
  setup() {
    console.log('%cHelloWorld.vue line:13 test', 'color: #007acc;', test())
  }
})
</script>
