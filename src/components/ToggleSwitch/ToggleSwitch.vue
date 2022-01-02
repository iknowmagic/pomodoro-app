<template>
  <div
    class="flex justify-between items-center cursor-pointer body-2"
    @click="toggle"
  >
    <div class="opacity-40">{{ label }}</div>
    <div
      class="w-12 h-6 flex items-center bg-blue-gray-200 rounded-full p-1 duration-300 ease-in-out"
      :class="{ 'bg-blue-gray-300': active }"
    >
      <div
        class="bg-design-6 w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out"
        :class="{ 'translate-x-6': active }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useVModel } from '@vueuse/core'

export default defineComponent({
  name: 'ToggleSwitch',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    }
  },
  setup(props, { emit }) {
    const active = useVModel(props, 'active', emit)

    const toggle = () => {
      active.value = !active.value
    }

    return {
      toggle
    }
  }
})
</script>
