import Vue from 'vue'
import Vuex from 'vuex'
import user from './stores/user'
import univ from './stores/univ'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    univ
  },
  plugins: [createPersistedState({storage: window.sessionStorage})]
})
