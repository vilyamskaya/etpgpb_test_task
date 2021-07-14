<template>
  <div class="wrapper">
    <div class="tweet">
      <div class="tweet__avatar">
        <img
          :src="require(`../assets/img/${tweet.user.photo}.png`)"
          width="60"
          height="60"
          alt="avatar"
          @mouseleave="showName = false"
          @mouseenter="showName = true"
        />
        <div v-show="showName" class="tweet__user-name text-title">
          {{ tweet.user.name }}
        </div>
      </div>
      <div class="tweet__content text-md">
        <div v-if="images && images.length" class="tweet__image">
          <img v-for="(image, i) in images" :key="i" :src="image" alt="image" />
        </div>
        <div class="tweet__text">
          {{ tweetText }}
        </div>
        <div class="tweet__date">
          {{ formatDate }}
        </div>
      </div>
    </div>
    <transition-group name="list" tag="ul" class="comments" appear>
      <li
        is="comment-item"
        v-for="(comment, i) in latestComments"
        :key="`comment-${i}`"
        :comment="comment"
      />
    </transition-group>
  </div>
</template>

<script>
import CommentItem from './comment-item'

export default {
  name: 'tweet-item',
  components: { CommentItem },
  props: {
    tweet: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showName: false,
    }
  },
  computed: {
    latestComments() {
      const length = this.tweet.comments.length - 1
      return length < 3 ? this.tweet.comments : this.tweet.comments.slice(length - 3, length)
    },
    images() {
      return this.tweet.text.match(/(https?:)?\/\/[^ "]+\.(jpg|jpeg|gif|png)/g)
    },
    tweetText() {
      let text = this.tweet.text
      if (this.images && this.images.length) {
        this.images.forEach((el) => {
          text = text.replace(el, '')
        })
      }
      return text
    },
    formatDate() {
      return this.tweet.date.slice(0, this.tweet.date.length - 3)
    },
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/vars';
@import '../assets/scss/mixins';

.wrapper {
  padding-bottom: $p-10;
}
.tweet {
  color: var(--color-text);
  display: flex;
  padding: $p-10;
  margin: $p-5 0;
  background-color: var(--color-box);
  border: 3px solid var(--color-box);
  border-radius: 30px;
  transition: all 0.5s;
  @include from-br(m) {
    padding: $p-20;
    margin: $p-10 0;
    border-radius: 50px;
    border-width: 5px;
  }

  &__avatar {
    position: relative;
  }

  &__content {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    margin-left: $p-20;
  }

  &__image {
    width: 100%;
    display: flex;
    flex-direction: column;

    img {
      width: 100%;
      margin-bottom: $p-10;
    }
  }

  &__date {
    font-size: $fs-15;
    font-weight: 700;
    color: var(--color-accent);
    margin-top: $p-10;
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
.comments {
  margin-left: $p-20;
  @include from-br(m) {
    margin-left: $p-40;
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
</style>
