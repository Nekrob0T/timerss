<template lang="pug">
  q-layout#layout(
    view="hHh Lpr lff",
    container)
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
  #layout
    height: 100vh
</style>
