<template lang="pug">
  q-page(padding)
    template(
      v-for="timer in timers",
      :key="timer.uniqueID")
      StopWatch.item
    q-btn.add(
      round,
      icon="add",
      @click="addStopWatch")
</template>

<script lang="ts" setup>
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

<style lang="sass" scoped>
  .add
    width: 200px
    height: 200px
    font-size: 40px
    margin-left: 15px

  .item
    margin: 15px
</style>
