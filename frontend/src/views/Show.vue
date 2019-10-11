<template>
  <div class="show">
    <div class="" v-if="student.image != ''">
      <img :src="image_src"/>
    </div>
    <p>{{ student.name }}</p>
    <p>{{ student.bio }}</p>
    <p>{{ student.age }}</p>
    <p>{{ student.year }} / {{ student.month }} / {{ student.date }}</p>
    <p>{{ student.univ }}</p>
    <button type="button" name="button" v-on:click="deleteStudent(student._id)">delete</button><br>
    <router-link to="/edit">編集する</router-link>
    <router-link to="/">戻る</router-link>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'show',

  computed: {
    student(){
      return this.$store.getters['user/showingUser'];
    },
    image_src(){
      if(this.student.image){
        return require("@/assets/user/" + this.student.image)
      }else{
        console.log('image deleted');
        return ''
      }
    }
  },
  methods: {
    deleteStudent: async function(studentId){
      await this.$store.dispatch('user/deleteStudent', studentId);
      setTimeout(()=>{
        this.$router.push('/');
      }, 1500);
    }
  }
}
</script>
