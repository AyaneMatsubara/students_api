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
  deleteUser(state, payload){
    const newUsers = state.users.filter((user, payload)=>{ return user._id != payload });
    state.users = newUsers;
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
    const showingUser = state.users.filter((user)=>{ return user._id == state.showingUser });
    return showingUser[0];
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
        year: payload.year,
        month: payload.month,
        date: payload.date,
        univ: payload.univ
      });
    context.commit('pushUsers', payload);
  },
  async deleteStudent(context, payload){
    await axios.delete('http://localhost:3000/api/v1/user/delete/' + payload);
    context.commit('deleteUser', payload);
  },
  async updateStudent(context, payload){
    await axios
      .put('http://localhost:3000/api/v1/user/update/' + payload.id , {
        name: payload.name,
        bio: payload.bio,
        age: parseInt(payload.age),
        year: payload.year,
        month: payload.month,
        date: payload.date,
        univ: payload.univ
      });
  },
  setShowingStudent(context, payload){
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
