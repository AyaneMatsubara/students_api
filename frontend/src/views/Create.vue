<template>
  <div class="create">
    <button type="button" name="button" v-on:click="postStudent">post students data!</button>

    <table class="form" style="width: 500px; margin: 50px auto">
      <tr>
        <input type="text" v-model="name"><span> {{ name }}</span>
      </tr>
      <tr>
        <input type="text" v-model="bio"><span> {{ bio }}</span>
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
</template>

<script>
import axios from'axios'
import moment from 'moment'

export default {
  name: 'create',
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
      univ: ''
    }
  },
  computed: {
    lastDate: function(){
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
    postStudent: function(){
      const birth = moment().year(this.year).month(this.month - 1).date(this.date).format('YYYY年 M月 D日');
      const payload = {
        name: this.name,
        bio: this.bio,
        age: parseInt(this.age),
        birth: birth,
        univ: this.univ
      }
      this.$store.dispatch('user/postStudent', payload);
      this.$router.push('/');
    },
    ageValidate: function(){
      const pattern = /^([1-9]\d*|0)$/;
      if(pattern.test(this.age)){
        this.isAgeOk = true;
      }else{
        this.isAgeOk = false
      }
      console.log(this.isAgeOk);
    }
  },
  mounted: async function() {
    await this.$store.dispatch('univ/getUnivs');
    this.univList = this.$store.getters['univ/univs'];
  }
}
</script>
