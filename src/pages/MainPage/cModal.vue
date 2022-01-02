<template>
  <div
    class="w-full h-full absolute top-0 left-0 flex flex-col justify-center items-center py-16 text-design-8"
  >
    <div
      ref="modalRef"
      class="w-sm h-full z-10 flex flex-col items-center p-24px"
    >
      <div class="bg-design-6 relative rounded-15px h-full w-full min-h-sm">
        <div class="absolute w-full">
          <div class="flex flex-row justify-between px-8 py-6">
            <div class="h2-sm">Settings</div>
            <div
              class="cursor-pointer"
              @click="modalStore.modalVisible = false"
            >
              <img src="@/assets/icon-close.svg" alt="close" />
            </div>
          </div>
          <div class="bg-design-4 h-[1px] w-full"></div>
        </div>

        <div
          class="px-8 py-6 gap-18px grid mt-[80px] overflow-y-auto"
          style="height: calc(100% - 100px)"
        >
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
          <font-selector v-model:theme-font="tempThemeFont" />
          <div class="bg-design-4 h-[1px] w-full"></div>
          <div class="h4-sm text-center">Color</div>
          <color-selector v-model:theme-color="tempThemeColor" />
          <div class="bg-design-4 h-[1px] w-full"></div>
          <div class="h4-sm text-center">Advanced</div>
          <div class="flex flex-col gap-2">
            <toggle-switch
              v-model:active="tempShowSeconds"
              label="show seconds"
            />
            <toggle-switch
              v-model:active="tempShowCompletedPomodoros"
              label="show completed pomodors"
            />
          </div>
        </div>
      </div>
      <div
        class="cursor-pointer w-140px z-12 mt-[-30px] rounded-30px bg-design-theme group"
      >
        <div
          class="cursor-pointer w-140px px-12 py-4 text-center rounded-30px font-bold group-hover:bg-design-7 text-design-6 group-hover:bg-opacity-20"
          @click="applySettings"
        >
          Apply
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch } from 'vue'

import { onClickOutside } from '@vueuse/core'

import { useModalStore, useThemeStore, useTimerStore } from '@/store'

import InputNumber from '@/components/InputNumber'
import ToggleSwitch from '@/components/ToggleSwitch'

import ColorSelector from './ColorSelector.vue'
import FontSelector from './FontSelector.vue'

export default defineComponent({
  name: 'CModal',
  components: { InputNumber, ToggleSwitch, ColorSelector, FontSelector },
  setup() {
    const pause = inject('pause') as () => null
    const reset = inject('reset') as () => null

    const needsReset = ref(false)

    const modalStore = useModalStore()
    const timerStore = useTimerStore()
    const themeStore = useThemeStore()

    const tempShowSeconds = ref(timerStore.showSeconds)
    const tempShowCompletedPomodoros = ref(timerStore.showCompletedPomodoros)

    const tempThemeFont = ref(themeStore.themeFont)
    const tempThemeColor = ref(themeStore.themeColor)

    const pomodoroValue = ref(timerStore.timerMap.pomodoro.duration / 60)
    const shortBreakValue = ref(timerStore.timerMap.shortBreak.duration / 60)
    const longBreakValue = ref(timerStore.timerMap.longBreak.duration / 60)

    watch(pomodoroValue, () => {
      needsReset.value = true
    })

    const applySettings = () => {
      timerStore.timerMap = {
        pomodoro: { duration: pomodoroValue.value * 60 },
        shortBreak: { duration: shortBreakValue.value * 60 },
        longBreak: { duration: longBreakValue.value * 60 }
      }

      themeStore.themeFont = tempThemeFont.value
      themeStore.themeColor = tempThemeColor.value

      timerStore.showSeconds = tempShowSeconds.value
      timerStore.showCompletedPomodoros = tempShowCompletedPomodoros.value

      document.documentElement.style.setProperty(
        '--theme-color',
        `var(--${themeStore.themeColor})`
      )

      pause()
      if (needsReset.value) {
        reset()
      }

      modalStore.modalVisible = false
    }

    const modalRef = ref(null)
    onClickOutside(modalRef, () => {
      modalStore.modalVisible = false
    })

    return {
      tempShowSeconds,
      tempShowCompletedPomodoros,

      pomodoroValue,
      shortBreakValue,
      longBreakValue,

      applySettings,
      modalStore,

      tempThemeFont,
      tempThemeColor,

      modalRef
    }
  }
})
</script>
