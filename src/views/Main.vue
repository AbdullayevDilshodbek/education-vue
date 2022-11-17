<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <div class="d-flex flex-column justify-center">
          <v-avatar class="mx-auto" color="grey darken-1" size="64"></v-avatar>
          <div class="text-center mt-2">{{ user }}</div>
        </div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="[icon, text, link] in links" :key="icon" link :to="link">
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="pa-2">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Main',
  data: () => ({
    drawer: null,
    links: [
      ['mdi-inbox-arrow-down', 'Organization', '/'],
      ['mdi-file-powerpoint-box', 'Position', '/position'],
    ],
    user: ''
  }),
  created() {
    this.authUser()
  },
  methods: {
    async authUser() {
      const user = await this.$store.dispatch('user/authUser')
      this.user = user.full_name
    }
  }
}
</script>
