<template lang="pug">
q-layout(view="hHh Lpr lff" container style="height: 100vh")
  NavBar
  q-page-container.fit
    RouterView
</template>

<script lang="ts">
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar
  }
};
</script>

<style lang="sass">
*
  margin: 0
  padding: 0
  box-sizing: border-box
</style>
