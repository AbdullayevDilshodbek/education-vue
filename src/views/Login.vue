<template>
  <div class="tmp">
    <v-container>
      <v-snackbar timeout="2000" top right v-model="snackbar.show" :color="snackbar.color">{{snackbar.text}}</v-snackbar>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" md="4">
        <v-card style="margin-top: 100px" class="mx-auto display-1" width="400">
          <v-card-title class="justify-center">Kirish</v-card-title>
          <v-card-text>
            <v-form @keyup.native.enter="login">
              <v-text-field v-model="username" autofocus prepend-icon="mdi-account" label="Login" outlined dense></v-text-field>
              <v-text-field v-model="password" @click:append="show_password" prepend-icon="mdi-lock"
                            :append-icon="eye ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="eye ? 'text' : 'password'" label="Password" outlined
                            dense></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-center">
            <v-btn type="submit"  color="success" @click="login">Kirish</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    </v-container>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "Login",
  data() {
    return {
      eye: false,
      username: '',
      password: '',
      snackbar: {
        show: false,
        text: '',
        color: ''
      }
    }
  },
  methods: {
    ...mapActions({tokenOlish: 'token/getToken'}),
    login(){
      let params = {};
      params.body = {
        grant_type: "password",
        client_id: 2,
        client_secret: process.env.VUE_APP_CLIENT_SECRET,
        username: this.username,
        password: this.password,
      }
      this.tokenOlish(params).then(response =>{
        this.$router.push("/main")
      }).catch(error =>{
        this.snackbar.show = true
        this.snackbar.text = "Login yoki parol xato"
        this.snackbar.color = "error"
      })
    },
    show_password() {
      this.eye = !this.eye
    },
  }
}
</script>

<style scoped>
  .tmp{
    background-image: url(./../assets/login.svg);
    background-size: 100% 100%;
    height: 100%;
  }
</style>