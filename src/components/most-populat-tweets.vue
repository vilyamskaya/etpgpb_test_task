<template>
  <div class="popular-tweets">
    <p class="popular__title text-title">Most popular</p>
    <transition-group name="list" tag="ul" class="tweets" appear>
      <li
        v-for="(tweet, i) in filteredTweets"
        :key="`popular-${i}`"
        class="tweet text-md"
      >
        <div class="tweet__text">{{ tweetText(tweet.text) }}</div>
        <div class="tweet__comments-amount">
          {{ `${tweet.comments.length} comment${tweet.comments.length > 1 ? 's' : ''}` }}
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'most-populat-tweets',
  props: {
    tweets: {
      type: Array,
      default() {
        return []
      }
    },
  },
  computed: {
    filteredTweets() {
      const tweetsToSort = [...this.tweets]
      return tweetsToSort.sort((a, b) => b.comments.length - a.comments.length).slice(0, 5)
    },
  },
  methods: {
    tweetText(itemText) {
      const images = itemText.match(/(https?:)?\/\/[^ "]+\.(jpg|jpeg|gif|png)/g)
      let text = itemText
      if (images && images.length) {
        images.forEach((el) => {
          text = text.replace(el, '')
        })
      }
      return text
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars';
@import '../assets/scss/mixins';

.popular-tweets {
  background-color: var(--color-box);
  border: 3px solid var(--color-box);
  border-radius: 30px;
  padding: $p-10;
  color: var(--color-text);
  transition: all 0.5s;
  @include from-br(m) {
    padding: $p-20;
    border-radius: 50px;
  }
  .popular__title {
    color: var(--color-text);
    margin-bottom: $p-10;
    text-align: center;
    transition: all 0.5s;
    @include from-br(m) {
      margin-bottom: $p-20;
    }
  }
  .tweet {
    display: flex;
    justify-content: space-between;
    margin: $p-5 0;
    padding: $p-10;
    background-color: var(--color-bg);
    border-radius: 30px;
    transition: all 0.5s;
    @include from-br(m) {
      padding: $p-20;
      margin: $p-10 0;
    }
    &__text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__comments-amount {
      margin-left: $p-10;
      color: var(--color-accent);
      white-space: nowrap;
      transition: all 0.5s;
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
