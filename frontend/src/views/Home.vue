<template>
  <div class="home">
    <button type="button" name="button" v-on:click="getStudents">get students data!</button>

    <div v-for="student in students">
      <p>{{ student.name }} <span>{{ student.age }}</span>　{{ student._id }}</p>
      <router-link to="/show" v-on:click.native="showStudent(student._id)">ユーザー詳細</router-link>
    </div>

  </div>
</template>

<script>
import axios from'axios'
import moment from 'moment'

export default {
  name: 'home',
  data() {
    return {
      students: null
    }
  },
  methods: {
    getStudents: function(){
      this.students = this.$store.getters['user/users'];
    },
    showStudent: function(_id){
      this.$store.dispatch('user/setShowingStudent', _id);
    }
  },
  mounted: async function() {
    await this.$store.dispatch('user/getStudents');
    this.students = this.$store.getters['user/users'];
  }
}
</script>
