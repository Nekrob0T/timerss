<template lang="pug">
q-page(padding)
  StopWatch(v-for="timer in timers" :options="timer")
  RoundButton(icon="add" @click="addStopWatch")
</template>

<script lang="ts">
import RoundButton from '@/components/UI/RoundButton.vue';
import StopWatch from '@/components/timers/StopWatch.vue';

export default {
  components: {
    RoundButton,
    StopWatch
  },
  data() {
    return {
      timers: [] as Array<object>
    };
  },
  methods: {
    addStopWatch() {
      this.timers.push({});
    }
  }
};
</script>
