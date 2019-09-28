import Vue from 'vue'
import Vuex from 'vuex'
import user from './stores/user'
import univ from './stores/univ'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    univ
  }
})
