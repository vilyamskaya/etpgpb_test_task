<template>
  <div id="app" class="app" :class="color.title">
    <twitter-feeds />
  </div>
</template>

<script>
import TwitterFeeds from './components/twitter-feeds'
import { mapGetters } from 'vuex'

export default {
  components: {
    TwitterFeeds,
  },
  computed: {
    ...mapGetters(['color']),
  },
  created() {
    this.$store.dispatch('getColor')
  },
}
</script>

<style src="./assets/scss/global.scss" lang="scss"></style>

<style scoped lang="scss">
@import './assets/scss/vars';
@import './assets/scss/mixins';

.app {
  background-color: var(--color-bg);
  min-height: 100vh;
  transition: all 0.5s;
}

.light {
  --color-accent: #af81db;
  --color-bg: #ffffff;
  --color-box: #e3e2ea;
  --color-text: #000000;
  --color-border: #d7dfd9;
}
.dark {
  --color-accent: #50ae8e;
  --color-bg: #1e2222;
  --color-box: #3a4141;
  --color-text: #ffffff;
  --color-border: #868a86;
}
</style>
