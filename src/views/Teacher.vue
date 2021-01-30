<template>
    <v-app class="mt-2">
        <v-snackbar timeout="1000" top right v-model="snackbar.show" :color="snackbar.color">
            {{snackbar.text}}
        </v-snackbar>
        <v-dialog v-model="dialog" width="400" persistent>
            <v-card>
                <v-card-title style="background-color: #21b421; color: azure">{{title}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="mt-2">
                    <v-autocomplete
                            v-model="teacher.subject_id"
                            :items="getSubjects"
                            dense
                            item-value="id"
                            item-text="subject_name"
                            clearable="true"
                            outlined
                            label="Fan"
                    ></v-autocomplete>
                    <v-autocomplete
                            v-model="teacher.user_id"
                            :items="getUsers"
                            dense
                            :disabled="!add"
                            item-value="id"
                            item-text="full_name"
                            clearable="true"
                            outlined
                            label="O`qituvchi"
                    ></v-autocomplete>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="success" @click="addTeacher">Saqlash</v-btn>
                    <v-btn text color="error" @click="closeDialog">Bekor qilish</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <div class="mr-3">
            <v-row>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="openDialog">
                    <v-icon>
                        mdi-plus-circle
                    </v-icon>
                    Qo`shish
                </v-btn>
            </v-row>
        </div>
        <v-data-table :headers="headers" :items="getTeachers" dense class="mt-5">
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
                        </template>
        </v-data-table>
    </v-app>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "Teacher",
        data() {
            return {
                add: true,
                subject: {
                    id: '',
                    subject_name: ''
                },
                user:{
                    id: '',
                    full_name: ''
                },
                title: '',
                dialog: false,
                snackbar: {
                    show: false,
                    text: '',
                    color: ''
                },
                teacher: {
                  id: '',
                  user_id: '',
                  subject_id: ''
                },
                headers: [
                    {
                        text: "ID",
                        value: "id",
                        class: "green lighten-2",
                        divider: true
                    },
                    {
                        text: "O`qituvchi",
                        value: "teacher.full_name",
                        class: "green lighten-2",
                        divider: true
                    },
                    {
                        text: "Mutaxasisligi",
                        value: "subject.subject_name",
                        class: "green lighten-2",
                        divider: true
                    },
                    {
                        text: 'Amallar',
                        value: 'actions',
                        class: "green lighten-2",
                        divider: true
                    }
                ]
            }
        },
        computed: {
            ...mapGetters('teacher', ['getTeachers']),
            ...mapGetters('subject', ['getSubjects']),
            ...mapGetters('user', ['getUsers'])
        },
        created() {
            this.fetchTeacher();
            this.fetchSubject();
            this.fetchUser();
        },
        methods: {
            ...mapActions('teacher', ['fetchTeacher','addNewTeacher','updateTeacherData']),
            ...mapActions('subject', ['fetchSubject']),
            ...mapActions('user', ['fetchUser']),
            openDialog() {
                this.dialog = true;
                this.title = 'O`qituvchi qo`shish'
                this.add = true;
            },
            closeDialog() {
                delete this.teacher.subject_id;
                delete this.teacher.user_id;
                this.dialog = false
            },
            addTeacher(){
                if (!this.add){
                    this.updateTeacher()
                }else{
                    this.addNewTeacher(this.teacher).then(response =>{
                        this.closeDialog();
                        this.snackbar.show = true;
                        this.snackbar.text = response.data.message;
                        this.snackbar.color = 'success'
                    }).catch(error =>{
                        this.snackbar.show = true;
                        this.snackbar.text = Object.values(
                            error.response.data.message
                        )[0][0];
                        this.snackbar.color = 'error'
                    })
                }
            },
            openUpdateDialog(item) {
                this.add = false;
                this.title = 'Taxrirlash';
                this.dialog = true;
                this.teacher.id = item.id;
                this.teacher.subject_id = item.subject.id;
                this.teacher.user_id = item.teacher.id
            },
            updateTeacher(){
                this.updateTeacherData(this.teacher).then(response =>{
                    this.snackbar.show = true;
                    this.snackbar.text = response.data.message;
                    this.snackbar.color = 'success';
                    this.closeDialog()
                }).catch(error =>{
                    this.snackbar.show = true;
                    this.snackbar.text = Object.values(
                        error.response.data.message
                    )[0][0];
                    this.snackbar.color = 'error'
                })
            }
        },
    }
</script>

<style scoped>

</style>