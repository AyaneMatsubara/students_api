import axios from 'axios'

const state = {
  users: [],
  showingUser: null,
  searchQuery: null
};

const mutations = {
  setUsers(state, payload){
    if(payload){
      state.users = payload;
      state.searchQuery = null;
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
  },
  setSearchQuery(state, payload){
    state.searchQuery = payload;
  }
};

const getters = {
  users(state){
    return state.users;
  },
  showingUser(state){
    const showingUser = state.users.filter((user)=>{ return user._id == state.showingUser });
    return showingUser[0];
  },
  searchQuery(state){
    return state.searchQuery;
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
        univ: payload.univ,
        image: payload.image
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
  async searchStudents(context, payload){
    const query = {};
    if(payload.name){
      query.name = payload.name;
    }
    if(payload.age){
      query.age = payload.age;
    }
    if(payload.year){
      query.year = payload.year;
    }
    if(payload.month){
      query.month = payload.month;
    }
    if(payload.date){
      query.date = payload.date;
    }
    if(payload.univ){
      query.univ = payload.univ;
    }
    await axios
      .post('http://localhost:3000/api/v1/user/search/', query)
      .then((res)=>{
        context.commit('setUsers', res.data);
        context.commit('setSearchQuery', query);
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
