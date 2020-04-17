import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  par:{
    upriver:'',
    receipt:'',
    receipt_info:''
  }
}

// getters
const getters = {}

// actions
const actions = {}

const mutations = {
  setPrint(state, par) {
    state.par = par;
  }
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
export default store
