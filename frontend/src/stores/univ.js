import axios from 'axios'

const state = {
  univs: []
};

const mutations = {
  setUnivs(state, payload){
    state.univs = payload;
  }
};

const getters = {
  univs(state){
    return state.univs;
  }
};

const actions = {
  async getUnivs(context){
    await axios
      .get('http://localhost:3000/api/v1/univ/')
      .then((res)=>{
        context.commit('setUnivs', res.data);
      });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
