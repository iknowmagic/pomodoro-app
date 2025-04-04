<template>
  <div class="grid grid-cols-2 md:grid-cols-1 md:gap-2 items-center">
    <label :for="id" class="body-2 opacity-40">{{ label }}</label>
    <div class="input-box rounded-10px bg-design-7 h-40px md:h-48px w-full">
      <input
        :id="id"
        v-model="currentValue"
        type="number"
        class="bg-transparent w-full text-14px font-bold leading-14px"
        min="1"
        @change="change"
      />
      <div class="grid grid-rows-2">
        <button
          data-action="increment"
          class="bg-transparent opacity-20 hover:opacity-100"
          @click="increment"
        >
          <img src="@/assets/icon-arrow-up.svg" alt="less" />
        </button>
        <button
          data-action="decrement"
          class="bg-transparent opacity-20 hover:opacity-100"
          @click="decrement"
        >
          <img src="@/assets/icon-arrow-down.svg" alt="more" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { useVModel } from '@vueuse/core'

import uniqid from 'uniqid'

import { SimpleObject } from '@/types'

export default defineComponent({
  name: 'InputNumber',
  props: {
    value: {
      type: Number,
      default: null
    },
    label: {
      type: String,
      default: null
    }
  },
  setup(props, { emit }) {
    const id = ref(uniqid())
    const currentValue = useVModel(props, 'value', emit)

    const decrement = () => {
      if (currentValue.value > 1) {
        currentValue.value--
      }
    }
    const increment = () => {
      currentValue.value++
    }

    const change = () => {
      if (currentValue.value <= 0) {
        currentValue.value = 1
      }
    }

    return {
      id,
      currentValue,

      decrement,
      increment,
      change
    }
  }
})
</script>

<style lang="scss" scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  appearance: none;
  margin: 0;
}
.input-box {
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 5px 16px;

  input {
    background-color: transparent;

    &:focus {
      outline: none;
    }
  }

  button {
    &:focus {
      outline: none;
    }
  }
}
</style>
