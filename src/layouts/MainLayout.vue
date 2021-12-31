<template>
  <div
    :class="`bg-design-5 text-design-7 flex flex-col justify-center items-center w-full h-full font-${themeStore.themeFont}`"
  >
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

import { useThemeStore } from '@/store'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const themeStore = useThemeStore()

    onMounted(() => {
      document.documentElement.style.setProperty(
        '--theme-color',
        `var(--${themeStore.themeColor})`
      )
    })

    return {
      themeStore
    }
  }
})
</script>

<style>
:root {
  --design-1: #f87070;
  --design-2: #70f3f8;
  --design-3: #d881f8;

  --theme-color: var(--design-2);
}
</style>
