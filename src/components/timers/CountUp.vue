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
  /* 
    ! this component same as StopWatch but can send messages at certain time 
    TODO: add function to send messages  
  */

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

  // contains text with current CountUp's time
  const time: Ref<string> = ref('00:00');
  // containing Date object with time when CountUp was started
  let timeStart: any = null;
  // containing Date object with time when CountUp was paused
  let timeStopped: any = null;
  // containing time between stop and current time
  let stoppedDuration = 0;
  // containing timer setInterval
  let timer = 0;
  // to check if timer is stopped
  const isRunning: Ref<boolean> = ref(false);
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
    // creating Date object to save start of the CountUp
    if (timeStart === null) {
      timeStart = new Date();
    }

    if (timeStopped !== null) {
      // adding difference between current time and time when CountUp was stopped
      stoppedDuration += new Date().getTime() - timeStopped;
    }

    timer = setInterval(clockRunning, 1000);
  }

  // updating the timer
  function clockRunning(): void {
    const currentTime: Date = new Date();
    /* except difference between current time and start time
        we must subtract the time
        when CountUp was stopped in order to show proper time
        even after a couple of minutes or hours after pause
    */
    const timeElapsed: Date = new Date(
      currentTime.getTime() - timeStart - stoppedDuration
    );
    // days calculated by division because method getUTCDay() will return 4
    const day: number = Math.floor(timeElapsed.getTime() / 86400000);
    // no problems with hours, minutes, seconds and milliseconds because they start from 0
    const hour: number = timeElapsed.getUTCHours();
    const min: number = timeElapsed.getUTCMinutes();
    const sec: number = timeElapsed.getUTCSeconds();

    if (day > 0) {
      // pattern: 12d 23:12
      time.value =
        day.toString() +
        'd ' +
        hour.toString().padStart(2, '0') +
        ':' +
        min.toString().padStart(2, '0');
    } else if (hour > 0) {
      // pattern: 23:12:30
      time.value =
        hour.toString().padStart(2, '0') +
        ':' +
        min.toString().padStart(2, '0') +
        ':' +
        sec.toString().padStart(2, '0');
    } else {
      // pattern: 12:30
      time.value =
        min.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0');
    }
  }

  // resetting the timer to 00:00
  function reset(): void {
    clearInterval(timer);
    stoppedDuration = 0;
    timeStart = null;
    timeStopped = null;
    isRunning.value = false;
    time.value = '00:00';
  }

  // stopping the timer and adding current clock time as stop time
  function stop(): void {
    timeStopped = new Date();
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
    border: 8px solid green
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
