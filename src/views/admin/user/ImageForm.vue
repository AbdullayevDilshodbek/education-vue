<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title primary-title>
                Upload Image
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <input type="file" id="file" ref="file" v-on:change="onChangeFileUpload()" />
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" @click="upload">Upload</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: 'userImage',
    data() {
        return {
            dialog: false,
            file: ''
        }
    },
    methods: {
        async upload() {
            try {
                const res = await this.$store.dispatch('user/uploadImage', this.file)
                this.$toast.success(res.message)
                this.file = '';
                this.dialog = false
            } catch (error) {
                this.$toast.error(error.response.data.message)
            }
        },
        onChangeFileUpload() {
            this.file = this.$refs.file.files[0];
        }
    }
}
</script>