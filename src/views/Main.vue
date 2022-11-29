<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <div class="d-flex flex-column justify-center">
          <v-avatar class="mx-auto" color="grey darken-1" size="64">
            <img :src="imagePath" />
          </v-avatar>
          <div class="text-center mt-2">
            {{ user }}
              <v-icon dense @click="uploadImage" type="button" class="ml-2">mdi-border-color</v-icon>
          </div>
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
    <ImageFormVue ref="user_image"/>
    <v-main class="pa-2">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src
import ImageFormVue from './admin/user/ImageForm'
export default {
  name: 'Main',
  data: () => ({
    drawer: null,
    links: [
      ['mdi-inbox-arrow-down', 'Organization', '/'],
      ['mdi-file-powerpoint-box', 'Position', '/position'],
      ['mdi-account-group', 'User', '/user'],
    ],
    user: '',
    imagePath: ''
  }),
  components: {
    ImageFormVue
  },
  created() {
    this.authUser()
    this.loadImage()
  },
  methods: {
    async authUser() {
      const user = await this.$store.dispatch('user/authUser')
      this.user = user.full_name
    },
    uploadImage(){
      this.$refs.user_image.dialog = true; 
    },
    async loadImage(){
      this.imagePath = await localStorage.img_path
    }
  }
}
</script>
