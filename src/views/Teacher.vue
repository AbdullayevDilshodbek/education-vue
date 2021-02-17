<template>
    <v-app class="mt-2">
        <v-snackbar timeout="1500" top right v-model="snackbar.show" :color="snackbar.color">
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
                            :clearable="true"
                            @focusout="sortedTeacher(teacher.subject_id)"
                            outlined
                            label="Fan"
                    ></v-autocomplete>
                    <v-autocomplete
                            v-model="teacher.user_id"
                            :items="getTeacherOfTheSubject"
                            dense
                            item-value="id"
                            item-text="full_name"
                            :clearable="true"
                            outlined
                            label="O`qituvchi"
                    >
                        <template #no-data>
                            <v-list-item>
                                <v-list-item-title>Ma'lumotlar mavjud emas</v-list-item-title>
                            </v-list-item>
                        </template>
                    </v-autocomplete>
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
        <v-data-table :headers="headers" :items="getTeachers" dense class="mt-5" hide-default-footer>
            <template v-slot:item.actions="{ item }">
                <!--                <v-tooltip bottom>-->
                <!--                    <template v-slot:activator="{ on, attrs }">-->
                <!--                        <v-btn-->
                <!--                                color="primary"-->
                <!--                                v-bind="attrs"-->
                <!--                                v-on="on"-->
                <!--                                icon-->
                <!--                                text rounded small @click="openUpdateDialog(item)">-->
                <!--                            <v-icon>mdi-border-color</v-icon>-->
                <!--                        </v-btn>-->
                <!--                    </template>-->
                <!--                    <span>Taxrirlash</span>-->
                <!--                </v-tooltip>-->
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                color="primary"
                                v-bind="attrs"
                                v-on="on"
                                text rounded small @click="openConfirmDialog(item)">
                            <v-icon>mdi-cash-refund</v-icon>
                        </v-btn>
                    </template>
                    <span>Maosh berish</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                color="primary"
                                v-bind="attrs"
                                v-on="on"
                                icon
                                text rounded small @click="openPaymentHistory(item)">
                            <v-icon>mdi-timer-sand</v-icon>
                        </v-btn>
                    </template>
                    <span>Maosh tarixi ko'rish</span>
                </v-tooltip>
            </template>
        </v-data-table>
        <Paginate store="teacher" collection="getTeachers" method="getList"/>
        <v-dialog width="500" persistent v-model="confirm.show">
            <ConfirmDialog @confirm="giveSalary" @closeConfirmDialog="confirm.show = false"/>
        </v-dialog>
        <v-dialog v-model="add" fullscreen>
            <PaymentHistory :user_id="user.id" @closeDialog="add = false" @searchByTime="searchByTime" @clearDatePicker="clearDatePicker"/>
        </v-dialog>
        <Overlay :overlay="overlay"/>
    </v-app>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import ConfirmDialog from '../components/Teacher/ConfirmDialog'
    import PaymentHistory from '../components/payment/PaymentHistory'
    import Paginate from '../components/Paginate'
    import Overlay from '../components/overlay'

    export default {
        name: "Teacher",
        components: {
            ConfirmDialog,
            PaymentHistory,
            Paginate,
            Overlay
        },
        data() {
            return {
                overlay: false,
                money: {
                    amount: '',
                    user_id: '',
                    teacher_id: ''
                },
                confirm: {
                    show: false
                },
                add: false,
                subject: {
                    id: '',
                    subject_name: ''
                },
                user: {
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
                user_id: '',
                headers: [
                    {
                        text: "ID",
                        value: "id",
                        class: "green lighten-2",
                        divider: true
                    },
                    {
                        text: "O`qituvchi",
                        value: "full_name",
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
                        text: "Xisob xolati",
                        value: "salary",
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
            ...mapGetters('teacher', ['getTeachers', 'getCurrentPage', 'getTeacherOfTheSubject']),
            ...mapGetters('subject', ['getSubjects']),
            ...mapGetters('user', ['getUsers'])
        },
        created() {
            this.loadTeachers();
            this.fetchSubject();
            this.fetchUser();
        },
        methods: {
            ...mapActions('teacher', ['fetchTeacher', 'addNewTeacher', 'getList', 'fetchTeacherOfSubject']),
            ...mapActions('subject', ['fetchSubject']),
            ...mapActions('user', ['fetchUser']),
            ...mapActions('payment', ['PaymentActions']),
            ...mapMutations('teacher', ['SET_TEACHER_OF_SUBJECT']),
            ...mapActions('paymentHistory', ['getLists']),
            openDialog() {
                this.dialog = true;
                this.title = 'O`qituvchi qo`shish';
                this.add = true;
            },
            closeDialog() {
                delete this.teacher.subject_id;
                delete this.teacher.user_id;
                this.dialog = false;
                // this.$store.commit('teacher/SET_TEACHER_OF_SUBJECT', [])
                this.SET_TEACHER_OF_SUBJECT([])
            },
            addTeacher() {
                if (!this.add) {
                    this.updateTeacher()
                } else {
                    this.addNewTeacher(this.teacher).then(response => {
                        this.closeDialog();
                        this.snackbar.show = true;
                        this.snackbar.text = response.data.message;
                        this.snackbar.color = 'success'
                    }).catch(error => {
                        this.snackbar.show = true;
                        this.snackbar.text = Object.values(
                            error.response.data.message
                        )[0][0];
                        this.snackbar.color = 'error'
                    })
                }
            },
            openConfirmDialog(item) {
                if (item.salary > 999) {
                    this.confirm.show = true;
                    this.money = {
                        amount: item.salary,
                        user_id: item.user.id,
                        teacher_id: item.id
                    }
                } else {
                    this.snackbar.show = true;
                    this.snackbar.text = 'Pul miqdori kamida 1000 so`m bo`lishi kerak';
                    this.snackbar.color = 'error';
                }
            },
            openPaymentHistory(item) {
                this.overlay = true;
                this.getLists({
                    url: `paymentHistory/teacher?page=`,
                    pageNumber: 0,
                    method: "post",
                    body: {
                        user_id: item.user.id
                    },
                }).then(() => {
                    this.add = true;
                    this.overlay = false;
                    this.user_id = item.user.id
                });
            },
            searchByTime(dates){
                this.overlay = true;
                this.getLists({
                    url: `paymentHistory/teacher?page=`,
                    pageNumber: 0,
                    method: "post",
                    body: {
                        user_id: this.user_id,
                        start_date: dates[0],
                        end_date: dates[1]
                    },
                }).then(() =>{
                    this.overlay = false;
                })
            },
            clearDatePicker(){
                this.getLists({
                    url: `paymentHistory/teacher?page=`,
                    pageNumber: 0,
                    method: "post",
                    body: {
                        user_id: this.user_id,
                    },
                })
            },
            giveSalary() {
                this.PaymentActions({
                    url: `/payment/${this.money.teacher_id}?page=`,
                    pageNumber: 0,
                    method: "put",
                    body: this.money,
                }).then(response => {
                    this.snackbar.show = true;
                    this.snackbar.text = response.data.message;
                    this.snackbar.color = 'success';
                    this.fetchTeacher();
                }).catch(error => {
                    this.snackbar.show = true;
                    this.snackbar.text = Object.values(error.response.data.message)[0][0];
                    this.snackbar.color = 'error';
                });
            },
            sortedTeacher(id) {
                this.fetchTeacherOfSubject(id)
            },
            loadTeachers() {
                this.getList({
                    url: "/teacher?page=",
                    method: "get",
                    pageNumber: this.getCurrentPage,
                    body: {},
                });
            },
        },
    }
</script>

<style scoped>

</style>