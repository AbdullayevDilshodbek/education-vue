<template>
  <div class="about">
    <h1>This is an about page {{user}}</h1>
  </div>
</template>

<script>
  export default {
    name: 'About',
    data(){
      return {
        user: ''
      }
    },
    created(){
      this.getUser()
    },
    methods: {
      async getUser(){
        try {
          const user = await this.$store.dispatch('user/authUser')
          this.user = user.full_name
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
</script>
