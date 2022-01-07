<template>
  <div
    class="flex flex-col gap-3rem justify-start items-center w-sm md:w-md h-full px-20px"
  >
    <header>
      <h1 class="text-design-4 h2-sm md:h2-lg mt-11.5 mb-2.7">pomodoro</h1>
    </header>
    <nav class="z-1">
      <pomodoro-pills
        :timer-type="timerStore.timerType"
        @initTimer="initTimer"
      />
    </nav>
    <main>
      <pomodoro-clock
        :is-active="isActive"
        :pomodoros="timerStore.pomodoros"
        :timer-type="timerStore.timerType"
        :timer-to-time="timerToTime.toString()"
        :sp-font="spFont"
        :percentage="timerStore.percentage"
        :show-completed-pomodoros="timerStore.showCompletedPomodoros"
        @pause="pause"
        @resume="timerStore.percentage === 0 ? start() : resume()"
      />

      <div
        v-if="timerStore.showCompletedPomodoros && timerStore.sessions"
        class="grid grid-cols-6 gap-2 justify-center mt-[-10px]"
      >
        <div
          v-for="n in timerStore.sessions"
          :key="n"
          class="bg-design-theme w-2 h-2 rounded"
        ></div>
      </div>
    </main>
    <footer>
      <div
        class="cursor-pointer opacity-40 hover:opacity-80 mt-4"
        @click="modalStore.modalVisible = true"
      >
        <img src="@/assets/icon-settings.svg" alt="settings" />
      </div>
    </footer>
  </div>
  <c-modal v-if="modalStore.modalVisible" />
</template>

<script lang="ts">
import { defineComponent, provide, ref, watch } from 'vue'

import { useModalStore, useThemeStore, useTimerStore } from '@/store'

import cModal from './cModal.vue'
import drawCircle from './favicons'
import PomodoroClock from './PomodoroClock.vue'
import PomodoroPills from './PomodoroPills.vue'
import useTimer from './useTimer'

export default defineComponent({
  name: 'MainPage',
  components: {
    cModal,
    PomodoroPills,
    PomodoroClock
  },

  setup() {
    const { timerToTime, pause, resume, reset, start, isActive, initTimer } =
      useTimer()

    const modalStore = useModalStore()
    const timerStore = useTimerStore()
    const themeStore = useThemeStore()

    provide('pause', pause)
    provide('reset', reset)

    const spFont = ref(`h1-${themeStore.themeFont}`)

    watch(themeStore, () => {
      spFont.value = `h1-${themeStore.themeFont}`
    })

    return {
      timerToTime,
      resume,
      pause,
      start,
      isActive,
      initTimer,

      drawCircle,

      modalStore,
      timerStore,
      themeStore,

      spFont
    }
  }
})
</script>
