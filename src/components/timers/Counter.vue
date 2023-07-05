<template lang="pug">
  .timer(
    @mouseenter="showButtons = true",
    @mouseleave="showButtons = false")
    .counter
      p {{ counter }}

    q-btn.decrease(@click="counter--")
    q-btn.increase(@click="counter++")

    q-btn.reset(
      v-show="showButtons",
      round,
      icon="rotate_right",
      @click.stop="reset")
    q-btn.delete(
      v-show="showButtons",
      round,
      icon="clear",
      @click.stop="deleteClick")
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { Ref } from 'vue';

  const props: any = defineProps({
    options: {
      type: Object,
      required: true
    }
  });
  const emit = defineEmits<{
    (e: 'removeTimer', id: string): void;
  }>();

  function deleteClick() {
    emit('removeTimer', props.uniqueId);
  }

  // counter value
  const counter: Ref<number> = ref(0);
  // to check if reset and delete buttons must be shown
  const showButtons: Ref<boolean> = ref(false);

  function reset(): void {
    counter.value = 0;
  }
</script>

<style lang="sass" scoped>
  .timer
    width: 200px
    height: 200px
    font-size: 50px
    text-transform: lowercase
    position: relative
    border: 8px solid purple
    background: #000
    color: #fff
    border-radius: 50%

  .counter
    height: 45%
    position: absolute
    text-align: center
    top: 0
    left: 0
    bottom: 0
    right: 0
    margin: auto

  .decrease, .increase
    width: 50%
    height: 100%

  .decrease
    border-radius: 15rem 0 0 15rem

  .increase
    border-radius: 0 15rem 15rem 0

  .reset
    position: absolute
    top: 8px
    left: 8px
    background: #ffa500

  .delete
    position: absolute
    top: 8px
    right: 8px
    background: red
</style>
