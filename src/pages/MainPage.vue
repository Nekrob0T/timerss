<template lang="pug">
  q-page.flex(padding)
    template(v-for="timer in timers")
      StopWatch(
        v-if="timer.timerType === 'StopWatch'",
        :options="timer",
        :key="timer.uniqueID",
        @removeTimer="removeTimer(timer.uniqueID)")
      Counter(
        v-if="timer.timerType === 'Counter'",
        :options="timer",
        :key="timer.uniqueID",
        @removeTimer="removeTimer(timer.uniqueID)")
      Clock(
        v-if="timer.timerType === 'Clock'",
        :options="timer",
        :key="timer.uniqueID",
        @removeTimer="removeTimer(timer.uniqueID)")
    q-btn.add(
      round,
      icon="add",
      @click="addTimer('Clock')")
</template>

<script lang="ts" setup>
  import StopWatch from '@/components/timers/StopWatch.vue';
  import Counter from '@/components/timers/Counter.vue';
  import Clock from '@/components/timers/Clock.vue';
  import useTimers from '@/composable/timers';

  const { timers, addTimer, removeTimer } = useTimers();
</script>

<style lang="sass" scoped>
  .add
    width: 200px
    height: 200px
    font-size: 40px

  .flex *
    margin-top: 15px
    margin-right: 15px
</style>
