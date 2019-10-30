<template>
  <div class="home">
    <div class="search">
      <table class="form" style="width: 500px; margin: 50px auto">
        <tr>
          <input type="text" v-model="name"><span> {{ name }}</span>
        </tr>
        <tr>
          <select v-model="univ">
            <option v-for="univ in univList">{{ univ.name }}</option>
          </select>
        </tr>
        <tr>
          <input type="number" v-model="age" v-on:blur="ageValidate">
        </tr>
        <tr>
          <select v-model="year">
            <option v-for="year in 16">{{ year + 1989 }}</option>
          </select>
          <select v-model="month">
            <option v-for="month in 12" v-bind:value="month">{{ month }}</option>
          </select>
          <select v-model="date">
            <option v-for="date in lastDate" v-bind:value="date">{{ date }}</option>
          </select>
        </tr>
      </table>
    </div>
    <button type="button" name="button" v-on:click="searchStudents">search students!</button>
    <button type="button" name="button" v-on:click="getStudents">reset students!</button>

    <div v-for="(student, index) in students">
      <div class="">
        <img :src="image_src(index)"/>
      </div>
      <p>{{ student.name }} <span>{{ student.age }}</span>　{{ student._id }}</p>
      <router-link to="/show" v-on:click.native="showStudent(student._id)">ユーザー詳細</router-link>
    </div>

  </div>
</template>

<script>
import axios from'axios'

export default {
  name: 'home',
  data() {
    return {
      name: 'name',
      bio: 'bio',
      age: '',
      isAgeOk: true,
      year: '',
      month: '',
      date: '',
      univList: [],
      univ: '',
    }
  },
  computed: {
    students(){
      return this.$store.getters['user/users'];
    },
    lastDate(){
      console.log('lastDate');
      if(this.year!='' && this.month!=''){
        const day = new Date(this.year, this.month, 0);
        const lastDate = Number(day.getDate());
        return lastDate;
      }else{
        return 31;
      }
    }
  },
  methods: {
    getStudents: async function(){
      await this.$store.dispatch('user/getStudents');
    },
    searchStudents: function(){
      const payload = {
        name: this.name,
        bio: this.bio,
        age: parseInt(this.age),
        year: this.year,
        month: this.month,
        date: this.date,
        univ: this.univ
      }
      this.$store.dispatch('user/searchStudents', payload);
    },
    showStudent: function(_id){
      this.$store.dispatch('user/setShowingStudent', _id);
    },
    ageValidate: function(){
      const pattern = /^([1-9]\d*|0)$/;
      if(pattern.test(this.age)){
        this.isAgeOk = true;
      }else{
        this.isAgeOk = false
      }
      console.log(this.isAgeOk);
    },
    image_src(index){
      if(this.students[index].image != ""){
        return require("@/assets/user/" + this.students[index].image);
      }else if(this.students[index].image == ""){
        return require("@/assets/user/user.png");
      }
    }
  },
  mounted: async function() {
    await this.$store.dispatch('user/getStudents');
    await this.$store.dispatch('univ/getUnivs');
    this.univList = this.$store.getters['univ/univs'];
  }
}
</script>
