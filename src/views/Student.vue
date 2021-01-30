<template>
    <v-app>
        <v-snackbar timeout="1000" top right v-model="snackbar.show" :color="snackbar.color">
            {{snackbar.text}}
        </v-snackbar>
        <v-dialog v-model="dialog" width="400" persistent>
            <CardStudent @addStudent="addStudent" @closeDialog="closeDialog" :student="student" :title="title"
                         :add="add"/>
        </v-dialog>
        <div class="ma-3 ">
            <v-row>
                <v-spacer></v-spacer>
                <v-btn @click="openDialog" color="success">
                    <v-icon>mdi-plus-circle</v-icon>
                    Qo`shish
                </v-btn>
            </v-row>
        </div>
        <v-data-table :headers="headers" :items="getStudents" dense class="mt-2">
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
                                    @click="changeStatus(item)"
                            ></v-icon>
                        </v-btn>
                    </template>
                    <span>Xolatini o`zgartirish</span>
                </v-tooltip>
            </template>
        </v-data-table>
    </v-app>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import CardStudent from "../components/student/CardStudent"

    export default {
        name: "Student",
        components: {
            CardStudent
        },
        data() {
            return {
                placeholder: '',
                title: '',
                dialog: false,
                snackbar: {
                    show: false,
                    text: '',
                    color: ''
                },
                student: {
                    id: '',
                    first_name: '',
                    last_name: '',
                    middle_name: '',
                    phone: '',
                },
                add: true,
                headers: [
                    {
                        text: '#',
                        value: 'id',
                        class: "green lighten-2",
                        divider: true
                    },
                    {
                        text: 'F.I.SH',
                        value: 'full_name',
                        class: "green lighten-2",
                        divider: true
                    },
                    {
                        text: 'Telefon raqam',
                        value: 'phone',
                        class: "green lighten-2",
                        divider: true
                    },
                    {
                        text: 'Amallar',
                        value: 'actions',
                        class: "green lighten-2",
                        divider: true
                    }
                ],
                dialog: false
            }
        },
        computed: {
            ...mapGetters('student', ['getStudents'])
        },
        created() {
            this.fetchStudent()
        },
        methods: {
            ...mapActions('student', ['fetchStudent', 'addNewStudent', 'updateStudentData', 'changeStudentStatus', 'fetchActiveStudents']),
            openDialog() {
                this.dialog = true;
                this.title = "Student qo`shish";
                this.add = true;
                this.student = {}
            },
            closeDialog() {
                this.dialog = false;
            },
            addStudent() {
                this.closeDialog();
                this.fetchActiveStudents({});
                this.snackbar.show = true;
                this.snackbar.text = "Student bazaga kiritildi";
                this.snackbar.color = "success";
            },
            openUpdateDialog(item) {
                this.student = {...item};
                this.dialog = true;
                this.title = "Tahrirlash";
                this.add = false;
            },
            updateDate() {
                this.closeDialog(this.student)
            },
            changeStatus(item) {
                this.changeStudentStatus(item.id).then(response => {
                    this.snackbar.show = true;
                    this.snackbar.text = response.data.message;
                    this.snackbar.color = item.status ? "error" : "success";
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>

</style>