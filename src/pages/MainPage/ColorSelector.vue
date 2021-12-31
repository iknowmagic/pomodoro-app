<template>
  <div class="flex flex-row justify-center gap-16px">
    <div
      v-for="(bgcolor, key) in colors"
      :key="key"
      :class="`circle-color ${bgcolor}`"
      @click="changeColor(key)"
    >
      <img
        v-if="key === themeColor"
        src="@/assets/check-mark.svg"
        alt="selected"
        class="w-18px"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useVModel } from '@vueuse/core'

export default defineComponent({
  name: 'ColorSelector',
  props: {
    themeColor: {
      type: String,
      default: 'design-1'
    }
  },
  setup(props, { emit }) {
    const colors = {
      'design-1': 'bg-design-1',
      'design-2': 'bg-design-2',
      'design-3': 'bg-design-3'
    }

    const themeColor = useVModel(props, 'themeColor', emit)

    const changeColor = (key: string) => {
      themeColor.value = key
    }

    return {
      colors,
      changeColor
    }
  }
})
</script>
