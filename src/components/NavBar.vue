<template lang="pug">
q-header(elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'")
  q-toolbar
    q-btn(flat @click="drawer = !drawer" round dense icon="menu")
    q-toolbar-title Timers
q-drawer(v-model="drawer" :width="200" :breakpoint="500" bordered :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'")
  q-scroll-area.fit
    q-list
      q-item(clickable @click="$router.push(`${menuItem.route}`)" v-ripple v-for="(menuItem, index) in menuList" :key="index")
        q-item-section(avatar)
          q-icon(:name="menuItem.icon")
        q-item-section
          | {{ menuItem.label }}
</template>

<script lang="ts">
import { ref } from 'vue';

const menuList = [
  {
    icon: 'home',
    label: 'Main',
    route: '/'
  },
  {
    icon: 'settings',
    label: 'Settings',
    route: '/settings'
  }
];

export default {
  setup() {
    return {
      drawer: ref(false),
      menuList
    };
  }
};
</script>
