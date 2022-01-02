<template>
  <div class="w-200px md:w-275px text-center">
    <div :id="id">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import uniqid from 'uniqid'

import fitty from 'fitty'

export default defineComponent({
  name: 'CFitty',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const id = ref(uniqid())
    const fitters = ref()

    onMounted(() => {
      if (props.active) {
        fitters.value = fitty(`#${id.value}`)
      }
    })

    onBeforeUnmount(() => {
      if (fitters.value?.[0]) {
        fitters.value[0].unsubscribe()
      }
    })

    watch(
      () => props.active,
      () => {
        if (props.active) {
          fitters.value = fitty(`#${id.value}`)
        } else {
          if (fitters.value?.[0]) {
            fitters.value[0].unsubscribe()
          }
        }
      }
    )

    return {
      id
    }
  }
})
</script>
