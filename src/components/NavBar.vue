<template lang="pug">
q-header(elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'")
  q-toolbar
    //- to change visibility of sidebar
    q-btn(flat @click="drawer = !drawer" round dense icon="menu")
    q-toolbar-title Timers
q-drawer(v-model="drawer" :width="200" :breakpoint="500" bordered :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'")
  q-scroll-area.fit
    q-list
      //- showing menu items and and click event to route through app
      q-item(clickable @click="$router.push(`${menuItem.route}`)" v-ripple v-for="(menuItem, index) in menuList" :key="index")
        q-item-section(avatar)
          q-icon(:name="menuItem.icon")
        q-item-section
          | {{ menuItem.label }}
</template>

<script lang="ts">
import { ref } from 'vue';

// list of links to iterate
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
