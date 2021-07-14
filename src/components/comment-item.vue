<template>
  <div class="comment">
    <div class="comment__avatar" @mouseleave="showName = false" @mouseenter="showName = true">
      <img :src="require(`../assets/img/${comment.user.photo}.png`)" width="40" height="40" alt="avatar" />
      <div v-show="showName" class="comment__user-name text-title">
        {{ comment.user.name }}
      </div>
    </div>
    <div class="comment__text text-md">
      {{ comment.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'comment-item',
  props: {
    comment: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      showName: false,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars';
@import '../assets/scss/mixins';

.comment {
  color: var(--color-text);
  display: flex;
  padding: $p-10;
  margin: $p-5 0;
  background-color: var(--color-box);
  border: 3px solid var(--color-box);
  border-radius: 30px;
  transition: all 0.5s;
  @include from-br(m) {
    margin: $p-10 0;
    border-radius: 50px;
    border-width: 5px;
  }
  &__avatar {
    position: relative;
  }
  &__text {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    margin-left: $p-20;
  }
  &__user-name {
    position: absolute;
    top: -60px;
    left: 50%;
    padding: $p-10;
    background-color: var(--color-accent);
    border-radius: 30px;
    white-space: nowrap;
    &::after {
      content: '';
      position: absolute;
      top: 35px;
      left: 0;
      width: 1px;
      height: 1px;
      border: 10px solid transparent;
      border-right-color: var(--color-accent);
      border-top-color: var(--color-accent);
      transform: rotate(45deg);
    }
  }
}
</style>
