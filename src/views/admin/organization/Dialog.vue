<template>
    <v-dialog v-model="dialog" width="500" persistent>
        <v-card class="mx-auto">
            <v-card-title primary-title>

                {{ actionTitle }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-text-field label="title..." v-model="organization.title"></v-text-field>
                <v-autocomplete :items="otherOrganizations" item-value="id" outline v-model="organization.parent_id"
                    item-text="title">
                </v-autocomplete>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="save()">Save</v-btn>
                <v-btn color="red" @click="closeDialog()" dark>cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'organization-dialog',
    data() {
        return {
            dialog: false,
            actionTitle: 'Create',
            organization: {},
            otherOrganizations: []
        }
    },
    created(){
        this.loadOrganizationTree(this.organization ? this.organization.id : null)
    },
    methods: {
        setData(organization) {
            this.organization = { ...organization }
            this.actionTitle = 'Update'
            this.dialog = true
        },
        async loadOrganizationTree(id = null) {
            const data = await this.$store.dispatch('organization/loadOrganizationTree', id)
            this.otherOrganizations = [...data]
        },
        save(){
            if(this.organization.id > 0){
                this.update()
            }else{
                this.create()
            }
        },
        async create(){
            try {
                const res = await this.$store.dispatch('organization/create', this.organization)
                this.$emit('reload')
                this.closeDialog()
            } catch (error) {
                console.log(error);
            }
        },
        async update() {
            try {
                const res = await this.$store.dispatch('organization/update', this.organization)
                this.$toast.success(res.message || "salom")
                await this.$emit('reload')
                this.closeDialog()
            } catch (error) {
                this.$toast.error('Error')
                // this.$toast.error(Object.values(error.response.data.message)[0][0])
            }
        },
        closeDialog() {
            this.organization = {}
            this.dialog = false
        }
    }
}
</script>