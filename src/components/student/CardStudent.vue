<template>
    <v-card>
        <v-snackbar timeout="1000" top right v-model="snackbar.show" :color="snackbar.color">
            {{snackbar.text}}
        </v-snackbar>
        <v-card-title style="background-color: #21b421; color: azure">{{title}}</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-2">
            <v-form @keyup.native.enter="addStudent">
                <v-text-field v-model="student.first_name" label="Ism" outlined dense/>
                <v-text-field v-model="student.last_name" label="Familya" outlined dense/>
                <v-text-field v-model="student.middle_name" label="Sharfi" outlined dense/>
                <v-text-field v-model="student.phone"
                              v-mask="'+998-##-###-##-##'"
                              placeholder="+998-"
                              label="Тел номер"
                              hide-details
                              outlined
                              dense/>
            </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="success" @click="addStudent">Saqlash</v-btn>
            <v-btn text color="error" @click="closeDialog">Bekor qilish</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "Dialog",
        props: {
            student: {
                id: '',
                first_name: '',
                last_name: '',
                middle_name: '',
                phone: '',
            },
            title: '',
            add: ''
        },
        data() {
            return {
                snackbar: {
                    show: false,
                    text: '',
                    color: ''
                },
            }
        },
        methods: {
            ...mapActions('student', ['fetchStudent', 'addNewStudent', 'updateStudentData', 'changeStudentStatus', 'fetchActiveStudents']),
            closeDialog() {
                this.student = {};
                this.$emit('closeDialog');
            },
            addStudent() {
                if (!this.add) {
                    this.updateDate(this.student)
                } else {
                    this.addNewStudent(this.student).then(response => {
                        this.closeDialog();
                        this.$emit('addStudent');
                        this.student = {}
                    }).catch(error => {
                        this.snackbar.show = true;
                        this.snackbar.text = Object.values(
                            error.response.data.message
                        )[0][0];
                        this.snackbar.color = 'error'
                    })
                }
            },
            updateDate() {
                this.updateStudentData(this.student).then(response => {
                    this.snackbar.show = true;
                    this.snackbar.text = response.data.message;
                    this.snackbar.color = 'success';
                    this.student = {};
                    this.closeDialog()
                }).catch(error => {
                    this.snackbar.show = true;
                    this.snackbar.text = Object.values(
                        error.response.data.message
                    )[0][0];
                    this.snackbar.color = 'error'
                })
            }
        }
    }
</script>

<style scoped>

</style>