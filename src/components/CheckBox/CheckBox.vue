<template>
  <div
    class="flex justify-between items-center cursor-pointer body-2"
    @click="toggle"
  >
    <div :for="id" class="opacity-40">{{ label }}</div>

    <div class="relative w-12 h-25px flex items-center">
      <input
        :id="id"
        v-model="tempChecked"
        type="checkbox"
        class="absolute opacity-0 cursor-pointer w-0 h-0"
      />
      <span
        :class="[
          'absolute',
          'flex',
          'justify-center',
          'items-center',
          'top-0',
          'left-0',
          'h-25px',
          'w-25px',
          'rounded-full',
          { 'bg-design-theme': tempChecked },
          { checked: tempChecked },
          { 'bg-blue-gray-200': !tempChecked }
        ]"
      >
        <img
          v-if="tempChecked"
          src="@/assets/check-mark.svg"
          alt="selected"
          class="w-14px"
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { useVModel } from '@vueuse/core'

import uniqid from 'uniqid'

export default defineComponent({
  name: 'CheckBox',
  props: {
    label: {
      type: String,
      default: null
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const id = ref(uniqid())
    const tempChecked = useVModel(props, 'checked', emit)

    const toggle = () => {
      tempChecked.value = !tempChecked.value
    }

    return {
      id,
      tempChecked,

      toggle
    }
  }
})
</script>

<style></style>
