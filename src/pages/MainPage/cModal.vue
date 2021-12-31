<template>
  <div
    class="w-full h-full absolute top-0 left-0 flex flex-col justify-center items-center py-16 text-design-8"
  >
    <div class="w-sm h-full z-10 flex flex-col items-center p-24px">
      <div class="bg-design-6 rounded-15px h-full w-full">
        <div class="flex flex-row justify-between px-8 py-6">
          <div class="h2-sm">Settings</div>
          <div class="cursor-pointer" @click="modalStore.modalVisible = false">
            <img src="@/assets/icon-close.svg" alt="close" />
          </div>
        </div>
        <div class="bg-design-4 h-[1px] w-full"></div>
        <div class="px-8 py-6 gap-18px grid">
          <div class="h4-sm text-center">Time (minutes)</div>
          <div class="grid gap-2">
            <input-number v-model:value="pomodoroValue" label="pomodoro" />
            <input-number
              v-model:value="shortBreakValue"
              label="short break"
            />
            <input-number v-model:value="longBreakValue" label="long break" />
          </div>
          <div class="bg-design-4 h-[1px] w-full"></div>
          <div class="h4-sm text-center">Font</div>
          <div class="bg-design-4 h-[1px] w-full"></div>
          <div class="h4-sm text-center">Color</div>
        </div>
      </div>
      <div
        class="cursor-pointer w-140px z-12 px-12 py-4 text-center mt-[-30px] rounded-30px font-bold bg-design-1 text-design-6"
        @click="applySettings"
      >
        Apply
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'

import { useModalStore, useTimerStore } from '@/store'

import InputNumber from '@/components/InputNumber'

export default defineComponent({
  name: 'CModal',
  components: { InputNumber },
  setup() {
    const pause = inject('pause') as () => null
    const reset = inject('reset') as () => null

    const modalStore = useModalStore()
    const timerStore = useTimerStore()

    const pomodoroValue = ref(timerStore.timerMap.pomodoro.duration / 60)
    const shortBreakValue = ref(timerStore.timerMap.shortBreak.duration / 60)
    const longBreakValue = ref(timerStore.timerMap.longBreak.duration / 60)

    const applySettings = () => {
      timerStore.timerMap = {
        pomodoro: { duration: pomodoroValue.value * 60 },
        shortBreak: { duration: shortBreakValue.value * 60 },
        longBreak: { duration: longBreakValue.value * 60 }
      }

      pause()
      reset()

      modalStore.modalVisible = false
    }

    return {
      pomodoroValue,
      shortBreakValue,
      longBreakValue,

      applySettings,
      modalStore
    }
  }
})
</script>
