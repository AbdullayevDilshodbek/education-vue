<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card class="mx-auto">
                <v-card-title primary-title>
                    {{ actionTitle }}
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-text-field label="Full name" v-model="user.full_name"></v-text-field>
                    <v-text-field label="Username" v-model="user.username"></v-text-field>
                    <v-text-field label="Password" v-model="user.password" 
                    :type="password ? 'password' : 'text'"
                    :append-icon="password ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="password = !password"
                    />
                    <v-autocomplete :items="positions" item-value="id" item-text="title" label="Position"
                        v-model="user.position.id" />
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="save()">Save</v-btn>
                    <v-btn color="error" @click="closeDialog()">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'UserForm',
    data() {
        return {
            dialog: false,
            actionTitle: 'Update',
            user: {
                full_name: '',
                username: '',
                password: '',
                organization: {
                    title: ''
                },
                position: {
                    title: ''
                }
            },
            password: true,
        }
    },
    computed: {
        ...mapGetters({
            positions: 'position/allPositions',
        })
    },
    created() {
        this.getPositions()
    },
    methods: {
        async create() {
            try {
                const res = await this.$store.dispatch('user/create', {
                    full_name: this.user.full_name,
                    username: this.user.username,
                    password: this.user.password,
                    position_id: this.user.position.id,
                })
                this.$toast.success(res.message)
                this.closeDialog()
                this.$emit('reload')
            } catch (error) {
                this.$toast.error(error.response.data.message)
            }
        },
        async update(){
            try {
                const res = await this.$store.dispatch('user/update', this.user);
                this.$toast.success(res.message)
                this.closeDialog()
                this.$emit('reload')
            } catch (error) {
                this.$toast.error(error.response.data.message)
            }
        },
        async getPositions() {
            try {
                await this.$store.dispatch('position/allPositions')
            } catch (error) {
                console.log(error);
            }
        },
        async loadOrganizationTree(id = null) {
            await this.$store.dispatch('organization/loadOrganizationTree', id)
        },
        save() {
            if (this.user.id > 0) {
                this.update()
            } else {
                this.create()
            }
        },
        closeDialog() {
            this.user = {
                full_name: '',
                username: '',
                password: '',
                organization: {
                    title: ''
                },
                position: {
                    title: ''
                }
            }
            this.dialog = false
        },
    }
}
</script>