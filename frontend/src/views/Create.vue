<template>
  <div class="create">
    <form>
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
        <label class="input-item__label">
          画像を選択
          <input type="file" id="file" v-on:change="onFileChange" />
        </label>
        <div class="">
          <img
            v-show="uploadedImage"
            class="preview-item-file"
            :src="uploadedImage"
            alt=""
          />
        </div>

    </form>
  </div>
</template>

<script>
import axios from 'axios'

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
      univ: '',
      imageFile: '',
      uploadedImage: '',
      img_name: ''
    }
  },
  computed: {
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
    postStudent: function(e){
      const payload = {
        name: this.name,
        bio: this.bio,
        age: parseInt(this.age),
        year: this.year,
        month: this.month,
        date: this.date,
        univ: this.univ,
        image: ''
      }
      this.$store.dispatch('user/postStudent', payload);
      this.submitClick(e);
      setTimeout(()=>{
        this.$router.push('/');
      }, 2000);
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
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      this.imageFile = files;
      this.createImage(files[0]);
      this.img_name = files[0].name;
    },
    createImage(file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.uploadedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    async submitClick(e) {
      try {
        const formData = new FormData();
        formData.append("file", this.imageFile[0]);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          }
        };
        await axios.post("http://localhost:3000/api/v1/user/image/" + this.name , formData, config);
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted: async function() {
    await this.$store.dispatch('univ/getUnivs');
    this.univList = this.$store.getters['univ/univs'];
  }
}
</script>
