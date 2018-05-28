import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';
import getters from './getters';

Vue.use(Vuex);

const state = {
  carList: {
    'foodNum': 1
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
