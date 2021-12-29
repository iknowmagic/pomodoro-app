<template>
  <div
    class="flex flex-col gap-[3rem] justify-center items-center w-sm h-full px-[30px]"
  >
    <div class="text-design-4 h2-sm">pomodoro</div>
    <div
      class="px-1 text-design-4 body-1 grid grid-cols-3 items-center text-center bg-design-8 h-[4rem] w-full rounded-[5rem] z-1"
    >
      <div
        :class="[
          'cursor-pointer p-1.2rem',
          { 'pill-selected': timerType === 'pomodoro' }
        ]"
        @click="initTimer('pomodoro')"
      >
        pomodoro
      </div>
      <div
        :class="[
          'cursor-pointer p-1.2rem',
          { 'pill-selected': timerType === 'shortBreak' }
        ]"
        @click="initTimer('shortBreak')"
      >
        short break
      </div>
      <div
        :class="[
          'cursor-pointer p-1.2rem',
          { 'pill-selected': timerType === 'longBreak' }
        ]"
        @click="initTimer('longBreak')"
      >
        long break
      </div>
    </div>
    <div
      class="cursor-pointer bg-design-8 g-1 rounded-full w-[300px] h-[300px] flex flex-col justify-center items-center"
      style="
        background: linear-gradient(315deg, #2e325a 0%, #0e112a 100%);
        box-shadow: -50px -50px 100px #272c5a, 50px 50px 100px #121530;
      "
    >
      <div
        class="border-[10px] border-design-8 gap-[1rem] w-[265px] h-[265px] flex flex-col justify-center items-center"
        :style="'--value: ' + percentage"
        role="progressbar"
        @click="isActive ? pause() : resume()"
      >
        <div class="h1-sm text-center">{{ timerToTime() }}</div>

        <div v-if="isActive" class="h3-sm">pause</div>
        <div v-if="!isActive" class="h3-sm">resume</div>
      </div>
    </div>
    <div class="pt-7 cursor-pointer">
      <img src="@/assets/icon-settings.svg" alt="settings" />
    </div>
  </div>
  <c-modal />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import cModal from './cModal.vue'
import useTimer from './useTimer'

export default defineComponent({
  name: 'MainPage',
  components: {
    cModal
  },
  setup() {
    const {
      timerType,
      timerToTime,
      pause,
      resume,
      start,
      isActive,
      initTimer,
      percentage
    } = useTimer()
    return {
      timerType,
      timerToTime,
      pause,
      resume,
      start,
      isActive,
      initTimer,
      percentage
    }
  }
})
</script>

<style>
@property --pgPercentage {
  syntax: '<number>';
  inherits: false;
  initial-value: 0;
}
div[role='progressbar'] {
  --fg: #f87070;
  --bg: #161932;
  border-radius: 50%;
  --pgPercentage: var(--value);
  background: radial-gradient(
      closest-side,
      #161932 94%,
      transparent 0 99.9%,
      #161932 0
    ),
    conic-gradient(var(--fg) calc(var(--pgPercentage) * 1%), var(--bg) 0);
}
</style>
