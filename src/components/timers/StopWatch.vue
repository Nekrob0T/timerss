<template lang="pug">
RoundButton(@click="isRunning = !isRunning") {{ `${minutes}:${seconds}` }}
</template>

<script lang="ts" setup>
/* eslint-disable */
import RoundButton from '@/components/UI/RoundButton.vue';
import { ref, watch } from 'vue';
import type { Ref } from 'vue';

const time: Ref<Date> = ref(new Date(0)); // contains Date object with time 00:00:00
const timer: Ref<number> = ref(0); // containing timer setInterval
const seconds: Ref<string> = ref('00'); // for seconds to display at page
const minutes: Ref<string> = ref('00'); // for minutes to display at page
const isRunning: Ref<boolean> = ref(false); // to check if timer is stopped

// watching if value of the variable is changed in order to stop or start the timer
watch(isRunning, (newVal) => {
  // if newVal (isRunning) is equals to true then start
  if (newVal) start();
  else stop();
});

// watching the change of time variable to show the user current time on stopwatch
watch(time, (newVal) => {
  // adding leading zero in case of seconds will be from 0 to 9
  seconds.value =
    newVal.getSeconds() < 10 ? '0' + newVal.getSeconds() : newVal.getSeconds().toString();
  // adding leading zero in case of minutes will be from 0 to 9
  minutes.value =
    newVal.getMinutes() < 10 ? '0' + newVal.getMinutes() : newVal.getMinutes().toString();
});

function start() {
  // starting a new timer where updating the Date object
  timer.value = setInterval(() => {
    time.value = new Date(time.value.getTime() + 1000);
  }, 1000);
}

function stop() {
  // stopping the timer
  clearInterval(timer.value);
}
</script>
