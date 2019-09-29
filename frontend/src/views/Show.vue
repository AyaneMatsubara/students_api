<template>
  <div class="show">
    <p>{{ student.name }}</p>
    <p>{{ student.bio }}</p>
    <p>{{ student.age }}</p>
    <p>{{ student.birth }}</p>
    <button type="button" name="button" v-on:click="deleteStudent(student._id)">delete</button><br>
    <router-link to="/">戻る</router-link>
  </div>
</template>

<script>
import axios from'axios'

export default {
  name: 'show',
  computed: {
    student: function(){
      return this.$store.getters['user/showingUser'];
    }
  },
  methods: {
    deleteStudent: async function(studentId){
      await this.$store.dispatch('user/deleteStudent', studentId);
      this.$router.push('/');
    }
  }
}
</script>
