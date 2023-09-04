<template lang="pug">
  q-btn.timer(
    round,
    @click="changeState",
    @mouseenter="showButtons = true",
    @mouseleave="showButtons = false")
    span.laplabel
      | {{ `${timeLap}` }}
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

  // contains text with current Lap timer's time
  const time: Ref<string> = ref('00.000');
  // contains text with time when time was lapped
  const timeLap: Ref<string> = ref('');
  // contains Date object with current Lap timer time
  let timeStart: any = null;
  // contains timer setInterval
  let timer = 0;
  // to check if Lap timer is started
  let isStarted = false;
  // to check if reset and delete buttons must be shown
  const showButtons: Ref<boolean> = ref(false);

  // start/stop on click
  function changeState(): void {
    if (isStarted) {
      lap();
    } else {
      isStarted = true;
      start();
    }
  }

  // starting the timer
  function start(): void {
    timeStart = new Date();

    timer = setInterval(clockRunning, 10);
  }

  // updating the timer
  function clockRunning(): void {
    const currentTime: Date = new Date();
    /* find time difference between current and start */
    const timeElapsed: Date = new Date(currentTime.getTime() - timeStart);
    /* we must count years by division on length of one year in milliseconds
        because the Date object counting time from 1 Jan 1970
    */
    const year: number = Math.floor(timeElapsed.getTime() / 31536000000);
    /* same as for years, days calculated by division
        because method getUTCDay() will return 4
      ! important note: we should do modulus division to avoid situations
        when days are not reset after one year has passed. example: 5y 1825d
    */
    const day: number = Math.floor(timeElapsed.getTime() / 86400000) % 365;
    // no problems with hours, minutes, seconds and milliseconds because they start from 0
    const hour: number = timeElapsed.getUTCHours();
    const min: number = timeElapsed.getUTCMinutes();
    const sec: number = timeElapsed.getUTCSeconds();
    const ms: number = timeElapsed.getUTCMilliseconds();

    if (year > 0) {
      // pattern: 2000y 12d 23h
      time.value =
        year.toString() +
        'y ' +
        day.toString().padStart(2, '0') +
        'd ' +
        hour.toString().padStart(2, '0') +
        'h';
    } else if (day > 0) {
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
    } else if (min > 0) {
      // pattern: 12:30.789
      time.value =
        min.toString().padStart(2, '0') +
        ':' +
        sec.toString().padStart(2, '0') +
        '.' +
        ms.toString().padStart(3, '0');
    } else {
      // pattern: 30.789
      time.value =
        sec.toString().padStart(2, '0') + '.' + ms.toString().padStart(3, '0');
    }
  }

  // resetting the timer to 00.000
  function reset(): void {
    clearInterval(timer);
    timeStart = null;
    isStarted = false;
    timeLap.value = '';
    time.value = '00.000';
  }

  // reset the timer and save current time as lap time
  function lap(): void {
    timeLap.value = time.value;
    timeStart = new Date();
  }
</script>

<style lang="sass" scoped>
  .timer
    width: 200px
    height: 200px
    font-size: 35px
    text-transform: lowercase
    position: relative
    border: 8px solid yellow
    background: #000
    color: #fff

  .laplabel
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
