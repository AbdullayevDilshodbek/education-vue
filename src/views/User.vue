<template>
    <v-app class="mt-2">
        <v-snackbar timeout="1000" top right v-model="snackbar.show" :color="snackbar.color">
            {{snackbar.text}}
        </v-snackbar>
        <v-dialog v-model="dialogUser" width="400" persistent>
            <v-card>
                <v-card-title style="background-color: #21b421; color: azure">{{title}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="mt-2">
                    <v-form @keyup.native.enter="updateData">
                        <v-text-field v-model=user.username label="Login" outlined dense></v-text-field>
                        <v-text-field v-model="user.full_name" label="To`liq ism sharf" outlined dense></v-text-field>
                        <v-text-field v-model="user.password"
                                      @click:append="eye = !eye"
                                      :type="eye ? 'password' : 'text'"
                                      :append-icon="eye ? 'mdi-eye-off' : 'mdi-eye'"
                                      label="Parol"
                                      :placeholder="placeholder"
                                      outlined dense>
                        </v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="success" @click="updateData">Saqlash</v-btn>
                    <v-btn text color="error" @click="closeDialog">Bekor qilish</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <div class="mr-3">
            <v-row>
                <v-spacer></v-spacer>
                <div style="width: 250px" class="mr-3">
                    <v-autocomplete
                            v-model="user.id"
                            :items="getUsers"
                            append-icon="mdi-magnify"
                            @click:append="searchUser"
                            @click:clear="clear"
                            dense
                            rounded
                            item-value="id"
                            item-text="full_name"
                            clearable
                            filled
                            outlined
                            label="Qidirish"
                    ></v-autocomplete>
                </div>
                <v-btn color="success" @click="openDialog">
                    <v-icon>
                        mdi-plus-circle
                    </v-icon>
                    Qo`shish
                </v-btn>
            </v-row>
        </div>
        <v-data-table :headers="headers" :items="getUsers"
                      :item-class="computedColor"
                      hide-default-footer
                      disable-sort
                      dense>
            <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                color="primary"
                                v-bind="attrs"
                                v-on="on"
                                text rounded small @click="openUpdateDialog(item)">
                            <v-icon>mdi-border-color</v-icon>
                        </v-btn>
                    </template>
                    <span>Taxrirlash</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                color="primary"
                                v-bind="attrs"
                                v-on="on"
                                :color="item.status === 1 ? 'green' : 'error'" text rounded>
                            <v-icon
                                    v-text="item.status === 1 ? 'mdi-toggle-switch' : 'mdi-toggle-switch-off'"
                                    @click="changeUserStatus(item)"
                            ></v-icon>
                        </v-btn>
                    </template>
                    <span>Xolatini o`zgartirish</span>
                </v-tooltip>
            </template>
        </v-data-table>
        <Paginate :collection="getUsers" store="user" method="getList"></Paginate>
    </v-app>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Paginate from "../components/Paginate"
    export default {
        name: "User",
        components: { Paginate },
        data() {
            return {
                placeholder: '',
                title: '',
                dialogUser: false,
                add: true,
                eye: false,
                snackbar: {
                    show: false,
                    text: '',
                    color: ''
                },
                user: {
                    id:'',
                    username: '',
                    full_name: '',
                    password: ''
                },
                headers: [
                    {
                        text: "ID",
                        value: "id",
                        class: "green lighten-2",
                    },
                    {
                        text: "Username",
                        value: "username",
                        class: "green lighten-2",
                    },
                    {
                        text: "To`liq ism sharf",
                        value: "full_name",
                        class: "green lighten-2",
                    },
                    {
                        text: "Amallar",
                        value: "actions",
                        class: "green lighten-2",
                    },
                ]
            }
        },
        computed: {
            ...mapGetters('user', ['getUsers'])
        },
        watch: {
            dialog(val) {
                val || this.close();
            },
        },
        created() {
            this.fetchUser({
                url: "users?page=",
                pageNumber: 0,
                method: "get",
                body: {},
            });
            this.loadUsers()
        },
        watch: {
            dialog(val) {
                val || this.close();
            },
        },
        methods: {
            ...mapActions('user', ['fetchUser','searchUsers', 'addUser', 'changeStatus', 'updateUser','getList']),
            computedColor(item) {
                if (!item.status) return "red lighten-4";
            },
            searchUser(){
                this.searchUsers(this.user.id);
            },
            clear(){
              this.fetchUser()
            },
            openDialog() {
                this.add = true;
                this.dialogUser = true;
                this.title = 'Foydalanuvchi qo`shish';
                this.placeholder = ''
            },
            closeDialog() {
                delete this.user.username;
                delete this.user.password;
                delete this.user.full_name;
                this.dialogUser = false
            },
            openUpdateDialog(item) {
                this.placeholder = 'hech narsa yozilmas parol o`zgarmaydi';
                this.add = false;
                this.title = 'Foydalanuvchini taxrirlash';
                this.dialogUser = true;
                this.user.id = item.id;
                this.user.username = item.username;
                this.user.password = item.password;
                this.user.full_name = item.full_name;
            },
            addNewUser() {
                this.addUser(this.user).then(response => {
                    this.snackbar.show = true;
                    this.snackbar.text = response.data.message;
                    this.snackbar.color = 'success';
                    this.closeDialog()
                }).catch(error => {
                    this.snackbar.show = true;
                    this.snackbar.text = Object.values(
                        error.response.data.message
                    )[0][0];
                    this.snackbar.color = 'error'
                })
            },
            updateData() {
                if (this.add) {
                    this.addNewUser()
                } else {
                    this.updateUser(this.user).then(response => {
                        this.snackbar.show = true;
                        this.snackbar.text = response.data.message;
                        this.snackbar.color = 'success';
                        this.closeDialog()
                    }).catch(error => {
                        this.snackbar.show = true;
                        this.snackbar.text = Object.values(
                            error.response.data.message
                        )[0][0];
                        this.snackbar.color = 'error'
                    })
                }
            },
            changeUserStatus(item) {
                this.changeStatus(item.id).then(response => {
                    this.snackbar.show = true;
                    this.snackbar.text = response.data.message;
                    this.snackbar.color = item.status ? "error" : "success";
                }).catch(error => {
                    console.log(error)
                })
            },
            loadUsers() {
                this.getList({
                    url: "/users?page=",
                    method: "get",
                    pageNumber: 0,
                    body: {},
                });
            },
        }
    }
</script>

<style scoped>

</style>