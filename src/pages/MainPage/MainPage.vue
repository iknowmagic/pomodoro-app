<template>
  <div
    class="flex flex-col gap-3rem justify-center items-center w-sm h-full px-24px"
  >
    <div class="text-design-4 h2-sm">pomodoro</div>
    <div
      class="px-1 text-design-4 body-2 grid grid-cols-3 items-center text-center bg-design-8 h-4rem w-full rounded-5rem z-1"
    >
      <div
        :class="[
          'cursor-pointer p-1.2rem',
          { 'pill-selected': timerStore.timerType === 'pomodoro' }
        ]"
        @click="initTimer('pomodoro')"
      >
        <span class="opacity-40">pomodoro</span>
      </div>
      <div
        :class="[
          'cursor-pointer p-1.2rem',
          { 'pill-selected': timerStore.timerType === 'shortBreak' }
        ]"
        @click="initTimer('shortBreak')"
      >
        <span class="opacity-40">short break</span>
      </div>
      <div
        :class="[
          'cursor-pointer p-1.2rem',
          { 'pill-selected': timerStore.timerType === 'longBreak' }
        ]"
        @click="initTimer('longBreak')"
      >
        <span class="opacity-40">long break</span>
      </div>
    </div>
    <div
      class="cursor-pointer bg-design-8 g-1 rounded-full w-312px h-312px flex flex-col justify-center items-center ml-[-5px]"
      style="
        background: linear-gradient(315deg, #2e325a 0%, #0e112a 100%);
        box-shadow: -50px -50px 100px #272c5a, 50px 50px 100px #121530;
      "
    >
      <div
        class="bg-design-8 rounded-full gap-1rem w-280px h-280px flex flex-col justify-center items-center"
        :style="`background-image: url('${drawCircle(timerStore.percentage)}');
          background-repeat: no-repeat;
          background-size: 275px 275px;
          background-position: center center;
          `"
        role="progressbar"
        @click="isActive ? pause() : resume()"
      >
        <c-fitty
          :active="timerToTime.toString().length > 5"
          :class="[
            'pt-8',
            'h1-sm',
            { 'text-6rem': timerToTime.toString().length === 2 },
            { 'pt-2': timerToTime.toString().length === 2 }
          ]"
        >
          {{ timerToTime }}
        </c-fitty>

        <div
          :class="[
            'h4-sm ml-10px',
            { 'text-gray-500': timerStore.timerType !== 'pomodoro' }
          ]"
        >
          {{ timerStore.pomodoros }} / 4
        </div>
        <div v-if="isActive" class="h3-sm ml-15px">pause</div>
        <div v-if="!isActive" class="h3-sm ml-15px">resume</div>
      </div>
    </div>
    <div class="grid grid-cols-6 gap-2 justify-center h-2">
      <div
        v-for="n in timerStore.sessions"
        :key="n"
        class="bg-design-1 w-2 h-2 rounded"
      ></div>
    </div>
    <div class="cursor-pointer" @click="modalStore.modalVisible = true">
      <img src="@/assets/icon-settings.svg" alt="settings" />
    </div>
  </div>
  <c-modal v-if="modalStore.modalVisible" />
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'

import { useModalStore, useTimerStore } from '@/store'

import cFitty from './cFitty.vue'
import cModal from './cModal.vue'
import drawCircle from './favicons'
import useTimer from './useTimer'

export default defineComponent({
  name: 'MainPage',
  components: {
    cModal,
    cFitty
  },

  setup() {
    const { timerToTime, pause, resume, reset, start, isActive, initTimer } =
      useTimer()

    const modalStore = useModalStore()
    const timerStore = useTimerStore()

    provide('pause', pause)
    provide('reset', reset)

    return {
      timerToTime,
      resume,
      start,
      isActive,
      initTimer,

      drawCircle,

      modalStore,
      timerStore
    }
  }
})
</script>

<style scoped>
.pill-selected > span {
  opacity: 1;
}
</style>
