<template lang="pug">
  q-layout#layout(
    view="hHh Lpr lff",
    container)
    NavBar
    q-page-container.fit
      RouterView
</template>

<script lang="ts" setup>
  import NavBar from '@/components/NavBar.vue';
</script>

<style lang="sass">
  #layout
    height: 100vh
</style>
