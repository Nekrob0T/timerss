<template lang="pug">
  .clock(
    @mouseenter="showButtons = true",
    @mouseleave="showButtons = false")
    .hand.hour(ref="hourHand")
    .hand.minute(ref="minuteHand")
    .hand.second(ref="secondHand")
    .number.number1 1
    .number.number2 2
    .number.number3 3
    .number.number4 4
    .number.number5 5
    .number.number6 6
    .number.number7 7
    .number.number8 8
    .number.number9 9
    .number.number10 10
    .number.number11 11
    .number.number12 12

    q-icon.clockIcon(
      v-if="isDay",
      name="wb_sunny",
      size="sm")
    q-icon.clockIcon(
      v-else,
      name="nights_stay",
      size="sm")

    q-btn.delete(
      v-show="showButtons",
      round,
      icon="clear",
      @click.stop="deleteClick")
</template>

<script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
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

  // to check if reset and delete buttons must be shown
  const showButtons: Ref<boolean> = ref(false);
  // to check if is day now (8-20) to show correct icon
  const isDay: Ref<boolean> = ref(false);
  // get second hand element
  const secondHand: Ref<HTMLElement> = ref() as Ref<HTMLElement>;
  // get minute hand element
  const minuteHand: Ref<HTMLElement> = ref() as Ref<HTMLElement>;
  // get hour hand element
  const hourHand: Ref<HTMLElement> = ref() as Ref<HTMLElement>;

  function setClock(): void {
    const currentTime: Date = new Date();
    // for correct show of second hand
    const secondsRatio: number = currentTime.getSeconds() / 60;
    // for correct show of minute hand (adding seconds ratio for smooth movement)
    const minutesRatio: number = (secondsRatio + currentTime.getMinutes()) / 60;
    // for correct show of hour hand (adding minutes ratio for smooth movement)
    const hoursRatio: number = (minutesRatio + currentTime.getHours()) / 12;

    // set rotation of hands
    setRotation(secondHand.value, secondsRatio);
    setRotation(minuteHand.value, minutesRatio);
    setRotation(hourHand.value, hoursRatio);

    // change value depending on current time
    if (currentTime.getHours() >= 20 && currentTime.getHours() <= 8) {
      isDay.value = true;
    } else {
      isDay.value = false;
    }
  }

  // change rotation of hand
  function setRotation(elem: HTMLElement, rotationRatio: number) {
    elem.style.setProperty('--rotation', (rotationRatio * 360).toString());
  }

  // creating timer
  const clock: number = setInterval(setClock, 1000);
  // when object is rendered call function once to place hands in right positions
  onMounted(() => setClock());
  // stop timer before deleting to avoid change rotation of deleted hands which causes errors
  onBeforeUnmount(() => clearInterval(clock));
</script>

<style lang="sass" scoped>
  .clock
    width: 200px
    height: 200px
    background-color: #000
    border-radius: 50%
    border: 2px solid #fff
    position: relative
    color: #fff

  .clock::after
    content: ''
    position: absolute
    background-color: #000
    z-index: 11
    width: 15px
    height: 15px
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    border: 4px solid #fff
    border-radius: 50%

  .clockIcon
    position: absolute
    top: 25%
    left: 50%
    transform: translateX(-50%)

  .clock .number
    --rotation: 0
    position: absolute
    width: 100%
    height: 100%
    text-align: center
    transform: rotate(var(--rotation))
    font-size: 1.2rem

  .clock .number1
    --rotation: 30deg
  .clock .number2
    --rotation: 60deg
  .clock .number3
    --rotation: 90deg
  .clock .number4
    --rotation: 120deg
  .clock .number5
    --rotation: 150deg
  .clock .number6
    --rotation: 180deg
  .clock .number7
    --rotation: 210deg
  .clock .number8
    --rotation: 240deg
  .clock .number9
    --rotation: 270deg
  .clock .number10
    --rotation: 300deg
  .clock .number11
    --rotation: 330deg
  .clock .number12
    --rotation: 360deg

  .clock .hand
    position: absolute
    bottom: 50%
    left: 50%
    background-color: #fff
    border: 1px solid grey
    border-radius: 10px 10px 0 0
    transform-origin: bottom
    z-index: 10
    transform: translateX(-50%) rotate(calc(var(--rotation) * 1deg))

  .clock .hand.second
    --rotation: 0
    width: 3px
    height: 45%
    background-color: #f00

  .clock .hand.minute
    --rotation: 0
    width: 5px
    height: 40%
    background-color: #fff

  .clock .hand.hour
    --rotation: 0
    width: 8px
    height: 35%
    background-color: #fff

  .delete
    position: absolute
    top: 8px
    right: 8px
    background: red
</style>
