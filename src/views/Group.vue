<template>
    <v-app>
        <v-snackbar timeout="1000" top right v-model="snackbar.show" :color="snackbar.color">
            {{snackbar.text}}
        </v-snackbar>
        <div class="ma-3">
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
        <v-data-table
                dense
                :headers="headers"
                :items="getGroups"
                class="mt-1"
                hide-default-footer
        >
            <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                color="primary"
                                v-bind="attrs"
                                v-on="on"
                                icon rounded  @click="openUpdateDialog(item)">
                            <v-icon >mdi-border-color</v-icon>
                        </v-btn>
                    </template>
                    <span>Tahrirlash</span>
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
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                color="green"
                                v-bind="attrs"
                                v-on="on"
                                icon
                                @click="openAddMemberDialogPage(item)"
                                text rounded>
                            <v-icon
                            >mdi-account-multiple-plus
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Guruhga o`quvchi qo`shish</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                color="green"
                                v-bind="attrs"
                                v-on="on"
                                icon
                                @click="openAttendanceDialog(item)"
                                text rounded>
                            <v-icon
                            >mdi-ballot-outline
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Davomad qilish</span>
                </v-tooltip>
            </template>
        </v-data-table>
        <v-dialog v-model="dialogGroup" width="400" persistent>
            <v-card outlined>
                <v-card-title style="background-color: #21b421; color: #fceeff">{{title}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-col>
                        <v-text-field v-model="group.group_name" hide-details label="Guruh nomi" outlined dense/>
                    </v-col>
                    <v-col>
                        <v-autocomplete
                                :items="getSubjects"
                                item-text="subject_name"
                                return-object
                                outlined
                                :readonly="edit"
                                hide-details
                                dense
                                label="Fani tanlang"
                                v-model="group.subject"
                                @focusout="sortTeacher(group.subject.id)"
                        ></v-autocomplete>
                    </v-col>
                    <v-col>
                    <v-autocomplete
                            :items="getTeacherOfTheSubject"
                            item-text="full_name"
                            return-object
                            outlined
                            :readonly="edit"
                            hide-details
                            dense
                            label="O`qituvchini tanlang"
                            v-model="group.teacher"
                    ></v-autocomplete>
                    </v-col>
                    <v-col><v-text-field v-model="group.payment" v-mask="'######'" hide-details label="Oylik to`lov" outlined dense/></v-col>
                    <v-col><v-text-field v-model="group.teacher_part" v-mask="'###'" hide-details label="O`qituvchi ulishi(%)" outlined
                                  dense/></v-col>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="success" @click="save">Saqlash</v-btn>
                    <v-btn text color="error" @click="closeDialog">Bekor qilish</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog fullscreen
                  hide-overlay
                  transition="dialog-top-transition"
                  scrollable
                  persistent
                  v-model="addMembers"><AddStudentDialogPage :group="theGroup" @closeMemberDialog="closeMemberDialog"/>
        </v-dialog>
        <v-dialog fullscreen
                hide-overlay
                transition="dialog-top-transition"
                scrollable
                v-model="attendance.show">
            <Attendance @closeAttendanceDialog="attendance.show = false" :group="theGroup" @SendAttendance="SendAttendance"/>
        </v-dialog>
        <Paginate store="group" collection="getGroups" method="getList"/>
        <overlay :overlay="overlay"/>
    </v-app>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import AddStudentDialogPage from '../components/group/AddStudentDialogPage'
    import Paginate from '../components/Paginate'
    import CardGroup from '../components/group/CardGroup'
    import Attendance from '../components/group/Attendance'
    import Dialog from "../components/student/CardStudent";
    import Overlay from '../components/overlay'

    export default {
        name: "Group",
        components: {
            Dialog,
            AddStudentDialogPage,
            CardGroup,
            Attendance,
            Paginate,
            Overlay
        },
        data() {
            return {
                overlay: false,
                test: true,
                attendance:{
                    show:false
                },
                theGroup: {},
                addMembers: false,
                edit: false,
                title: '',
                dialogGroup: false,
                group: {
                    id: '',
                    teacher: {},
                    group_name: '',
                    subject: {},
                    payment: '',
                    teacher_part : '',
                },
                defaultGroup: {
                    id: '',
                    teacher: {},
                    group_name: '',
                    subject: {},
                    payment: '',
                    teacher_part : '',
                },
                snackbar: {
                    show: false,
                    text: '',
                    color: ''
                },
                headers: [
                    {
                        text: 'ID',
                        divider: true,
                        value: 'id',
                        class: 'green lighten-2'
                    },
                    {
                        text: 'Guruh nomi',
                        divider: true,
                        value: 'group_name',
                        class: 'green lighten-2'
                    },
                    {
                        text: 'Masul',
                        divider: true,
                        value: 'teacher.full_name',
                        class: 'green lighten-2'
                    },
                    {
                        text: 'Fan',
                        divider: true,
                        value: 'subject.subject_name',
                        class: 'green lighten-2'
                    },
                    {
                        text: 'Oylik to`lov',
                        divider: true,
                        value: 'payment',
                        class: 'green lighten-2'
                    },
                    {
                        text: 'O`qituvchi ulishi',
                        width: 4,
                        divider: true,
                        value: 'teacher_part',
                        class: 'green lighten-2',
                    },
                    {
                        text: 'Azolar',
                        width: 4,
                        divider: true,
                        value: 'people_count',
                        class: 'green lighten-2',
                    },
                    {
                        text: "Amallar",
                        divider: true,
                        value: "actions",
                        class: "green lighten-2",

                    },
                ],
            }
        },
        computed: {
            ...mapGetters('group', ['getGroups','getCurrentPage']),
            ...mapGetters('teacher', ['getTeachers', 'getTeacherOfTheSubject']),
            ...mapGetters('subject', ['getSubjects']),
        },
        watch: {
            dialog(val) {
                val || this.close();
            },
        },
        created() {
            this.loadGroups()
        },
        methods: {
            ...mapActions('group', ['getList', 'GroupAction','setCurrentPage']),
            ...mapActions('teacher', ['fetchTeacher', 'fetchTeacherOfSubject']),
            ...mapActions('subject', ['fetchSubject']),
            openDialog() {
                this.fetchSubject();
                this.dialogGroup = true;
                this.edit = false;
                this.title = 'Guruh yaratish';
            },
            closeDialog() {
                this.dialogGroup = false;
                this.group = Object.assign({}, this.defaultGroup);
                this.edit = false;
            },
                save() {
                    let params = {
                        id: this.group.id,
                        group_name: this.group.group_name,
                        teacher_id: this.group.teacher.id,
                        payment: this.group.payment,
                        teacher_part: this.group.teacher_part
                    };
                    this.GroupAction({
                        url:  this.group.id ? `/group/${this.group.id}?page=` : '/group?page=',
                        pageNumber: 0,
                        method: this.group.id ? "put" : "post",
                        body: params,
                    }).then(response =>{
                        this.loadGroups();
                        this.snackbar.show = true;
                        this.snackbar.text = response.data.message;
                        this.snackbar.color = 'success';
                        this.closeDialog();
                    }).catch(error =>{
                        this.snackbar.show = true;
                        this.snackbar.text = Object.values(
                            error.response.data.message
                        )[0][0];
                        this.snackbar.color = 'error'
                    })
                },
            loadGroups() {
                this.getList({
                    url: "/group?page=",
                    method: "get",
                    pageNumber: this.getCurrentPage,
                    body: {},
                });
            },
            openUpdateDialog(item) {
                this.edit = true;
                this.title = 'Tahrirlash';
                this.group = Object.assign({}, item);
                this.fetchSubject();
                this.fetchTeacherOfSubject(this.group.subject.id);
                this.dialogGroup = true
            },
            sortTeacher(subject_id) {
                if(!this.edit && !!subject_id){
                    this.fetchTeacherOfSubject(subject_id);
                }
            },
            changeStatus(item) {
                this.GroupAction({
                    url: `/group/change_status/${item.id}?page=`,
                    pageNumber: 0,
                    method: "put",
                    body: {},
                }).then(response =>{
                    this.loadGroups();
                    this.snackbar.show = true;
                    this.snackbar.text = response.data.message;
                    this.snackbar.color = item.status ? "error" : "success";
                    this.closeDialog();
                }).catch(error =>{
                    this.snackbar.show = true;
                    this.snackbar.text = Object.values(
                        error.response.data.message
                    )[0][0];
                    this.snackbar.color = 'error'
                })
            },
            openAddMemberDialogPage(item){
                if (this.addMembers)
                    this.addMembers = false;
                this.addMembers = true;
                //upload data of selected group to addStudentDialogPage
                this.theGroup = {
                    id: item.id,
                    group_name: item.group_name
                };
            },
            closeMemberDialog(){
                this.addMembers = false;
                this.loadGroups()
            },
            openAttendanceDialog(item){
                this.theGroup = {
                    id: item.id,
                    group_name: item.group_name
                };
                this.overlay = true;
                this.$store.dispatch('group/fetchAttendance',item.id).then(()=>{
                this.overlay = false;
                this.attendance.show = true;
                })
            },
            SendAttendance(sendData){
                this.GroupAction({
                    url:  'attendance?page=',
                    pageNumber: 0,
                    method: "post",
                    body: sendData,
                }).then(response =>{
                    this.snackbar.show = true;
                    this.snackbar.text = response.data.message;
                    this.snackbar.color = 'success';
                    this.attendance.show = false;
                }).catch(error =>{
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