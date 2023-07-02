<template lang="pug">
  // TODO: Style must be in CSS class
  q-layout(
    view="hHh Lpr lff",
    container,
    style="height: 100vh")
    NavBar
    q-page-container.fit
      RouterView
</template>

<script lang="ts" setup>
  import { shallowRef } from 'vue';
  import NavBar from '@/components/NavBar.vue';

  const timers = shallowRef();

  // provide('timers')

  // Inject must be done via composable
</script>

<style lang="sass">
  *
    margin: 0
    padding: 0
    box-sizing: border-box
</style>
