<template lang="pug">
  q-page(padding)
    .selectTimer
      select(v-model="selectedTimer")
        option(
          v-for="option in selectTimers",
          :key="option.value",
          :value="option.value")
          | {{ option.text }}

    .timers
      template(v-for="timer in timers")
        StopWatch(
          v-if="timer.timerType === types.StopWatchTimer",
          :options="timer",
          :key="timer.uniqueID",
          @removeTimer="removeTimer(timer.uniqueID)")
        Counter(
          v-if="timer.timerType === types.CounterTimer",
          :options="timer",
          :key="timer.uniqueID",
          @removeTimer="removeTimer(timer.uniqueID)")
        Clock(
          v-if="timer.timerType === types.ClockTimer",
          :options="timer",
          :key="timer.uniqueID",
          @removeTimer="removeTimer(timer.uniqueID)")
        CountDown(
          v-if="timer.timerType === types.CountDownTimer",
          :options="timer",
          :key="timer.uniqueID",
          @removeTimer="removeTimer(timer.uniqueID)")
        CountUp(
          v-if="timer.timerType === types.CountUpTimer",
          :options="timer",
          :key="timer.uniqueID",
          @removeTimer="removeTimer(timer.uniqueID)")
        Quick(
          v-if="timer.timerType === types.QuickTimer",
          :options="timer",
          :key="timer.uniqueID",
          @removeTimer="removeTimer(timer.uniqueID)")
        Lap(
          v-if="timer.timerType === types.LapTimer",
          :options="timer",
          :key="timer.uniqueID",
          @removeTimer="removeTimer(timer.uniqueID)")
        Pomodoro(
          v-if="timer.timerType === types.PomodoroTimer",
          :options="timer",
          :key="timer.uniqueID",
          @removeTimer="removeTimer(timer.uniqueID)")
        Interval(
          v-if="timer.timerType === types.IntervalTimer",
          :options="timer",
          :key="timer.uniqueID",
          @removeTimer="removeTimer(timer.uniqueID)")
        Stepped(
          v-if="timer.timerType === types.SteppedTimer",
          :options="timer",
          :key="timer.uniqueID",
          @removeTimer="removeTimer(timer.uniqueID)")
      q-btn.add(
        round,
        icon="add",
        @click="addTimer(selectedTimer)")
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { Ref } from 'vue';
  import StopWatch from '@/components/timers/StopWatch.vue';
  import Counter from '@/components/timers/Counter.vue';
  import Clock from '@/components/timers/Clock.vue';
  import CountDown from '@/components/timers/CountDown.vue';
  import CountUp from '@/components/timers/CountUp.vue';
  import Quick from '@/components/timers/Quick.vue';
  import Lap from '@/components/timers/Lap.vue';
  import Pomodoro from '@/components/timers/Pomodoro.vue';
  import Interval from '@/components/timers/Interval.vue';
  import Stepped from '@/components/timers/Stepped.vue';
  import types from '@/composable/timerTypes';
  import useTimers from '@/composable/timers';

  const selectedTimer: Ref<string> = ref(types.StopWatchTimer);

  const selectTimers: Ref<Array<object>> = ref([
    { text: 'Stopwatch', value: types.StopWatchTimer },
    { text: 'Counter', value: types.CounterTimer },
    { text: 'Clock', value: types.ClockTimer },
    { text: 'Countdown', value: types.CountDownTimer },
    { text: 'Countup', value: types.CountUpTimer },
    { text: 'Quick', value: types.QuickTimer },
    { text: 'Lap', value: types.LapTimer },
    { text: 'Pomodoro', value: types.PomodoroTimer },
    { text: 'Interval', value: types.IntervalTimer },
    { text: 'Stepped', value: types.SteppedTimer }
  ]);

  const { timers, addTimer, removeTimer } = useTimers();
</script>

<style lang="sass" scoped>
  .add
    width: 200px
    height: 200px
    font-size: 40px

  .timers
    display: flex
    flex-flow: row wrap

    *
      margin-top: 10px
      margin-right: 10px
</style>
