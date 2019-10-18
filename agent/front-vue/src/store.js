import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

Vue.use(Vuex);

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  run: false
};

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  setTargetAddr(state, addr) {
    sessionStorage.setItem("targetAddr", addr);
  },
  stopRun(state) {
    state.run = false;
  },
  startRun(state) {
    state.run = true;
  }
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {};

// getters are functions
const getters = {
  getTargetAddr: state => {
    const targetAddr = sessionStorage.getItem("targetAddr");
    if (targetAddr) {
      return targetAddr;
    }
    return '';
  },
  hasTargetAddr: state => {
    const targetAddr = sessionStorage.getItem("targetAddr");
    return !!targetAddr;
  },
  isRunning: state => {
    return state.run;
  }
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
