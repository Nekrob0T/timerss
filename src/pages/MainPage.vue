<template lang="pug">
  q-page(padding)
    template(
      v-for="timer in timers",
      :key="timer.uniqueID")
      StopWatch.item(
        :options="timer",
        @removeTimer="removeTimer(timer.uniqueID)")
    q-btn.add(
      round,
      icon="add",
      @click="addTimer")
</template>

<script lang="ts" setup>
  import StopWatch from '@/components/timers/StopWatch.vue';
  import useUniqueId from '@/composable/uid';
  import useTimers from '@/composable/timers';

  const { timers, addTimer, removeTimer } = useTimers();
  const { uid } = useUniqueId();
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
