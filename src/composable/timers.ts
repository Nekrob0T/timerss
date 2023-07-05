import { shallowRef } from 'vue';
import useUniqueId from '@/composable/uid';

/* usage of shallowRef is better than ref
    because we don't have to look at timers properties deeply */
const timers = shallowRef<any[]>([]);
// composable for generating unique id
const { uid } = useUniqueId();

export default function useTimers(): any {
  function addTimer() {
    timers.value = [...timers.value, { uniqueID: uid(), timerType: '' }];
  }

  function removeTimer(id: string): void {
    // creating new array without removed timer
    timers.value = timers.value.filter((el) => el.uniqueID !== id);
  }

  return { timers, addTimer, removeTimer };
}
