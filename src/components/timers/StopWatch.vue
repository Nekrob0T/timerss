<template lang="pug">
RoundButton(@click="isRunning = !isRunning") {{ `${minutes}:${seconds}` }}
</template>

<script lang="ts">
import RoundButton from '@/components/UI/RoundButton.vue';

export default {
  components: {
    RoundButton
  },
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      time: new Date(0),
      timer: 0,
      seconds: '00',
      minutes: '00',
      isRunning: false
    };
  },
  watch: {
    isRunning(newVal) {
      if (newVal) this.start();
      else this.stop();
    },
    time(newVal) {
      this.seconds = newVal.getSeconds() < 10 ? '0' + newVal.getSeconds() : newVal.getSeconds();
      this.minutes = newVal.getMinutes() < 10 ? '0' + newVal.getMinutes() : newVal.getMinutes();
    }
  },
  methods: {
    start() {
      this.timer = setInterval(() => {
        this.time = new Date(this.time.getTime() + 1000);
      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
    }
  }
};
</script>
