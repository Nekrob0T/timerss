<template lang="pug">
  q-btn.timer(
    round,
    @click="changeState",
    @mouseenter="showButtons = true",
    @mouseleave="showButtons = false")
    | {{ `${time}` }}

    q-btn.reset(
      v-show="showButtons",
      round,
      icon="rotate_right",
      @click.stop="reset")
    q-btn.delete(
      v-show="showButtons",
      round,
      icon="clear",
      @click.stop="deleteClick")
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { Ref } from 'vue';

  const props: any = defineProps({
    options: {
      type: Object,
      required: true
    }
  });
  const emit = defineEmits<{
    (e: 'removeTimer', id: string): void;
  }>();

  function deleteClick() {
    emit('removeTimer', props.uniqueId);
  }

  // contains text with current pomodoro timer's time
  const time: Ref<string> = ref('00:30');
  // containing timer setInterval
  let timer = 0;

  // TODO: values from props
  const workSec = 30;
  const workMin = 0;
  const workHours = 0;
  // work time per cycle (default: 30sec)
  let workTime: Date = new Date(
    (workHours * 3600 + workMin * 60 + workSec) * 1000
  );
  const breakSec = 10;
  const breakMin = 0;
  const breakHours = 0;
  // break time per cycle (default: 10sec)
  let breakTime: Date = new Date(
    (breakHours * 3600 + breakMin * 60 + breakSec) * 1000
  );
  let longBreakCount = 0;
  const longBreakCycle = 4;
  const longBreakSec = 20;
  const longBreakMin = 0;
  const longBreakHours = 0;
  // long break time per cycle (default: 20sec)
  let longBreakTime: Date = new Date(
    (longBreakHours * 3600 + longBreakMin * 60 + longBreakSec) * 1000
  );

  // to check if timer is stopped
  const isRunning: Ref<boolean> = ref(false);
  // to check if it's time for work
  const isWork: Ref<boolean> = ref(true);
  // to check if reset and delete buttons must be shown
  const showButtons: Ref<boolean> = ref(false);

  // start/stop on click
  function changeState(): void {
    isRunning.value = !isRunning.value;

    if (isRunning.value) {
      start();
    } else stop();
  }

  // starting the timer
  function start(): void {
    // pass proper time to the function depending on what period is now
    if (isWork.value) {
      timer = setInterval(() => clockRunning(workTime), 1000);
    } else {
      // after each cycle increment count of finished cycles
      longBreakCount++;

      // check if it's time to show long break or not
      if (longBreakCount >= longBreakCycle) {
        timer = setInterval(() => clockRunning(longBreakTime), 1000);
        longBreakCount = 0;
      } else {
        timer = setInterval(() => clockRunning(breakTime), 1000);
      }
    }
  }

  // updating the timer
  // receive timeObj parameter then function knows which time to show
  function clockRunning(timeObj: Date): void {
    const hour: number = timeObj.getUTCHours();
    const min: number = timeObj.getUTCMinutes();
    const sec: number = timeObj.getUTCSeconds();

    if (hour > 0) {
      // pattern: 23:12:30
      time.value =
        hour.toString().padStart(2, '0') +
        ':' +
        min.toString().padStart(2, '0') +
        ':' +
        sec.toString().padStart(2, '0');
    } else if (min > 0 || sec > 0) {
      // pattern: 12:30
      time.value =
        min.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0');
    } else {
      // stop the timer
      clearInterval(timer);

      // change state of Pomodoro timer
      if (isWork.value) {
        // if it was work period we need to change it to break period
        isWork.value = false;

        // update work and long break time because they are 00:00:00 after work
        workTime = new Date((workHours * 3600 + workMin * 60 + workSec) * 1000);
        longBreakTime = new Date(
          (longBreakHours * 3600 + longBreakMin * 60 + longBreakSec) * 1000
        );

        start();
      } else {
        // if it was break or long break period we need to change it to work period
        isWork.value = true;

        // update break time because it is 00:00:00 after break
        breakTime = new Date(
          (breakHours * 3600 + breakMin * 60 + breakSec) * 1000
        );

        start();
      }
    }

    // updating time (work, break or long break)
    timeObj.setTime(timeObj.getTime() - 1000);
  }

  // resetting the timer to default
  function reset(): void {
    clearInterval(timer);
    workTime = new Date((workHours * 3600 + workMin * 60 + workSec) * 1000);
    breakTime = new Date((breakHours * 3600 + breakMin * 60 + breakSec) * 1000);
    longBreakTime = new Date(
      (longBreakHours * 3600 + longBreakMin * 60 + longBreakSec) * 1000
    );
    isRunning.value = false;
    isWork.value = true;
    time.value = '00:30';
  }

  // stopping the timer and adding current clock time as stop time
  function stop(): void {
    clearInterval(timer);
  }
</script>

<style lang="sass" scoped>
  .timer
    width: 200px
    height: 200px
    font-size: 35px
    text-transform: lowercase
    position: relative
    border: 8px solid teal
    background: #000
    color: #fff

  .reset
    position: absolute
    top: 8px
    left: 8px
    background: #ffa500

  .delete
    position: absolute
    top: 8px
    right: 8px
    background: red
</style>
