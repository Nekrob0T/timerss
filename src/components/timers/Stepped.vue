<template lang="pug">
  q-btn.timer(
    round,
    @click="changeState",
    @mouseenter="showButtons = true",
    @mouseleave="showButtons = false")
    span.totalTimeLabel
      | {{ `${totalTimeLabel}` }}
    span
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

  // contains text with current interval timer's period of time
  const time: Ref<string> = ref('00:10');
  // contains text with current quick timer's time
  const totalTimeLabel: Ref<string> = ref('00:45');
  // containing timer setInterval
  let timer = 0;
  // containing timer setInterval with total time of all intervals and breaks
  let totalTimeTimer = 0;

  // TODO: values from props
  const intervalSec = 10;
  const intervalMin = 0;
  const intervalHours = 0;
  // interval time per cycle (default: 10sec)
  let intervalTime: Date = new Date(
    (intervalHours * 3600 + intervalMin * 60 + intervalSec) * 1000
  );
  const breakSec = 5;
  const breakMin = 0;
  const breakHours = 0;
  // break time per cycle (default: 5sec)
  let breakTime: Date = new Date(
    (breakHours * 3600 + breakMin * 60 + breakSec) * 1000
  );
  let intervalCount = 0;
  const intervalCycle = 3;
  let totalTime: Date = new Date(
    ((intervalHours * 3600 + intervalMin * 60 + intervalSec) * 1000 +
      (breakHours * 3600 + breakMin * 60 + breakSec) * 1000) *
      intervalCycle
  );

  // to check if timer is stopped
  const isRunning: Ref<boolean> = ref(false);
  // to check if it's time for work
  const isInterval: Ref<boolean> = ref(true);
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
    // start timer to show total time left
    totalTimeTimer = setInterval(
      () => clockRunning(totalTime, totalTimeLabel),
      1000
    );

    // pass proper time to the function depending on what period is now
    if (isInterval.value) {
      // after each cycle increment count of finished cycles
      intervalCount++;

      // check if it's time to stop interval timer or not
      if (intervalCount <= intervalCycle) {
        timer = setInterval(() => clockRunning(intervalTime, time), 1000);
      } else {
        stop();
        totalTimeLabel.value = '00:00';
        time.value = 'completed';
      }
    } else {
      timer = setInterval(() => clockRunning(breakTime, time), 1000);
    }
  }

  // updating the timer
  // receive timeObj parameter then function knows which time to show
  function clockRunning(timeObj: Date, label: Ref<string>): void {
    const hour: number = timeObj.getUTCHours();
    const min: number = timeObj.getUTCMinutes();
    const sec: number = timeObj.getUTCSeconds();

    if (hour > 0) {
      // pattern: 23:12:30
      label.value =
        hour.toString().padStart(2, '0') +
        ':' +
        min.toString().padStart(2, '0') +
        ':' +
        sec.toString().padStart(2, '0');
    } else if (min > 0 || sec > 0) {
      // pattern: 12:30
      label.value =
        min.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0');
    } else {
      // stop the timer
      clearInterval(timer);
      clearInterval(totalTimeTimer);
      isRunning.value = false;

      // change state of Stepped timer
      if (isInterval.value) {
        // if it was work period we need to change it to break period
        isInterval.value = false;

        // update work and long break time because they are 00:00:00 after work
        intervalTime = new Date(
          (intervalHours * 3600 + intervalMin * 60 + intervalSec) * 1000
        );
      } else {
        // if it was break period we need to change it to interval period
        isInterval.value = true;

        // update break time because it is 00:00:00 after break
        breakTime = new Date(
          (breakHours * 3600 + breakMin * 60 + breakSec) * 1000
        );
      }
    }

    // updating time (interval or break)
    timeObj.setTime(timeObj.getTime() - 1000);
  }

  // resetting the timer to default
  function reset(): void {
    clearInterval(timer);
    clearInterval(totalTimeTimer);
    intervalTime = new Date(
      (intervalHours * 3600 + intervalMin * 60 + intervalSec) * 1000
    );
    breakTime = new Date((breakHours * 3600 + breakMin * 60 + breakSec) * 1000);
    totalTime = new Date(
      ((intervalHours * 3600 + intervalMin * 60 + intervalSec) * 1000 +
        (breakHours * 3600 + breakMin * 60 + breakSec) * 1000) *
        intervalCycle
    );
    isRunning.value = false;
    isInterval.value = true;
    intervalCount = 0;
    time.value = '00:10';
    totalTimeLabel.value = '00:45';
  }

  // stopping the timer and adding current clock time as stop time
  function stop(): void {
    clearInterval(timer);
    clearInterval(totalTimeTimer);
  }
</script>

<style lang="sass" scoped>
  .timer
    width: 200px
    height: 200px
    font-size: 35px
    text-transform: lowercase
    position: relative
    border: 8px solid fuchsia
    background: #000
    color: #fff

  .totalTimeLabel
    position: absolute
    left: 50%
    top: 10%
    transform: translateX(-50%)
    font-size: 20px

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
