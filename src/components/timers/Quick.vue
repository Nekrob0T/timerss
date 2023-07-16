<template lang="pug">
  q-btn.timer(
    round,
    @click="changeState",
    @mouseenter="showButtons = true",
    @mouseleave="showButtons = false")
    | {{ `${time}` }}

    q-btn.reset(
      v-show="showButtons",
      round,
      icon="rotate_right",
      @click.stop="reset")
    q-btn.delete(
      v-show="showButtons",
      round,
      icon="clear",
      @click.stop="deleteClick")
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { Ref } from 'vue';

  const props: any = defineProps({
    options: {
      type: Object,
      required: true
    }
  });
  const emit = defineEmits<{
    (e: 'removeTimer', id: string): void;
  }>();

  function deleteClick() {
    emit('removeTimer', props.uniqueId);
  }

  // contains text with current quick timer's time
  const time: Ref<string> = ref('00:05');
  // containing timer setInterval
  let timer = 0;
  // TODO: values from props
  const seconds = 5;
  const minutes = 0;
  const hours = 0;
  const days = 0;
  // time from which we start quick timer (default: 5sec)
  let startTime: Date = new Date(
    (days * 86400 + hours * 3600 + minutes * 60 + seconds) * 1000
  );

  // to check if timer is stopped
  const isRunning: Ref<boolean> = ref(false);
  // to check if timer is completed
  let isCompleted = false;
  // to check if reset and delete buttons must be shown
  const showButtons: Ref<boolean> = ref(false);

  // start/stop/reset on click
  function changeState(): void {
    isRunning.value = !isRunning.value;

    // to restrict user to continue the timer's work after ending, reset the timer
    if (isCompleted) {
      reset();
    } else {
      if (isRunning.value) {
        start();
      } else stop();
    }
  }

  // starting the timer
  function start(): void {
    timer = setInterval(clockRunning, 1000);
  }

  // updating the timer
  function clockRunning(): void {
    /* days calculated by division
        because method getUTCDay() will return 4
    */
    const day: number = Math.floor(startTime.getTime() / 86400000);
    // no problems with hours, minutes, seconds and milliseconds because they start from 0
    const hour: number = startTime.getUTCHours();
    const min: number = startTime.getUTCMinutes();
    const sec: number = startTime.getUTCSeconds();

    if (day > 0) {
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
    } else if (min > 0 || sec > 0) {
      // pattern: 12:30
      time.value =
        min.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0');
    } else {
      // stop the timer and show the user that timer has finished
      clearInterval(timer);
      isCompleted = true;
      time.value = 'completed';
    }

    startTime.setTime(startTime.getTime() - 1000);
  }

  // resetting the timer to default
  function reset(): void {
    clearInterval(timer);
    startTime = new Date(
      (days * 86400 + hours * 3600 + minutes * 60 + seconds) * 1000
    );
    isRunning.value = false;
    isCompleted = false;
    time.value = '00:05';
  }

  // stopping the timer and adding current clock time as stop time
  function stop(): void {
    clearInterval(timer);
  }
</script>

<style lang="sass" scoped>
  .timer
    width: 200px
    height: 200px
    font-size: 35px
    text-transform: lowercase
    position: relative
    border: 8px solid blue
    background: #000
    color: #fff

  .reset
    position: absolute
    top: 8px
    left: 8px
    background: #ffa500

  .delete
    position: absolute
    top: 8px
    right: 8px
    background: red
</style>
