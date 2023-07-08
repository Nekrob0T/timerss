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

  // contains text with current countdown's time
  const time: Ref<string> = ref('10:00');
  // containing timer setInterval
  let timer = 0;
  // TODO: values from props
  const seconds = 0;
  const minutes = 10;
  const hours = 0;
  const days = 0;
  // time from which we start countdown (default: 10min)
  let startTime = new Date(
    (days * 86400 + hours * 3600 + minutes * 60 + seconds) * 1000
  );

  // to check if timer is stopped
  const isRunning: Ref<boolean> = ref(false);
  // to check if reset and delete buttons must be shown
  const showButtons: Ref<boolean> = ref(false);

  // start/stop on click
  function changeState(): void {
    isRunning.value = !isRunning.value;
    if (isRunning.value) {
      start();
    } else stop();
  }

  // starting the timer
  function start(): void {
    timer = setInterval(clockRunning, 1000);
  }

  // updating the timer
  function clockRunning(): void {
    /* days calculated by division
        because method getUTCDay() will return 1
    */
    const day = Math.floor(startTime.getTime() / 86400000);
    // no problems with hours, minutes, seconds and milliseconds because they start from 0
    const hour = startTime.getUTCHours();
    const min = startTime.getUTCMinutes();
    const sec = startTime.getUTCSeconds();

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
    } else if (sec > 0) {
      // pattern: 12:30
      time.value =
        min.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0');
      console.log(startTime);
    } else {
      reset();
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
    time.value = '10:00';
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
    border: 8px solid orange
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
