import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: []
  },
  getters: {
    POSTS(state) {
      return state.posts;
    }
  },
  mutations: {
    SET_POSTS_TO_VUEX: (state, posts) => {
      state.posts = posts;
    },
  },
  actions: {
    GET_POSTS_FROM_API({commit}) {
      return axios('http://localhost:3000/posts', {
        method: 'GET',
      }).then((response) => {
        commit('SET_POSTS_TO_VUEX', response.data);
      });
    },
  },
  modules: {
  }
})
