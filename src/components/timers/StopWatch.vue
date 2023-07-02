<template lang="pug">
  // TODO: Where is pause and reset?
  q-btn.timer(
    round,
    @click="changeState")
    // TODO: Where is hours, days, years?
    // Sec + ms, min + sec + ms, hr + min + sec, day + hr + min, year + days + hrs
    | {{ `${minutes}:${seconds}` }}
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { Ref } from 'vue';

  // contains Date object with time 00:00:00
  const time: Ref<Date> = ref(new Date(0));
  const timer: Ref<number> = ref(0); // containing timer setInterval
  // TODO: Use padStart for seconds
  const seconds: Ref<string> = ref('00'); // for seconds to display at page
  const minutes: Ref<string> = ref('00'); // for minutes to display at page
  const isRunning: Ref<boolean> = ref(false); // to check if timer is stopped

  function changeState(): void {
    isRunning.value = !isRunning.value;
    if (isRunning.value) {
      start();
    } else stop();
  }

  function start() {
    // starting a new timer where updating the Date object
    timer.value = setInterval(() => {
      time.value = new Date(time.value.getTime() + 1000);
      // adding leading zero in case of seconds will be from 0 to 9
      seconds.value =
        time.value.getSeconds() < 10
          ? '0' + time.value.getSeconds()
          : time.value.getSeconds().toString();
      // adding leading zero in case of minutes will be from 0 to 9
      minutes.value =
        time.value.getMinutes() < 10
          ? '0' + time.value.getMinutes()
          : time.value.getMinutes().toString();
    }, 1000);
  }

  function stop() {
    // stopping the timer
    clearInterval(timer.value);
  }
</script>

<style lang="sass" scoped>
  .timer
    // TODO: Margin must be in container
    margin: 15px
    width: 200px
    height: 200px
    font-size: 40px
</style>
