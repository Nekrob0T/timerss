<template lang="pug">
  q-page(padding)
    template(
      v-for="timer in timers",
      :key="timer.uniqueID")
      StopWatch
    RoundButton(
      icon="add",
      @click="addStopWatch")
</template>

<script lang="ts" setup>
  /* eslint-disable */
  import RoundButton from '@/components/UI/RoundButton.vue';
  import StopWatch from '@/components/timers/StopWatch.vue';
  import { shallowRef } from 'vue';
  import type { Ref } from 'vue';

  const timers: Ref<Array<object>> = shallowRef([]);

  // const { timers, addTimer } = useTimers();

  function addStopWatch(): void {
    // TODO: try to generate unique ID.
    // For type create Enum
    timers.value = [...timers.value, { uniqueID: '', type: '' }];
  }
</script>
