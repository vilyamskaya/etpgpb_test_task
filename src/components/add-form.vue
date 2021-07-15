<template>
  <div class="form">
    <input
      aria-label="Write a tweet"
      class="form__input"
      type="text"
      v-model="tweetText"
      @keyup.enter.prevent="addNewTweet"
      v-focus
      placeholder="Write something..."
    />
    <button name="add" class="form__btn" @click="addNewTweet">Add</button>
  </div>
</template>

<script>
export default {
  name: 'add-form',
  data() {
    return {
      tweetText: '',
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      },
    },
  },
  methods: {
    addNewTweet() {
      if (this.tweetText.length > 0) {
        this.$store.dispatch('addTweet', this.tweetText)
      }
      this.tweetText = ''
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars';
@import '../assets/scss/mixins';

.form {
  width: 100%;
  display: flex;
  padding: $p-10 0;
  margin-bottom: $p-40;
  @include from-br(m) {
    padding: $p-20 0;
    margin-bottom: $p-20;
  }
  &__input {
    width: 100%;
    display: block;
    color: var(--color-text);
    height: $p-40;
    border: 3px solid var(--color-box);
    border-radius: $p-40 / 2;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 $p-10;
    transition: all 0.5s;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: var(--color-bg);
    @include from-br(m) {
      height: $p-60;
      border-radius: $p-60 / 2;
      border-width: 5px;
    }
    &:focus {
      border-color: var(--color-accent);
      outline: none;
    }
    &::-ms-clear {
      display: none;
    }
  }
  &__btn {
    width: 30%;
    margin-left: $p-10;
    height: $p-40;
    border-radius: $p-40 / 2;
    background-color: var(--color-accent);
    border: 3px solid var(--color-accent);
    color: var(--color-text);
    transition: all 0.5s;
    @include from-br(m) {
      font-size: $fs-18;
      margin-left: $p-20;
      border-width: 5px;
      height: $p-60;
      border-radius: $p-60 / 2;
    }
    &:hover {
      @include from-br(m) {
        border-color: var(--color-border);
        background-color: var(--color-border);
      }
    }
  }
}
</style>
