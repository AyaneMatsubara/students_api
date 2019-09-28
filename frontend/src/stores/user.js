import axios from 'axios'

const state = {
  users: [],
  showingUser: null
};

const mutations = {
  setUsers(state, payload){
    if(payload){
      state.users = payload;
    }
  },
  pushUsers(state, payload){
    state.users.push(payload);
  },
  setShowingUser(state, payload){
    if(payload){
      state.showingUser = payload;
    }
  }
};

const getters = {
  users(state){
    return state.users;
  },
  showingUser(state){
    return state.showingUser;
  }
};

const actions = {
  async getStudents(context){
    await axios
      .get('http://localhost:3000/api/v1/user/')
      .then((res)=>{
        context.commit('setUsers', res.data);
      });
  },
  async postStudent(context, payload){
    await axios
      .post('http://localhost:3000/api/v1/user/create', {
        name: payload.name,
        bio: payload.bio,
        age: parseInt(payload.age),
        birth: payload.birth,
        univ: payload.univ
      });
    context.commit('pushUsers', payload);
  },
  setShowingUser(context, payload){
    context.commit('setShowingUser', payload);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
