<template>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <hello-world msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import HelloWorld from '@/components/HelloWorld.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    HelloWorld
  }
})
</script>
