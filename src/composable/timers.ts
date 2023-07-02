import { Ref, ref } from 'vue';

const timers: Ref<any[]> = ref([]);

export function useTimers() {
  function addTimer() {
    timers.value = [...timers.value, {}];
  }

  return { timers, addTimer };
}
