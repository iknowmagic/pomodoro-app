<template>
  <div
    role="navigation"
    class="px-1 text-design-4 body-2 body-2 md:body-1 grid grid-cols-3 items-center text-center bg-design-8 h-4rem w-full rounded-5rem"
  >
    <div
      v-for="pomodoro in pomodoros"
      :key="pomodoro.timerType"
      :class="[
        'cursor-pointer p-1.1rem tracking-[-1px] md:tracking-normal mt-[-3px]',
        { 'pill-selected': timerType === pomodoro.timerType }
      ]"
      @click="initTimer(pomodoro.timerType)"
    >
      <span class="opacity-40 hover:opacity-100">{{ pomodoro.label }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PomodoroPills',
  props: {
    timerType: {
      type: String,
      default: null
    }
  },
  emits: ['initTimer'],
  setup(props, { emit }) {
    const initTimer = (type: string) => {
      emit('initTimer', type)
    }

    const pomodoros = [
      {
        timerType: 'pomodoro',
        label: 'pomodoro'
      },
      {
        timerType: 'shortBreak',
        label: 'short break'
      },
      {
        timerType: 'longBreak',
        label: 'long break'
      }
    ]

    return { initTimer, pomodoros }
  }
})
</script>

<style lang="scss" scoped>
.pill-selected > span {
  opacity: 1;
}
</style>
