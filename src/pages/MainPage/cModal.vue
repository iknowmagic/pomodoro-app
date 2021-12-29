<template>
  <div
    class="w-full h-full absolute top-0 left-0 flex flex-col justify-center items-center py-16 text-design-8"
  >
    <div class="bg-design-6 w-sm h-full z-10 rounded-lg">
      <div class="flex flex-row justify-between px-8 py-6">
        <div class="h2-sm">Settings</div>
        <div>X</div>
      </div>
      <div class="bg-design-4 h-[1px] w-full"></div>
      <div class="px-8 py-6">
        <div class="h4-sm text-center">Time (minutes)</div>
        <div class="bg-design-4 h-[1px] w-full"></div>
        <div class="h4-sm text-center">Font</div>
        <div class="bg-design-4 h-[1px] w-full"></div>
        <div class="h4-sm text-center">Color</div>
      </div>
    </div>
    <div
      class="z-12 px-12 py-4 text-center mt-[-1.8rem] rounded-[30px] font-bold bg-design-1"
    >
      Apply
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CModal'
})
</script>
