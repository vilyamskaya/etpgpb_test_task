<template>
  <div class="container">
    <color-picker
      :colors="colors"
      @click-color="$store.dispatch('setColor', $event)"
      class="picker"
    />
    <div class="feeds">
      <div class="feeds__left">
        <add-form />
        <transition-group name="list" tag="ul" class="tweets-list" appear>
          <li
            is="tweet-item"
            v-for="(tweet, i) in tweets"
            :key="`tweet-${i}`"
            :tweet="tweet"
          />
        </transition-group>
      </div>
      <div class="feeds__right">
        <most-popular-tweets v-if="tweets.length > 0" :tweets="tweets" />
      </div>
    </div>
  </div>
</template>

<script>
import ColorPicker from './color-picker'
import AddForm from './add-form'
import TweetItem from './tweet-item'
import MostPopularTweets from './most-populat-tweets'
import { mapGetters } from 'vuex'

export default {
  name: 'twitter-feeds',
  components: {
    ColorPicker,
    AddForm,
    TweetItem,
    MostPopularTweets,
  },
  data() {
    return {
      colors: [
        {
          title: 'light',
          color: '#af81db',
        },
        {
          title: 'dark',
          color: '#3A4141',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['tweets']),
  },
  mounted() {
    this.$store.dispatch('getTweets')
    this.$store.dispatch('setId')
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars';
@import '../assets/scss/mixins';

.container {
  width: 90%;
  padding: $p-40 0;
  margin: auto;
  @include from-br(m) {
    width: 80%;
    max-width: 1210px;
    padding: $p-60 0;
  }
}
.feeds {
  display: flex;
  position: relative;
  flex-direction: column-reverse;
  justify-content: space-between;
  height: 100%;
  @include from-br(m) {
    flex-direction: row;
  }
  &__left {
    width: 100%;
    @include from-br(m) {
      width: 60%;
    }
  }
  .tweets-list {
    display: flex;
    flex-direction: column-reverse;
  }
  &__right {
    width: 100%;
    margin-bottom: $p-40;
    @include from-br(m) {
      width: 40%;
      margin-left: $p-60;
      padding-top: 75px;
      position: sticky;
      top: 0;
      align-self: flex-start;
      margin-bottom: $p-20;
    }
  }
  .list-enter {
    opacity: 0;
    transform: scale(0);
  }
  .list-enter-active {
    transition: all 1s;
  }
  .list-move {
    transition: all 1s;
  }
}
</style>
