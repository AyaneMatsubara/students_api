<template>
  <div class="home">
    <button type="button" name="button" v-on:click="getStudents">get students data!</button>
    <button type="button" name="button" v-on:click="postStudent">post students data!</button>

    <table class="form" style="width: 500px; margin: 50px auto">
      <tr>
        <input type="text" v-model="name"><span> {{ name }}</span>
      </tr>
      <tr>
        <input type="text" v-model="bio"><span> {{ bio }}</span>
      </tr>
      <tr>
        <input type="text" v-model="univ"><span> {{ univ }}</span>
      </tr>
      <tr>
        <select v-model="age">
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
        </select>
      </tr>
      <tr>
        <select v-model="year">
          <option value="2001">2001</option>
          <option value="2000">2000</option>
          <option value="1999">1999</option>
        </select>
        <select v-model="month">
          <option v-for="month in 12" v-bind:value="month">{{ month }}</option>
        </select>
        <select v-model="date">
          <option v-for="date in 30" v-bind:value="date">{{ date }}</option>
        </select>
      </tr>
    </table>

    <div v-for="student in students">
      <p>{{ student.name }} <span>{{ student.age }}</span></p>
      <button type="button" name="button" v-on:click="deleteStudent(student._id)">delete this student data</button>
    </div>

  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      students: null,
      name: 'name',
      bio: 'bio',
      age: '',
      year: '',
      month: '',
      date: '',
      univ: 'univ'
    }
  },
  methods: {
    getStudents: async function(){
      await axios
        .get('http://localhost:3000/api/v1/user/')
        .then((res)=>{
          this.students = res.data
        });
    },
    postStudent: async function(){
      await axios
        .post('http://localhost:3000/api/v1/user/create', {
          name: this.name,
          bio: this.bio,
          age: parseInt(this.age),
          year: parseInt(this.year),
          month: parseInt(this.month),
          date: parseInt(this.date),
          univ: this.univ
        })
    },
    deleteStudent: async function(studentId){
      await axios.delete('http://localhost:3000/api/v1/user/delete/' + studentId);
      await this.getStudents();
    }
  }
}
</script>
