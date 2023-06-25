<template lang="pug">
q-page(padding)
  StopWatch(v-for="timer in timers")
  RoundButton(icon="add" @click="addStopWatch")
</template>

<script lang="ts">
import RoundButton from '@/components/UI/RoundButton.vue';
import StopWatch from '@/components/timers/StopWatch.vue';
import { ref } from 'vue';
import type { Ref } from 'vue';

export default {
  components: {
    RoundButton,
    StopWatch
  },
  setup() {
    // defining array with all timers which would used in the app
    const timers: Ref<Array<object>> = ref([]);

    // function to add a stopwatch (simple object because no options needed for it)
    function addStopWatch(): void {
      timers.value.push({});
    }

    return {
      timers,
      addStopWatch
    };
  }
};
</script>
