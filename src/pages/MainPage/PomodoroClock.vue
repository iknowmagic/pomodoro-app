<template>
  <div
    class="group cursor-pointer g-1 rounded-full w-312px h-312px md:w-410px md:h-410px min-h-312px min-w-312px flex flex-col justify-center items-center ml-[-5px]"
    style="
      background: linear-gradient(315deg, #2e325a 0%, #0e112a 100%);
      box-shadow: -50px -50px 100px #272c5a, 50px 50px 100px #121530;
    "
  >
    <div
      class="bg-design-8 rounded-full gap-1rem h-[90%] w-[90%] flex flex-col justify-center items-center"
      :style="progressBarStyle"
      role="progressbar"
      aria-label="progress bar"
      @click="isActive ? pause() : resume()"
    >
      <c-fitty
        :active="timerToTime.toString().length > 5 || spFont === 'h1-mono'"
        :class="[
          `pt-8 h1-sm h1-sm md:h1-lg`,
          { 'leading-106px tracking-[0px]': spFont === 'h1-serif' },
          { 'font-normal tracking-[-8px]': spFont === 'h1-mono' },
          { 'text-6rem': timerToTime.toString().length === 2 },
          { 'pt-2': timerToTime.toString().length === 2 }
        ]"
      >
        {{ timerToTime }}
      </c-fitty>

      <div
        v-if="showCompletedPomodoros"
        :class="[
          'h4-sm ml-10px',
          { 'text-gray-500': timerType !== 'pomodoro' }
        ]"
      >
        {{ pomodoros }} / 4
      </div>
      <div
        v-if="isActive"
        class="h3-sm h3-sm md:h3-lg ml-15px group-hover:text-design-1"
      >
        pause
      </div>
      <div
        v-if="!isActive"
        class="h3-sm h3-sm md:h3-lg ml-15px group-hover:text-design-1"
      >
        resume
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

import { SimpleObject } from '@/types'

import cFitty from './cFitty.vue'
import drawCircle from './favicons'

export default defineComponent({
  name: 'PomodoroClock',
  components: {
    cFitty
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    },

    showCompletedPomodoros: {
      type: Boolean,
      default: true
    },
    pomodoros: {
      type: Number,
      default: 0
    },
    timerType: {
      type: String,
      default: 'pomodoro'
    },
    timerToTime: {
      type: String,
      default: null
    },
    spFont: {
      type: String,
      default: null
    },
    percentage: {
      type: Number,
      default: 0
    }
  },
  emits: ['pause', 'resume'],
  setup(props, { emit }) {
    const mq = inject('mq') as SimpleObject

    const progressBarStyle = computed(() => {
      if (mq.sm.value) {
        return `
          background-image: url('${drawCircle(props.percentage)}');
          background-repeat: no-repeat;
          background-size: 275px 275px;
          background-position: center center;
          `
      }
      return `
          background-image: url('${drawCircle(props.percentage)}');
          background-repeat: no-repeat;
          background-size: 366px 366px;
          background-position: center center;
          `
    })

    const pause = () => {
      emit('pause')
    }

    const resume = () => {
      emit('resume')
    }

    return {
      pause,
      resume,

      mq,
      progressBarStyle
    }
  }
})
</script>
