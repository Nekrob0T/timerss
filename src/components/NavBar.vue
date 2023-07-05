<template lang="pug">
  q-header(
    elevated,
    :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'")
    q-toolbar
      //- to change visibility of sidebar
      q-btn(
        flat,
        @click="drawer = !drawer",
        round,
        dense,
        icon="menu")
      q-toolbar-title
        | Timers
  q-drawer(
    v-model="drawer",
    :width="200",
    :breakpoint="500",
    bordered,
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'")
    q-scroll-area.fit
      q-list
        q-item(
          v-for="(menuItem, index) in menuList",
          :key="index",
          v-ripple,
          clickable,
          :to="{ name: `${menuItem.name}` }")
          q-item-section(avatar)
            q-icon(:name="menuItem.icon")
          q-item-section
            | {{ menuItem.label }}
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { Ref } from 'vue';

  // variable to define is sidebar visible or not
  const drawer: Ref<boolean> = ref(false);

  // list of links to iterate
  const menuList = [
    {
      name: 'home',
      icon: 'home',
      label: 'Main'
    },
    {
      name: 'settings',
      icon: 'settings',
      label: 'Settings'
    }
  ];
</script>
