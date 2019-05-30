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
  clearErrors(state) {
    state.errors = {};
  },
  setCurrentUser(state, user) {
    state.currentUser = user;
  }
};

const actions = {
  async registerUser({ commit }, userData) {
    try {
      const { data } = await axios.post('/users/register', userData);
      console.log(data);
      if (data.success) {
        router.push('/');
      }
    } catch (err) {
      commit('setErrors', err.response.data);
    }
  },
  async loginUser({ commit }, creds) {
    try {
      const { data } = await axios.post('/users/login', creds);
      commit('setCurrentUser', data);
      router.push('/dashboard');
    } catch (err) {
      commit('setErrors', err.response.data);
    }
  },
  logoutUser({ commit }) {
    commit('setCurrentUser', {});
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
