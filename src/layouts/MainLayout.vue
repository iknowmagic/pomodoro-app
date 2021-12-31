<template>
  <div
    class="bg-design-5 text-design-7 flex flex-col justify-center items-center w-full h-full font-sans"
  >
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout'
})
</script>

<style>
:root {
  --design-1: #f87070;
  --design-2: #70f3f8;
  --design-3: #d881f8;

  --design-theme: var(--design-1);
}
</style>
