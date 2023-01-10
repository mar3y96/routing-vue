<template>
  <button @click="saveChanges">save changes</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  data(){
    return {
      saved:false
    }
  },
  methods:{
    saveChanges(){
      this.saved=true
    }
  },
  beforeRouteLeave (_, _2, next) {
    if (this.saved) {
      next()
    }
    else{
      const confirmed = confirm('there is data not saved ar you want to leave?')
      next(confirmed)
    }
  }
  ,
  components: {
    UserItem,
  },
  inject: ['users'],
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>