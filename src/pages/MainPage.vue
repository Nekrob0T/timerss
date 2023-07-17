<template lang="pug">
  q-page(padding)
    .selectTimer
      StopWatch(
        draggable="true",
        @dragstart="onDragStart($event, types.StopWatchTimer)")
      Counter(
        draggable="true",
        @dragstart="onDragStart($event, types.CounterTimer)")
      Clock(
        draggable="true",
        @dragstart="onDragStart($event, types.ClockTimer)")
      CountDown(
        draggable="true",
        @dragstart="onDragStart($event, types.CountDownTimer)")
      CountUp(
        draggable="true",
        @dragstart="onDragStart($event, types.CountUpTimer)")
      Quick(
        draggable="true",
        @dragstart="onDragStart($event, types.QuickTimer)")
      Lap(
        draggable="true",
        @dragstart="onDragStart($event, types.LapTimer)")
      Pomodoro(
        draggable="true",
        @dragstart="onDragStart($event, types.PomodoroTimer)")
      Interval(
        draggable="true",
        @dragstart="onDragStart($event, types.IntervalTimer)")
      Stepped(
        draggable="true",
        @dragstart="onDragStart($event, types.SteppedTimer)")

    .timers(
      @drop="onDrop($event)",
      @dragover.prevent,
      @dragenter.prevent)
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
</template>

<script lang="ts" setup>
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

  function onDragStart(e: DragEvent, timerType: string) {
    // pass type of timer for correct show
    e.dataTransfer?.setData('timerType', timerType);
  }

  function onDrop(e: DragEvent) {
    // receive type of timer for correct show
    const timerType = e.dataTransfer?.getData('timerType');

    addTimer(timerType);
  }

  const { timers, addTimer, removeTimer } = useTimers();
</script>

<style lang="sass" scoped>
  .add
    width: 200px
    height: 200px
    font-size: 40px

  .selectTimer
    display: flex
    flex-direction: row
    justify-content: space-around

    *
      width: 120px
      height: 120px
      font-size: 1em

  .timers
    display: flex
    flex-flow: row wrap
    margin-top: 20px
    gap: 10px 10px
    min-height: 200px
    min-width: 100%
</style>
