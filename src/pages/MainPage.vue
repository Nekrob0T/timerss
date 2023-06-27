<template lang="pug">
q-page(padding)
  StopWatch(v-for="timer in timers")
  RoundButton(icon="add" @click="addStopWatch")
</template>

<script lang="ts" setup>
/* eslint-disable */
import RoundButton from '@/components/UI/RoundButton.vue';
import StopWatch from '@/components/timers/StopWatch.vue';
import { ref } from 'vue';
import type { Ref } from 'vue';

const timers: Ref<Array<object>> = ref([]);

function addStopWatch(): void {
  timers.value.push({});
}
</script>
