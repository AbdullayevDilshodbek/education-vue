<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Login from './views/Login';

export default {
  name: 'App',

  components: {
    Login,
  },

  data: () => ({
    // github action test
  }),
};
</script>
