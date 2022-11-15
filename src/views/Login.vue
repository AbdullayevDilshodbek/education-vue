<template>
    <div>
        <v-container grid-list-xs>
            <v-row class="mx-auto row" justify="center" rounded>
                <v-col>
                    <v-card>
                        <v-card-title color="primary">
                            Login
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-form @keyup.native.enter="login">
                                <v-text-field v-model="username" class="mb-2 mt-2 username" autofocus outline dense label="Username"
                                    prepend-icon="mdi-account" id="id"></v-text-field>
                                <v-text-field v-model="password" outline dense label="Password" :type="eye ? 'password' : 'text'" prepend-icon="mdi-lock"
                                    :append-icon="eye ? 'mdi-eye-off' : 'mdi-eye'" @click:append="switchEye" id="id"></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions class="justify-center ma-2">
                            <v-btn color="success" @click="login()">Sign In</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
export default {
    name: 'Login',
    data() {
        return {
            username: 'admin123',
            password: 'test123',
            eye: true
        }
    },
    methods: {
        switchEye(){
            this.eye = !this.eye;
            this.$refs.password.type = 'text'
        },
        async login(){
            try {
                const payload = {
                    username: this.username,
                    password: this.password,
                    client_id: process.env.VUE_APP_CLIENT_ID,
                    client_secret: process.env.VUE_APP_CLIENT_SECRET_KEY,
                    grant_type: 'password'
                }
                await this.$store.dispatch('auth/getToken', payload)
                this.$router.push('/')
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style>
.row {
    margin-top: 20vh;
    width: 25vw;
}
</style>