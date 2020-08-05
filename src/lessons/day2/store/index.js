import Vue from "vue"
import Vuex from "../kvuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: { counter: 0 },
  mutations: {
    add (state, num=1) {
      state.counter += num
    }
  },
  actions: {
    addAsync(store, payload) {
      setTimeout(()=>{
        store.commit('add', payload)
      }, 2000)
    }
  },
  getters: {
    double (state) {
      return state.counter * 2
    }
  }
})

export default store
