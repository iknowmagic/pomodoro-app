<template>
  <div
    class="group cursor-pointer bg-design-8 g-1 rounded-full w-312px h-312px min-h-312px min-w-312px flex flex-col justify-center items-center ml-[-5px]"
    style="
      background: linear-gradient(315deg, #2e325a 0%, #0e112a 100%);
      box-shadow: -50px -50px 100px #272c5a, 50px 50px 100px #121530;
    "
  >
    <div
      class="bg-design-8 rounded-full gap-1rem w-280px h-280px flex flex-col justify-center items-center"
      :style="`background-image: url('${drawCircle(percentage)}');
          background-repeat: no-repeat;
          background-size: 275px 275px;
          background-position: center center;
          `"
      role="progressbar"
      @click="isActive ? pause() : resume()"
    >
      <c-fitty
        :active="timerToTime.toString().length > 5 || spFont === 'h1-mono'"
        :class="[
          `pt-8 h1-sm`,
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
      <div v-if="isActive" class="h3-sm ml-15px group-hover:text-design-1">
        pause
      </div>
      <div v-if="!isActive" class="h3-sm ml-15px group-hover:text-design-1">
        resume
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
    const pause = () => {
      emit('pause')
    }

    const resume = () => {
      emit('resume')
    }

    return {
      pause,
      resume,

      drawCircle
    }
  }
})
</script>
