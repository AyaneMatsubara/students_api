<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div v-for="student in students">
      <p>{{ student.name }} <span>{{ student.age }}</span></p>
    </div>
    <button type="button" name="button" v-on:click="getStudents">get students data!</button>
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
      students: null
    }
  },
  methods: {
    getStudents: async function(){
      await axios
        .get('http://localhost:3000/api/v1/user/')
        .then((res)=>{
          this.students = res.data
        });
    }
  }
}
</script>
