<template>
    <v-dialog v-model="dialog" width="500" persistent>
        <v-card class="mx-auto">
            <v-card-title primary-title>
                {{ actionTitle }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-text-field label="title..." v-model="position.title" required></v-text-field>
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
    name: 'PositionForm',
    data() {
        return {
            dialog: false,
            actionTitle: 'Create',
            position: {},
        }
    },
    created(){
    },
    methods: {
        setData(position) {
            this.position = { ...position }
            this.actionTitle = 'Update'
            this.dialog = true
            console.log(this.position.title);
        },
        save(){
            if(this.position.id > 0){
                this.update()
            }else{
                this.create()
            }
        },
        async create(){
            try {
                const res = await this.$store.dispatch('position/create', this.position)
                this.$toast.success(res.message)
                this.$emit('reload');
                this.closeDialog()
            } catch (error) {
                this.$toast.error(error.response.data.message)
            }
        },
        async update() {
            try {
                const res = await this.$store.dispatch('position/update', this.position)
                this.$toast.success(res.data.message)
                this.$emit('reload');
                this.closeDialog()
            } catch (error) {
                this.$toast.error(Object.values(error.response.data.message)[0][0])
            }
        },
        closeDialog() {
            this.position = {}
            this.dialog = false
        }
    }
}
</script>