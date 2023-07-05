<template lang="pug">
  q-page.flex(padding)
    template(v-for="timer in timers")
      StopWatch.item(
        v-if="timer.timerType === 'StopWatch'",
        :options="timer",
        :key="timer.uniqueID",
        @removeTimer="removeTimer(timer.uniqueID)")
      Counter.item(
        v-if="timer.timerType === 'Counter'",
        :options="timer",
        :key="timer.uniqueID",
        @removeTimer="removeTimer(timer.uniqueID)")
    q-btn.add(
      round,
      icon="add",
      @click="addTimer('Counter')")
</template>

<script lang="ts" setup>
  import StopWatch from '@/components/timers/StopWatch.vue';
  import Counter from '@/components/timers/Counter.vue';
  import useTimers from '@/composable/timers';

  const { timers, addTimer, removeTimer } = useTimers();
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
