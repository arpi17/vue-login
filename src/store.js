import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from './router';

Vue.use(Vuex);

const state = {
  errors: {},
  currentUser: {}
};

const getters = {
  getErrors: state => state.errors,
  getCurrentUser: state => state.currentUser
};

const mutations = {
  setErrors(state, newErrors) {
    state.errors = newErrors;
  },
  setCurrentUser(state, user) {
    state.currentUser = user;
  }
};

const actions = {
  async registerUser({ commit }, userData) {
    try {
      axios.post('/users/register', userData);
      router.push('/');
    } catch (err) {
      commit('setErrors', err.response);
    }
  },
  async loginUser({ commit }, creds) {
    try {
      const { data } = await axios.post('/users/login', creds);
      commit('setCurrentUser', data);
    } catch (err) {
      commit('setErrors', err.response.data);
    }
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
