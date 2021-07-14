<template>
  <div class="color-picker">
    <div
      v-for="(color, i) in colors"
      :key="`color-${i}`"
      class="color-picker__item"
      :style="`background-color: ${color.color}`"
      @click="$emit('click-color', color)"
    ></div>
  </div>
</template>

<script>
  export default {
    props: {
      colors: {
        type: Array,
        default() {
          return []
        },
      },
    },
  }
</script>

<style scoped lang="scss">
  @import '../assets/scss/vars';
  @import '../assets/scss/mixins';

  .color-picker {
    display: flex;
    max-width: 50%;
    padding: $p-10 0;
    margin-bottom: $p-40;
    @include from-br(m) {
      padding: $p-20 0;
      margin-bottom: 0;
    }
    &__item {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 3px solid var(--color-border);
      cursor: pointer;
      & ~ * {
        margin-left: $p-10;
      }
    }
  }
</style>
