<template lang="pug">
//- defining layout of the page (Uppercase letters make layout to be fixed)
q-layout(view="hHh Lpr lff" container style="height: 100vh")
  NavBar
  q-page-container.fit
    RouterView
</template>

<script lang="ts" setup>
/* eslint-disable */
import NavBar from '@/components/NavBar.vue';
</script>

<style lang="sass">
// reset of browser's styles
*
  margin: 0
  padding: 0
  box-sizing: border-box
</style>
