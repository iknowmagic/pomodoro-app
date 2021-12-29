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
