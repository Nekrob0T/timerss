<template lang="pug">
  //- TODO: Where is pause and reset?
  q-btn.timer(
    round,
    @click="changeState")
    | {{ `${time}` }}
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { Ref } from 'vue';

  // contains text with current stopwatch's time
  const time: Ref<string> = ref('00.000');
  // containing Date object with time when stopwatch was started
  let timeStart: any = new Date();
  // containing Date object with time when stopwatch was paused
  let timeStopped: any = null;
  // containing time between stop and current time
  let stoppedDuration = 0;
  // containing timer setInterval
  let timer = 0;
  // to check if timer is stopped
  const isRunning: Ref<boolean> = ref(false);

  // start/stop on click
  function changeState(): void {
    isRunning.value = !isRunning.value;
    if (isRunning.value) {
      start();
    } else stop();
  }

  // starting the timer
  function start(): void {
    if (timeStopped !== null) {
      // adding difference between current time and time when stopwatch was stopped
      stoppedDuration += new Date().getTime() - timeStopped;
    }

    // starting a new timer
    timer = setInterval(clockRunning, 10);
  }

  // updating the timer
  function clockRunning(): void {
    const currentTime = new Date(),
      /* except difference between current time and start time
          we must subtract the time
          when stopwatch was stopped in order to show proper time
          even after a couple of minutes or hours after pause
      */
      timeElapsed = new Date(
        currentTime.getTime() - timeStart - stoppedDuration
      ),
      /* we must count years by division on length of one year in milliseconds
          because the Date object counting time from 1 Jan 1970
      */
      year = Math.floor(timeElapsed.getTime() / 31536000000),
      /* same as for years, days calculated by division
          because method getUTCDay() will return 1
       */
      day = Math.floor(timeElapsed.getTime() / 86400000),
      // no problems with hours, minutes, seconds and milliseconds because they start from 0
      hour = timeElapsed.getUTCHours(),
      min = timeElapsed.getUTCMinutes(),
      sec = timeElapsed.getUTCSeconds(),
      ms = timeElapsed.getUTCMilliseconds();

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

  function reset(): void {
    clearInterval(timer);
    stoppedDuration = 0;
    timeStart = null;
    timeStopped = null;
    time.value = '00.000';
  }

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
</style>
