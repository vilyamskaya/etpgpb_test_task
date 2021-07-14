import Vue from 'vue'
import Vuex from 'vuex'
import { localStorageService } from './localStorageService'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    tweets: [],
    color: null,
    id: null,
    commentators: [
      {
        name: 'Bear',
        photo: 'bear',
      },
      {
        name: 'Dog',
        photo: 'dog',
      },
      {
        name: 'Polar Bear',
        photo: 'polar-bear',
      },
      {
        name: 'Snake',
        photo: 'snake',
      },
    ],
    comments: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      'Hello!',
      'I like chocolate',
      'I like ice cream',
      'Is it Twitter?',
      'Awesome!',
      'Bye'
    ],
  },
  getters: {
    color: (state) => state.color,
    tweets: (state) => state.tweets,
  },
  mutations: {
    SET_COLOR(state, payload) {
      state.color = payload
      localStorageService.setColor(payload)
    },
    GET_COLOR(state) {
      state.color = localStorageService.getColor()
    },
    ADD_TWEET(state, payload) {
      const tweet = {
        text: payload,
        id: state.id++,
        comments: [],
        user: {
          name: 'Cat',
          photo: 'cat',
        },
        date: (new Date()).toLocaleString()
      }
      state.tweets.push(tweet)
      localStorageService.updateLocalStorage(state.tweets)
    },
    SET_ID(state) {
      const item = state.tweets[state.tweets.length - 1]
      state.id = item ? item.id + 1 : 0
    },
    GET_TWEETS(state) {
      state.tweets = localStorageService.getTweets()
    },
    GENERATE_COMMENTS(state) {
      const id = state.id
      const commentsAmount = Math.round(Math.random() * 10)
      for (let i = 0; i < commentsAmount; i++) {
        const delay = 5 + Math.round(Math.random() * 25)
        const user = state.commentators[Math.round(Math.random() * (state.commentators.length - 1))]
        const comment = state.comments[Math.round(Math.random() * (state.comments.length - 1))]
        setTimeout(() => {
          state.tweets.find((item) => item.id === id - 1).comments.push({
            text: comment,
            user,
          })
          localStorageService.updateLocalStorage(state.tweets)
        }, delay * 1000)
      }
    },
  },
  actions: {
    setColor({commit}, payload) {
      commit('SET_COLOR', payload)
    },
    getColor({commit}) {
      commit('GET_COLOR')
    },
    addTweet({ commit }, payload) {
      commit('ADD_TWEET', payload)
      commit('GENERATE_COMMENTS')
    },
    setId({ commit }) {
      commit('SET_ID')
    },
    getTweets({ commit }) {
      commit('GET_TWEETS')
    },
  },
})
