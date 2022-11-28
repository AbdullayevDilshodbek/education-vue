<template>
    <div class="mt-2">
        <div class="d-flex justify-between" outlined>
            <div>
                <v-text-field v-model="payload.search" v-on:keyup.enter="get()" name="name" label="Search..." id="id" outlined dense
                    style="display: inline-block; width: 250px;"
                    >
                </v-text-field>
            </div>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="openDialog()">Add</v-btn>
        </div>
        <div>
            <v-data-table :headers="headers" :items="users.data" hide-default-footer class="elevation-1" item-key="id"
                loading="true" disable-sort dense>
                <template v-slot:item.actions="{ item }">
                <v-btn @click="openDialog(item)" color="success" dense icon rounded>
                    <v-icon>mdi-border-color</v-icon>
                </v-btn>
                <v-btn :color="item.active ? 'success' : 'red'" icon @click="changeActive(item.id)">
                    <v-icon v-text="item.active == true ? 'mdi-toggle-switch' : 'mdi-toggle-switch-off'"></v-icon>
                </v-btn>
            </template>
            </v-data-table>
            <v-footer app inset class="white">
                <v-row justify="center" class="py-2">
                    <v-pagination color="success" v-model="current_page" :length="users.meta && users.meta.last_page"
                        :total-visible="7"></v-pagination>
                </v-row>
            </v-footer>
        </div>
        <UserForm ref="user_form" @reload="get()"/>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import UserForm from './UserForm';
export default {
    name: 'User',
    components: {
        UserForm
    },
    data() {
        return {
            headers: [
                {
                    text: '#',
                    value: 'id',
                    width: 20,
                    class: 'green lighten-2',
                    divider: true
                },
                {
                    text: 'Full name',
                    value: 'full_name',
                    class: 'green lighten-2',
                    divider: true
                },
                {
                    text: 'Username',
                    value: 'username',
                    class: 'green lighten-2',
                    divider: true
                },
                {
                    text: 'Position',
                    value: 'position.title',
                    class: 'green lighten-2',
                    divider: true
                },
                {
                    text: 'Organization',
                    value: 'organization.title',
                    class: 'green lighten-2',
                    divider: true
                },
                {
                    text: 'Actions',
                    value: 'actions',
                    class: 'green lighten-2',
                    divider: true
                }
            ],
            payload: {
                search: '',
                page: 1
            },
            current_page: 1,
        }
    },
    computed: {
        ...mapGetters({
            users: 'user/users'
        })
    },
    watch: {
        "current_page": "changePage"
    },
    created() {
        this.get()
    },
    methods: {
        changePage() {
            this.payload.page = this.current_page
            this.get()
        },
        async get() {
            try {
                await this.$store.dispatch('user/get', this.payload)
            } catch (error) {
                this.$toast.error(error.response.data.message)
            }
        },
        async changeActive(id){
            try {
                const res = await this.$store.dispatch('user/changeActive', id)
                this.get()
                this.$toast.success(res.message)
            } catch (error) {
                this.$toast.error(error.response.data.message)
            }
        },
        openDialog(item = null){
            this.$refs.user_form.dialog = true
            if(item != null){
                this.$refs.user_form.user = item
            }
            this.$refs.user_form.actionTitle = 'Create'
        }
    }
}
</script>