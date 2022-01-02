<template>
  <div
    :class="`min-w-398px bg-design-5 text-design-7 flex flex-col justify-center items-center w-full h-full w-min-sm font-${themeStore.themeFont}`"
  >
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, provide } from 'vue'

import { useBreakpoints } from '@vueuse/core'

import { useThemeStore } from '@/store'

// @ts-expect-error
import bkpoints from '../../windi.breakpoints'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const themeStore = useThemeStore()

    const breakpoints = useBreakpoints(bkpoints)
    const sm = breakpoints.smaller('md')
    const md = breakpoints.between('md', 'lg')
    const lg = breakpoints.greater('lg')
    const mq = { sm, md, lg }
    provide('mq', mq)

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
