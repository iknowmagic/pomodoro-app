<template>
  <div class="flex flex-row justify-center gap-16px">
    <div
      v-for="(font, key) in fonts"
      :key="key"
      class="group hover:border-1 hover:border-design-7 rounded-full"
      @click="changeFont(key)"
    >
      <div
        :class="[
          `circle-font  ${font} m-5px group-hover:m-4px`,
          { 'bg-design-8 text-design-6': key === themeFont },
          { 'bg-design-7 text-design-5': key !== themeFont }
        ]"
      >
        Aa
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useVModel } from '@vueuse/core'

export default defineComponent({
  name: 'FontSelector',
  props: {
    themeFont: {
      type: String,
      default: 'sans'
    }
  },
  setup(props, { emit }) {
    const fonts = {
      sans: 'font-sans',
      serif: 'font-serif font-normal',
      mono: 'font-mono'
    }

    const themeFont = useVModel(props, 'themeFont', emit)

    const changeFont = (key: string) => {
      themeFont.value = key
    }

    return {
      fonts,
      changeFont
    }
  }
})
</script>
