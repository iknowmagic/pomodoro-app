<template>
  <div
    class="flex flex-col gap-3rem justify-center items-center w-sm h-full px-24px"
  >
    <div class="text-design-4 h2-sm">pomodoro</div>
    <pomodoro-pills
      :timer-type="timerStore.timerType"
      @initTimer="initTimer"
    />

    <pomodoro-clock
      :is-active="isActive"
      :pomodoros="timerStore.pomodoros"
      :timer-type="timerStore.timerType"
      :timer-to-time="timerToTime.toString()"
      :sp-font="spFont"
      :percentage="timerStore.percentage"
      @pause="pause"
      @resume="resume"
    />

    <div class="grid grid-cols-6 gap-2 justify-center h-2">
      <div
        v-for="n in timerStore.sessions"
        :key="n"
        class="bg-design-theme w-2 h-2 rounded"
      ></div>
    </div>
    <div
      class="cursor-pointer opacity-40 hover:opacity-80"
      @click="modalStore.modalVisible = true"
    >
      <img :src="iconSettings" alt="settings" />
    </div>
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

    modalStore.modalVisible = true

    provide('pause', pause)
    provide('reset', reset)

    const spFont = ref(`h1-${themeStore.themeFont}`)

    watch(themeStore, () => {
      spFont.value = `h1-${themeStore.themeFont}`
    })

    const iconSettings = `
    data:image/svg+xml;utf8,
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28">
      <path fill="white" d="M26.965 17.682l-2.927-2.317c.055-.448.097-.903.097-1.365 0-.462-.042-.917-.097-1.365l2.934-2.317a.702.702 0 00.167-.896l-2.775-4.851a.683.683 0 00-.847-.301l-3.454 1.407a10.506 10.506 0 00-2.345-1.379l-.52-3.71A.716.716 0 0016.503 0h-5.55a.703.703 0 00-.687.588l-.52 3.71c-.847.357-1.63.819-2.345 1.379L3.947 4.27a.691.691 0 00-.847.301L.325 9.422a.705.705 0 00.167.896l2.927 2.317c-.055.448-.097.903-.097 1.365 0 .462.042.917.097 1.365L.492 17.682a.702.702 0 00-.167.896L3.1 23.429a.683.683 0 00.847.301L7.4 22.323a10.506 10.506 0 002.345 1.379l.52 3.71c.056.329.34.588.687.588h5.55a.703.703 0 00.687-.588l.52-3.71c.847-.357 1.631-.819 2.346-1.379l3.454 1.407c.313.119.673 0 .847-.301l2.775-4.851a.705.705 0 00-.167-.896zM13.73 18.9c-2.685 0-4.857-2.191-4.857-4.9 0-2.709 2.172-4.9 4.857-4.9 2.684 0 4.856 2.191 4.856 4.9 0 2.71-2.172 4.9-4.856 4.9z" opacity="1"/>
    </svg>
    `
      .trim()
      .replace(/\n/g, ' ')
      .replace('#', '%23')

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

      spFont,
      iconSettings
    }
  }
})
</script>
